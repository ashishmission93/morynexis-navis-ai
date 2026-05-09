"use client";

import { motion } from "framer-motion";
import { HoloCard } from "../ui/HoloCard";
import { Radar, Clock, TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { useSimulationStore } from "@/store/useSimulationStore";

export function ThreatIntelligence() {
  const forecasts = useSimulationStore((state) => state.forecasts);
  const metrics = useSimulationStore((state) => state.metrics);

  const renderForecastSection = (title: string, data: any[]) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1">
        <Clock className="h-3 w-3 text-cyan-500/50" />
        <span className="font-mono text-[10px] text-cyan-500/70 uppercase tracking-widest">{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        {data && data.length > 0 ? data.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
            <span className="font-mono text-[10px] text-gray-300">{item.metric}</span>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[10px] font-bold ${item.value > 80 ? 'text-red-400' : item.value > 50 ? 'text-orange-400' : 'text-emerald-400'}`}>
                {item.value}%
              </span>
              {item.trend === 'escalating' ? (
                 <TrendingUp className="h-3 w-3 text-red-500" />
              ) : item.trend === 'degrading' ? (
                 <TrendingDown className="h-3 w-3 text-emerald-500" />
              ) : item.trend === 'volatile' ? (
                 <Activity className="h-3 w-3 text-orange-500" />
              ) : (
                 <span className="h-3 w-3 flex items-center justify-center text-gray-500">-</span>
              )}
            </div>
          </div>
        )) : (
          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-widest pl-5">Awaiting projection...</span>
        )}
      </div>
    </div>
  );

  return (
    <HoloCard className="h-[400px] flex flex-col p-6" glowColor="cyan">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-orbitron text-sm font-bold tracking-wider text-cyan-400 flex items-center gap-2">
            <Radar className="h-4 w-4 text-cyan-500" />
            STRATEGIC FORECAST
          </h3>
          <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-1">Multi-Horizon Projection Model</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
        {/* System Pressure Indicator */}
        <div className="mb-4 bg-orange-950/20 border border-orange-500/30 p-3 rounded-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-20">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
           </div>
           <div className="relative z-10">
             <div className="flex justify-between items-end mb-2">
               <span className="font-mono text-[10px] text-orange-300 uppercase tracking-widest">Global System Pressure</span>
               <span className="font-mono text-sm text-orange-400 font-bold">{metrics.global_pressure.toFixed(1)}%</span>
             </div>
             <div className="h-1 w-full bg-black/50 rounded overflow-hidden">
               <div className="h-full bg-orange-500" style={{ width: `${metrics.global_pressure}%` }} />
             </div>
             <div className="flex justify-between items-center mt-2">
               <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">Infra Fatigue:</span>
               <span className={`font-mono text-[10px] font-bold ${metrics.infrastructure_fatigue > 50 ? 'text-red-400' : 'text-yellow-400'}`}>
                 {metrics.infrastructure_fatigue.toFixed(1)}%
               </span>
             </div>
           </div>
        </div>

        {renderForecastSection("T+5M OPERATIONAL FORECAST", forecasts.t5m)}
        {renderForecastSection("T+30M SECTOR EVOLUTION", forecasts.t30m)}
        {renderForecastSection("T+2H INFRASTRUCTURE STABILITY", forecasts.t2h)}
        {renderForecastSection("T+24H CIVILIZATION PROJECTION", forecasts.t24h)}
      </div>
    </HoloCard>
  );
}
