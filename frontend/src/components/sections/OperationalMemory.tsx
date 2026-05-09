"use client";

import { useSimulationStore } from "@/store/useSimulationStore";
import { HoloCard } from "../ui/HoloCard";
import { Database, Clock, BrainCircuit, Target, ShieldAlert, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OperationalMemory() {
  const memory = useSimulationStore((state) => state.operational_memory);

  const getMemoryClassIcon = (memoryClass?: string) => {
    switch(memoryClass) {
       case 'policy': return <BrainCircuit className="h-3 w-3 text-purple-400" />;
       case 'mission': return <Target className="h-3 w-3 text-emerald-400" />;
       case 'governance': return <Database className="h-3 w-3 text-blue-400" />;
       case 'event': return <Activity className="h-3 w-3 text-orange-400" />;
       default: return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const getMemoryClassStyle = (memoryClass?: string) => {
    switch(memoryClass) {
       case 'policy': return 'border-purple-500/30 bg-purple-950/20 text-purple-300';
       case 'mission': return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300';
       case 'governance': return 'border-blue-500/30 bg-blue-950/20 text-blue-300';
       case 'event': return 'border-orange-500/30 bg-orange-950/20 text-orange-300';
       default: return 'border-white/5 bg-black/40 text-gray-300';
    }
  };

  return (
    <HoloCard className="h-full flex flex-col p-4" glowColor="purple">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-500/20">
        <h3 className="font-orbitron text-sm font-bold tracking-wider text-purple-100 flex items-center gap-2">
          <Database className="h-4 w-4 text-purple-400" />
          STRATEGIC CONSEQUENCE LOG
        </h3>
        <span className="font-mono text-[10px] text-purple-400/70 uppercase tracking-widest bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
          <Clock className="h-3 w-3" /> Historical Timeline
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-purple-500/20">
        <AnimatePresence>
          {memory.length === 0 ? (
             <div className="h-full flex items-center justify-center font-mono text-xs text-purple-500/50 uppercase tracking-widest">
               Civilization Timeline Empty...
             </div>
          ) : (
            [...memory].reverse().map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 p-2 rounded border transition-colors ${getMemoryClassStyle(entry.memory_class)}`}
              >
                <div className="mt-1 shrink-0 bg-black/50 p-1 rounded border border-white/10">
                   {getMemoryClassIcon(entry.memory_class)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-mono text-[10px] font-bold uppercase truncate">{entry.category}</span>
                    <span className="font-mono text-[8px] opacity-70 ml-2 shrink-0">{new Date(entry.timestamp * 1000).toLocaleTimeString()}</span>
                  </div>
                  <p className="font-mono text-[11px] opacity-80 leading-snug">{entry.details}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </HoloCard>
  );
}
