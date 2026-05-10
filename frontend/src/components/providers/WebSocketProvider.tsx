"use client";

import { useEffect } from "react";
import { useSimulationStore } from "../../store/useSimulationStore";

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { setConnected, updateState } = useSimulationStore();

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let reconnectAttempts = 0;
    const maxReconnectDelay = 10000;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:8000/ws/simulation";

    const connect = () => {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("Connected to NAVIS PRIME GRID telemetry");
        setConnected(true);
        reconnectAttempts = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          updateState(data);
        } catch (e) {
          console.error("Error parsing telemetry:", e);
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from telemetry");
        setConnected(false);
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), maxReconnectDelay);
        reconnectAttempts++;
        console.log(`Attempting reconnect in ${delay}ms...`);
        reconnectTimeout = setTimeout(connect, delay);
      };
      
      ws.onerror = (err) => {
         console.error("WebSocket error", err);
         ws?.close();
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws) {
        ws.onclose = null; // Prevent reconnect loop on unmount
        ws.close();
      }
    };
  }, [setConnected, updateState]);

  return <>{children}</>;
}
