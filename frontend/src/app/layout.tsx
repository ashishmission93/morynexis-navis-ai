import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WebSocketProvider } from "../components/providers/WebSocketProvider";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Morynexis NAVIS AI | Autonomous Mobility OS",
  description: "Enterprise-grade AI operating system for autonomous systems and multi-agent coordination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col relative text-white bg-black">
        <WebSocketProvider>
          {/* Cinematic Scanline Overlay */}
          <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay"></div>
          {/* Animated Scanline bar */}
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <div className="h-[2px] w-full bg-cyan-400/30 blur-[1px] animate-scanline shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
          </div>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  );
}
