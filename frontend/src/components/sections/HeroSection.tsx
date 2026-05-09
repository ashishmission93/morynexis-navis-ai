"use client";

import { motion } from "framer-motion";
import { GlowingButton } from "../ui/GlowingButton";
import { Shield, Brain, Globe, Crosshair } from "lucide-react";

export function HeroSection() {
  const handleCommand = () => {
    alert("Command Protocol Initialized. Synchronizing Fleet Data...");
  };

  const handleGlobalTwin = () => {
    // Scroll down to the Digital Twin section
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div className="relative flex flex-col justify-between min-h-[70vh] w-full pt-20 pb-10 overflow-hidden rounded-2xl border border-cyan-500/20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-[#060B19]/90">
      
      {/* Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_50%)]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_70%,transparent_100%)]" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">System Initialization Complete</span>
        </motion.div>

        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-tight drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-6 leading-tight">
          AUTONOMOUS MOBILITY<br />
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">INTELLIGENCE</span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
          The AI infrastructure for next-generation autonomous systems. Multi-agent orchestration, predictive threat analysis, and digital twin mission control.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <GlowingButton onClick={handleCommand} variant="primary" className="h-14 px-8 text-base shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <Crosshair className="w-5 h-5 mr-2" />
            Initialize Command
          </GlowingButton>
          <GlowingButton onClick={handleGlobalTwin} variant="outline" className="h-14 px-8 text-base">
            <Globe className="w-5 h-5 mr-2" />
            View Global Twin
          </GlowingButton>
        </div>
      </motion.div>

      {/* Floating System Cards */}
      <div className="relative z-10 w-full px-10 hidden md:grid grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
        {[
          { title: "Neural Orchestration", icon: Brain, status: "Active", value: "99.8%" },
          { title: "Fleet Sync", icon: Globe, status: "Synced", value: "1,204 Nodes" },
          { title: "Threat Intel", icon: Shield, status: "Monitoring", value: "Zero Risk" },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0F1115]/60 p-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-cyan-950/50 p-2 border border-cyan-500/30 text-cyan-400">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{stat.title}</div>
                <div className="font-mono text-sm text-white">{stat.value}</div>
              </div>
            </div>
            <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              {stat.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
