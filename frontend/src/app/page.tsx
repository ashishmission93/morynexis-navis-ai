"use client";

import { Shell } from "@/components/layout/Shell";
import { StrategicCommandCenter } from "@/components/sections/StrategicCommandCenter";
import { MissionControl } from "@/components/sections/MissionControl";
import { AICopilot } from "@/components/sections/AICopilot";
import { DigitalTwinMap } from "@/components/sections/DigitalTwinMap";
import { LiveReasoningStream } from "@/components/sections/LiveReasoningStream";
import { OperationalMemory } from "@/components/sections/OperationalMemory";
import { ThreatIntelligence } from "@/components/sections/ThreatIntelligence";
import { MultiAgentNetwork } from "@/components/sections/MultiAgentNetwork";
import { useSimulationStore } from "@/store/useSimulationStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const presentationMode = useSimulationStore(state => state.presentationMode);

  return (
    <Shell>
      <div className="flex flex-col gap-4 pb-20 h-screen max-h-screen overflow-hidden">
        {/* Top Bar - Strategic Command Center */}
        <div className={`shrink-0 transition-all duration-700 ease-in-out ${presentationMode ? 'h-[80px] opacity-80' : 'h-[120px]'}`}>
          <StrategicCommandCenter />
        </div>
        
        {/* Main Operational Area */}
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          
          <AnimatePresence>
            {!presentationMode && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, display: 'none' }}
                className="col-span-3 flex flex-col gap-4 h-full min-h-0"
              >
                <div className="flex-1 min-h-0">
                  <MissionControl />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center Panel - Digital Twin & Copilot */}
          <motion.div 
            layout
            className={`${presentationMode ? 'col-span-9' : 'col-span-6'} h-full min-h-0 flex flex-col gap-4 transition-all duration-700`}
          >
            <div className="flex-1 min-h-0 relative">
               <DigitalTwinMap />
            </div>
            
            <AnimatePresence mode="wait">
               {presentationMode ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '300px' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="shrink-0"
                  >
                     <AICopilot />
                  </motion.div>
               ) : (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '180px' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="shrink-0"
                  >
                    <MultiAgentNetwork />
                  </motion.div>
               )}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel or Copilot in non-presentation mode */}
          <motion.div layout className="col-span-3 flex flex-col gap-4 h-full min-h-0">
            {presentationMode ? (
               <>
                  <div className="h-[250px] shrink-0">
                    <LiveReasoningStream />
                  </div>
                  <div className="flex-1 min-h-0">
                    <ThreatIntelligence />
                  </div>
               </>
            ) : (
               <>
                  <div className="h-[250px] shrink-0">
                    <LiveReasoningStream />
                  </div>
                  <div className="flex-1 min-h-0">
                    <OperationalMemory />
                  </div>
                  <div className="h-[250px] shrink-0">
                    <ThreatIntelligence />
                  </div>
               </>
            )}
          </motion.div>

          {/* Hidden Copilot for normal mode (we moved it here to manage layout gracefully) */}
          <AnimatePresence>
            {!presentationMode && (
               <motion.div 
                  initial={{ opacity: 0, position: 'absolute', bottom: 80, left: 16, width: '24%' }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bottom-20 left-4 w-[23.5%] h-[350px] z-40"
               >
                  <AICopilot />
               </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </Shell>
  );
}
