"use client";

import { useSimulationStore } from "@/store/useSimulationStore";
import { Activity, ShieldAlert, Cpu, Battery, Users, Globe2, BrainCircuit, Maximize, Minimize } from "lucide-react";
import { HoloCard } from "../ui/HoloCard";
import { motion, AnimatePresence } from "framer-motion";

export function StrategicCommandCenter() {
  const metrics = useSimulationStore((state) => state.metrics);
  const presentationMode = useSimulationStore((state) => state.presentationMode);
  const togglePresentationMode = useSimulationStore((state) => state.togglePresentationMode);

  return (
    <div className="grid grid-cols-5 gap-4 relative">
      {/* Presentation Mode Toggle */}
      <div className="absolute -top-3 right-0 z-50">
         <button 
           onClick={togglePresentationMode}
           className="p-1.5 bg-[#0F1115]/80 border border-cyan-500/30 rounded-md text-cyan-400 hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.1)]"
           title="Toggle Executive Presentation Mode"
         >
           {presentationMode ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
         </button>
      </div>

      {/* Civilization Cycle */}
      <HoloCard className="p-4 flex flex-col justify-between relative overflow-hidden" glowColor={metrics.civilization_cycle === 'NIGHTTIME_RECOVERY' ? 'cyan' : 'orange'}>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start relative z-10">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Civilization Rhythm</span>
          <Activity className={`h-4 w-4 ${metrics.civilization_cycle === 'MIDDAY_PEAK' ? 'text-orange-500 animate-pulse' : 'text-cyan-500'}`} />
        </div>
        <div className="mt-2 relative z-10">
          <AnimatePresence mode="wait">
            <motion.span 
              key={metrics.civilization_cycle}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`font-orbitron text-[14px] font-bold uppercase block leading-tight ${
                 metrics.civilization_cycle === 'NIGHTTIME_RECOVERY' ? 'text-cyan-400' :
                 metrics.civilization_cycle === 'MIDDAY_PEAK' ? 'text-orange-400' : 'text-blue-400'
              }`}
            >
              {metrics.civilization_cycle.replace('_', ' ')}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[9px] text-gray-500 uppercase mt-2 relative z-10">
          Macro Operational Phase
        </span>
      </HoloCard>

      {/* Governance Mode */}
      <HoloCard className="p-4 flex flex-col justify-between relative overflow-hidden" glowColor={metrics.governance_mode === 'AGGRESSIVE_INTERVENTIONIST' ? 'orange' : 'purple'}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start relative z-10">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Active Governance Mode</span>
          <BrainCircuit className={`h-4 w-4 ${metrics.governance_mode === 'AGGRESSIVE_INTERVENTIONIST' ? 'text-orange-500 animate-pulse' : 'text-purple-500'}`} />
        </div>
        <div className="mt-2 relative z-10">
          <AnimatePresence mode="wait">
            <motion.span 
              key={metrics.governance_mode}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`font-orbitron text-[14px] font-bold uppercase block leading-tight ${
                 metrics.governance_mode === 'AGGRESSIVE_INTERVENTIONIST' ? 'text-orange-400' :
                 metrics.governance_mode === 'STABILITY_MAXIMIZER' ? 'text-blue-400' : 'text-purple-400'
              }`}
            >
              {metrics.governance_mode.replace('_', ' ')}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[9px] text-gray-500 uppercase mt-2 relative z-10">
          Autonomous Policy Active
        </span>
      </HoloCard>

      {/* Ecosystem Resilience */}
      <HoloCard className="p-4 flex flex-col justify-between" glowColor="emerald">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Ecosystem Resilience</span>
          <Globe2 className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-orbitron text-3xl font-bold text-emerald-400">
            {metrics.ecosystem_resilience.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-black/50 h-1.5 mt-2 rounded overflow-hidden">
          <div 
            className={`h-full ${metrics.ecosystem_resilience < 40 ? 'bg-orange-500' : 'bg-emerald-500'} transition-all duration-1000`} 
            style={{ width: `${metrics.ecosystem_resilience}%` }} 
          />
        </div>
      </HoloCard>

      {/* Energy Consumption */}
      <HoloCard className="p-4 flex flex-col justify-between" glowColor="yellow">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Energy Consumption</span>
          <Battery className={`h-4 w-4 ${metrics.energy_consumption > 85 ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className={`font-orbitron text-3xl font-bold ${metrics.energy_consumption > 85 ? 'text-red-400' : 'text-yellow-400'}`}>
            {metrics.energy_consumption.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-black/50 h-1.5 mt-2 rounded overflow-hidden">
          <div 
            className={`h-full ${metrics.energy_consumption > 85 ? 'bg-red-500' : 'bg-yellow-500'} transition-all duration-1000`} 
            style={{ width: `${metrics.energy_consumption}%` }} 
          />
        </div>
      </HoloCard>

      {/* Mobility Demand */}
      <HoloCard className="p-4 flex flex-col justify-between" glowColor="blue">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Mobility Demand</span>
          <Users className="h-4 w-4 text-blue-500" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-orbitron text-3xl font-bold text-blue-400">
            {metrics.mobility_demand.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-black/50 h-1.5 mt-2 rounded overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000" 
            style={{ width: `${metrics.mobility_demand}%` }} 
          />
        </div>
      </HoloCard>
    </div>
  );
}
