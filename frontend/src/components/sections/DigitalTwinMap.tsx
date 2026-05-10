"use client";

import { useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { HoloCard } from "../ui/HoloCard";
import { AnimatedPulse } from "../ui/AnimatedPulse";
import { MapPin, Navigation } from "lucide-react";
import { useSimulationStore } from "../../store/useSimulationStore";

export function DigitalTwinMap() {
  const [mounted, setMounted] = useState(false);
  const fleets = useSimulationStore((state) => state.fleets);
  const sectors = useSimulationStore((state) => state.sectors);
  const projections = useSimulationStore((state) => state.projections);
  const metrics = useSimulationStore((state) => state.metrics);
  const connectionStatus = useSimulationStore((state) => state.connectionStatus);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-[#0F1115] rounded-xl animate-pulse" />;

  const getSectorColor = (colorStr: string) => {
    switch (colorStr) {
      case 'red': return '#ef4444';
      case 'orange': return '#f97316';
      case 'yellow': return '#eab308';
      case 'emerald': return '#10b981';
      case 'cyan': return '#06b6d4';
      case 'blue': return '#3b82f6';
      default: return '#06b6d4';
    }
  };

  return (
    <HoloCard className="h-full w-full flex flex-col p-1">
      {/* Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between pointer-events-none">
        <div className="flex items-center gap-3 bg-[#060B19]/80 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span className="font-mono text-xs text-white uppercase tracking-wider">NAVIS PRIME GRID</span>
          <div className="h-3 w-[1px] bg-cyan-500/30 mx-2" />
          <AnimatedPulse color={connectionStatus === 'live' ? "cyan" : connectionStatus === 'mock' ? "yellow" : connectionStatus === 'connecting' ? "blue" : "red"} size="sm" />
          <span className={`font-mono text-[10px] uppercase tracking-widest ${connectionStatus === 'live' ? "text-cyan-400" : connectionStatus === 'mock' ? "text-yellow-400" : connectionStatus === 'connecting' ? "text-blue-400" : "text-red-400"}`}>
            {connectionStatus === 'live' ? "Live Sync" : connectionStatus === 'mock' ? "Mock Engine" : connectionStatus === 'connecting' ? "Connecting..." : "Offline"}
          </span>
        </div>

        <div className="flex gap-2 pointer-events-auto">
           <div className={`flex flex-col items-end justify-center bg-[#060B19]/80 backdrop-blur-md border px-3 py-1 rounded-lg ${metrics.threat_level === 'CRITICAL' ? 'border-red-500/50' : metrics.threat_level === 'WARNING' ? 'border-orange-500/50' : 'border-cyan-500/30'}`}>
             <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">Threat Level</span>
             <span className={`font-mono text-sm font-bold ${metrics.threat_level === 'CRITICAL' ? 'text-red-400 animate-pulse' : metrics.threat_level === 'WARNING' ? 'text-orange-400' : 'text-cyan-400'}`}>{metrics.threat_level}</span>
           </div>
           <div className="flex flex-col items-end justify-center bg-[#060B19]/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-lg">
             <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">System Load</span>
             <span className="font-mono text-sm text-cyan-400 font-bold">{metrics.system_load.toFixed(1)}%</span>
           </div>
        </div>
      </div>

      <div className="relative flex-1 rounded-lg overflow-hidden border border-white/5 bg-black">
        <Map
          initialViewState={{
            longitude: -74.006,
            latitude: 40.7128,
            zoom: 12.5,
            pitch: 60,
            bearing: -20
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          attributionControl={false}
        >
          {/* Sector Overlays */}
          {sectors.map((sector) => {
            const geojson = {
              type: 'FeatureCollection' as const,
              features: [
                {
                  type: 'Feature' as const,
                  properties: {},
                  geometry: {
                    type: 'Polygon' as const,
                    coordinates: [[
                      ...sector.bounds,
                      sector.bounds[0] // Close the polygon
                    ]]
                  }
                }
              ]
            };
            const color = getSectorColor(sector.color);
            return (
              <Source key={`src-${sector.id}`} type="geojson" data={geojson}>
                <Layer
                  id={`fill-${sector.id}`}
                  type="fill"
                  paint={{
                    'fill-color': color,
                    'fill-opacity': sector.is_healing ? 0.3 : (sector.congestion / 100 * 0.4 + 0.1),
                  }}
                />
                <Layer
                  id={`line-${sector.id}`}
                  type="line"
                  paint={{
                    'line-color': color,
                    'line-width': sector.is_healing ? 3 : 2,
                    'line-opacity': 0.8,
                    'line-dasharray': sector.is_healing ? [2, 2] : [1]
                  }}
                />
              </Source>
            );
          })}

          {/* Render Fleets */}
          {fleets.map((unit) => {
            const isWarning = unit.status === 'warning' || unit.status === 'rerouting';
            const isHalted = unit.status === 'halted';
            const isDefense = unit.type === 'defense';
            
            let colorClass = 'bg-cyan-500';
            let colorClassText = 'text-cyan-400';
            let bgClass = 'bg-cyan-400';
            
            if (isHalted) { colorClass = 'bg-red-500'; colorClassText = 'text-red-400'; bgClass = 'bg-red-400'; }
            else if (isWarning) { colorClass = 'bg-orange-500'; colorClassText = 'text-orange-400'; bgClass = 'bg-orange-400'; }
            else if (isDefense) { colorClass = 'bg-purple-500'; colorClassText = 'text-purple-400'; bgClass = 'bg-purple-400'; }

            return (
              <Marker key={unit.id} longitude={unit.lng} latitude={unit.lat} anchor="center">
                <div className="relative group cursor-pointer">
                  {/* Ping animation */}
                  <span className="absolute inset-0 flex h-full w-full">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${bgClass}`}></span>
                  </span>
                  {/* Center dot */}
                  <div className={`relative flex items-center justify-center h-4 w-4 rounded-full border border-black/50 ${colorClass} transition-colors duration-1000`}>
                     {unit.type === 'drone' ? <Navigation className="h-2 w-2 text-black" /> : <div className="h-1.5 w-1.5 bg-black rounded-full" />}
                  </div>

                  {/* Hover Info */}
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <div className="bg-black/90 border border-cyan-500/30 px-2 py-0.5 rounded backdrop-blur-md whitespace-nowrap shadow-lg flex items-center gap-2">
                      <div className="font-mono text-[9px] text-white uppercase tracking-wider">{unit.id}</div>
                      <div className="w-[1px] h-2 bg-white/20" />
                      <div className={`font-mono text-[8px] uppercase tracking-widest ${colorClassText}`}>{unit.status}</div>
                    </div>
                  </div>
                </div>
              </Marker>
            );
          })}

        </Map>

        {/* Sector Labels (Overlay on top of Map to prevent rotation) */}
        <div className="absolute inset-0 pointer-events-none z-20">
            {sectors.map((sector, i) => (
               <div key={sector.id} className="absolute p-2 flex flex-col items-start justify-start" style={{
                  top: `${15 + (i * 20)}%`,
                  left: `${20 + (i % 2) * 40}%`
               }}>
                  <span className="font-orbitron text-[10px] font-bold tracking-widest uppercase drop-shadow-md text-white/80 flex items-center gap-2">
                    {sector.name}
                    {sector.is_healing && <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" title="Self-Healing Protocol Active" />}
                  </span>
                  <div className="flex gap-2">
                     <span className={`font-mono text-[9px] font-bold ${sector.color === 'red' ? 'text-red-400' : sector.color === 'orange' ? 'text-orange-400' : 'text-cyan-400'}`}>T: {sector.threat_level}</span>
                     <span className="font-mono text-[9px] text-gray-300">C: {sector.congestion.toFixed(0)}%</span>
                  </div>
                  {sector.is_healing && (
                     <span className="font-mono text-[8px] text-blue-400 animate-pulse mt-0.5">RECONSTRUCTING INFRASTRUCTURE</span>
                  )}
               </div>
            ))}
        </div>

        {/* Overlay Gradients to blend map into the dashboard */}
        <div className="absolute inset-0 pointer-events-none z-30 rounded-lg shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
        <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />

        {/* Cinematic Civilization Rhythm Layers */}
        <div 
           className="absolute inset-0 pointer-events-none z-30 transition-all duration-3000 ease-in-out mix-blend-overlay"
           style={{
              backgroundColor: metrics.civilization_cycle === 'NIGHTTIME_RECOVERY' ? 'rgba(0,0,50,0.4)' : 
                               metrics.civilization_cycle === 'MIDDAY_PEAK' ? 'rgba(255,200,0,0.05)' : 'transparent'
           }}
        />
        
        {/* Governance Atmosphere Layer */}
        <div 
           className="absolute inset-0 pointer-events-none z-30 transition-all duration-3000 ease-in-out mix-blend-screen"
           style={{
              backgroundColor: metrics.governance_mode === 'AGGRESSIVE_INTERVENTIONIST' ? 'rgba(255,0,0,0.03)' :
                               metrics.governance_mode === 'RESILIENCE_PRIORITY' ? 'rgba(0,255,100,0.02)' : 'rgba(0,200,255,0.02)'
           }}
        />
      </div>
    </HoloCard>
  );
}
