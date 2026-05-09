"use client";

import { useSimulationStore } from "@/store/useSimulationStore";
import { HoloCard } from "../ui/HoloCard";
import { Target, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MissionControl() {
  const missions = useSimulationStore((state) => state.missions);

  return (
    <HoloCard className="h-full flex flex-col p-4" glowColor="cyan">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/20">
        <h3 className="font-orbitron text-sm font-bold tracking-wider text-cyan-100 flex items-center gap-2">
          <Target className="h-4 w-4 text-cyan-400" />
          MISSION RUNTIME
        </h3>
        <span className="font-mono text-[10px] text-cyan-400/70 uppercase tracking-widest bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/30">
          Active: {missions.filter(m => m.status === 'In Progress').length}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-500/20">
        <AnimatePresence>
          {missions.length === 0 ? (
            <div className="h-full flex items-center justify-center font-mono text-xs text-cyan-500/50 uppercase tracking-widest">
              Awaiting Mission Generation...
            </div>
          ) : (
            [...missions].reverse().map((mission) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-3 rounded-lg border backdrop-blur-sm ${
                  mission.status === 'Completed' 
                    ? 'border-emerald-500/30 bg-emerald-950/20' 
                    : 'border-cyan-500/30 bg-cyan-950/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">{mission.id}</div>
                    <div className={`font-mono text-xs font-bold uppercase ${mission.status === 'Completed' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {mission.type}
                    </div>
                  </div>
                  {mission.status === 'Completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : mission.confidence < 80 ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 text-cyan-500" />
                  )}
                </div>

                <div className="flex justify-between items-end mt-3 mb-1">
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">{mission.zone}</span>
                  <span className={`font-mono text-[10px] ${mission.status === 'Completed' ? 'text-emerald-500' : 'text-cyan-500'}`}>
                    {Math.floor(mission.progress)}%
                  </span>
                </div>
                <div className="w-full bg-black/50 h-1 rounded overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${mission.status === 'Completed' ? 'bg-emerald-500' : 'bg-cyan-500'}`} 
                    style={{ width: `${mission.progress}%` }} 
                  />
                </div>
                
                <div className="mt-2 pt-2 border-t border-white/5 flex justify-between">
                  <span className="font-mono text-[9px] text-gray-400 uppercase">Fleets: <span className="text-white">{mission.assigned_fleets}</span></span>
                  <span className="font-mono text-[9px] text-gray-400 uppercase">AI Conf: <span className={mission.confidence >= 90 ? 'text-green-400' : 'text-yellow-400'}>{mission.confidence}%</span></span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </HoloCard>
  );
}
