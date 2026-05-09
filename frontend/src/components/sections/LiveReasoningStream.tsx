"use client";

import { useSimulationStore } from "@/store/useSimulationStore";
import { HoloCard } from "../ui/HoloCard";
import { BrainCircuit, Cpu, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveReasoningStream() {
  const recommendations = useSimulationStore((state) => state.strategic_recommendations);
  const projections = useSimulationStore((state) => state.projections);

  return (
    <HoloCard className="h-full flex flex-col p-4" glowColor="blue">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-blue-500/20">
        <h3 className="font-orbitron text-sm font-bold tracking-wider text-blue-100 flex items-center gap-2">
          <BrainCircuit className="h-4 w-4 text-blue-400" />
          EXECUTIVE INTELLIGENCE
        </h3>
        <Cpu className="h-4 w-4 text-blue-500 animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-500/20">
        {/* Strategic Logic Feed */}
        <div>
          <div className="mb-2 font-mono text-[10px] text-blue-400/50 uppercase tracking-widest sticky top-0 bg-[#0F1115]/90 backdrop-blur-sm z-10 py-1">
            Active Strategic Logic
          </div>
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {recommendations.length === 0 ? (
                <div className="font-mono text-[10px] text-blue-500/50 uppercase tracking-widest">
                  Analyzing Matrix...
                </div>
              ) : (
                [...recommendations].reverse().map((rec) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-2 rounded border border-blue-500/30 ${rec.type === 'proactive' ? 'bg-indigo-950/40 border-indigo-500/50' : 'bg-blue-950/20'} relative overflow-hidden group`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-mono text-[10px] font-bold ${rec.type === 'proactive' ? 'text-indigo-300' : 'text-blue-200'}`}>{rec.title}</span>
                      <span className={`font-mono text-[8px] uppercase px-1 rounded ${
                        rec.impact === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        rec.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {rec.impact}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-black/50 h-0.5 rounded overflow-hidden">
                        <div 
                          className={`h-full ${rec.type === 'proactive' ? 'bg-indigo-500' : 'bg-blue-500'}`} 
                          style={{ width: `${rec.confidence}%` }} 
                        />
                      </div>
                      <span className="font-mono text-[8px] text-blue-400">{rec.confidence}% Conf.</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Future State Projections */}
        {projections.length > 0 && (
          <div>
            <div className="mb-2 font-mono text-[10px] text-blue-400/50 uppercase tracking-widest sticky top-0 bg-[#0F1115]/90 backdrop-blur-sm z-10 py-1">
              Future State Projections (t+5m)
            </div>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {projections.map((proj, i) => (
                  <motion.div
                    key={`${proj.sector}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5"
                  >
                    <span className="font-mono text-[10px] text-gray-300">{proj.sector}</span>
                    <div className="flex items-center gap-3">
                       <span className="font-mono text-[10px] text-gray-400">Load: {proj.projected_congestion}%</span>
                       {proj.trend === 'escalating' ? (
                          <TrendingUp className="h-3 w-3 text-red-500" />
                       ) : proj.trend === 'degrading' ? (
                          <TrendingDown className="h-3 w-3 text-emerald-500" />
                       ) : (
                          <span className="h-3 w-3 flex items-center justify-center text-gray-500">-</span>
                       )}
                       <span className={`font-mono text-[9px] px-1 rounded ${proj.risk_probability > 70 ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                          Risk {proj.risk_probability}%
                       </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </HoloCard>
  );
}
