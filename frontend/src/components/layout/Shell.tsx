"use client";

import { motion } from "framer-motion";
import { Activity, ShieldAlert, BrainCircuit, Rocket, Map, Target, Server, Database } from "lucide-react";
import { cn } from "../../lib/utils";
import { AnimatedPulse } from "../ui/AnimatedPulse";
import { useState } from "react";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [activeTab, setActiveTab] = useState("Command");

  const navItems = [
    { name: "Command", icon: Target, id: "command" },
    { name: "Global Map", icon: Map, id: "map" },
    { name: "AI Network", icon: BrainCircuit, id: "ai" },
    { name: "Fleet", icon: Rocket, id: "fleet" },
    { name: "Threats", icon: ShieldAlert, id: "threats" },
    { name: "Telemetry", icon: Activity, id: "telemetry" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-transparent">
      {/* Sidebar Navigation */}
      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-40 w-16 flex-col items-center justify-between border-r border-cyan-500/20 bg-[#060B19]/90 backdrop-blur-xl hidden md:flex"
      >
        <div className="flex w-full flex-col items-center gap-8 py-4">
          {/* Logo / System Status */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400 bg-cyan-950/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Database className="h-4 w-4 text-cyan-400" />
            </div>
            <AnimatedPulse color="cyan" size="sm" />
          </div>

          <div className="h-[1px] w-6 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Nav Items */}
          <div className="flex w-full flex-col items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "group relative flex h-10 w-full items-center justify-center transition-all duration-300",
                  activeTab === item.name ? "text-cyan-400" : "text-gray-500 hover:text-cyan-200"
                )}
                title={item.name}
              >
                {activeTab === item.name && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 h-full w-1 bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                  />
                )}
                <item.icon className={cn("h-5 w-5 transition-all duration-300", activeTab === item.name && "drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]")} />
                
                {/* Tooltip */}
                <div className="pointer-events-none absolute left-14 translate-x-4 z-50 rounded border border-cyan-500/30 bg-[#0F1115] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  {item.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Status */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex flex-col items-center gap-1">
            <Server className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-[8px] text-emerald-400">99.9%</span>
          </div>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex h-full flex-1 flex-col overflow-hidden p-4">
        {/* Page Content */}
        <div className="flex-1 w-full max-w-[2000px] mx-auto overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
