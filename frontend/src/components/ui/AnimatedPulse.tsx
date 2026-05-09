"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedPulseProps {
  color?: "cyan" | "blue" | "purple" | "teal" | "red" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AnimatedPulse({ color = "cyan", size = "md", className }: AnimatedPulseProps) {
  const colorMap = {
    cyan: "bg-cyan-400",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    teal: "bg-teal-400",
    red: "bg-red-500",
    green: "bg-green-500",
  };

  const sizeMap = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeMap[size], className)}>
      <motion.div
        className={cn("absolute inset-0 rounded-full", colorMap[color])}
        animate={{ scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={cn("relative rounded-full z-10", colorMap[color], sizeMap[size])} />
    </div>
  );
}
