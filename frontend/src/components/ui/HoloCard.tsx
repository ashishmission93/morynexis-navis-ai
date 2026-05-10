"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface HoloCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "blue" | "purple" | "teal" | "red" | "emerald" | "orange" | "yellow";
  active?: boolean;
}

export function HoloCard({
  children,
  className,
  glowColor = "cyan",
  active = false,
  ...props
}: HoloCardProps) {
  const glowMap = {
    cyan: "rgba(0, 255, 255, 0.2)",
    blue: "rgba(0, 240, 255, 0.2)",
    purple: "rgba(138, 43, 226, 0.2)",
    teal: "rgba(0, 255, 204, 0.2)",
    red: "rgba(255, 0, 0, 0.2)",
    emerald: "rgba(16, 185, 129, 0.2)",
    orange: "rgba(249, 115, 22, 0.2)",
    yellow: "rgba(234, 179, 8, 0.2)",
  };

  const activeGlowMap = {
    cyan: "rgba(0, 255, 255, 0.6)",
    blue: "rgba(0, 240, 255, 0.6)",
    purple: "rgba(138, 43, 226, 0.6)",
    teal: "rgba(0, 255, 204, 0.6)",
    red: "rgba(255, 0, 0, 0.6)",
    emerald: "rgba(16, 185, 129, 0.6)",
    orange: "rgba(249, 115, 22, 0.6)",
    yellow: "rgba(234, 179, 8, 0.6)",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-white/10 bg-[#0F1115]/60 backdrop-blur-md overflow-hidden transition-all duration-300",
        active ? "border-opacity-50" : "hover:border-opacity-30",
        className
      )}
      style={{
        boxShadow: active
          ? `0 0 20px ${activeGlowMap[glowColor]}, inset 0 0 10px ${glowMap[glowColor]}`
          : `0 4px 20px rgba(0,0,0,0.5)`,
        borderColor: active ? glowMap[glowColor] : "rgba(255,255,255,0.1)",
      }}
      whileHover={{
        boxShadow: `0 0 30px ${glowMap[glowColor]}, inset 0 0 15px ${glowMap[glowColor]}`,
        borderColor: glowMap[glowColor],
      }}
      {...props}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />

      {/* Content */}
      <div className="relative z-10 h-full w-full">{children}</div>

      {/* Animated scanline inside card */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl opacity-20">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent animate-scanline mix-blend-overlay" />
      </div>
    </motion.div>
  );
}
