"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "ghost" | "outline";
}

export function GlowingButton({ children, variant = "primary", className, ...props }: GlowingButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center overflow-hidden rounded-md px-6 py-2.5 font-mono text-sm uppercase tracking-wider transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]",
    danger: "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 hover:border-red-400 hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]",
    outline: "bg-transparent text-gray-300 border border-white/20 hover:border-white/50 hover:text-white",
    ghost: "bg-transparent text-cyan-400 hover:bg-cyan-500/10",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant !== "ghost" && variant !== "outline" && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite] mix-blend-overlay" />
      )}
    </button>
  );
}
