"use client";

import { useEffect, useRef } from "react";
import { useSimulationStore } from "../../store/useSimulationStore";
import { MockTelemetryEngine } from "../../lib/mockTelemetry";

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { setConnected, setConnectionStatus, updateState } = useSimulationStore();
  const mockEngineRef = useRef<MockTelemetryEngine | null>(null);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;
    const maxReconnectDelay = 5000;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "wss://morynexis-navis-ai-production.up.railway.app/ws/simulation";

    const connect = () => {
      setConnectionStatus('connecting');
      try {
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log("[NAVIS GRID] Live telemetry connected");
          setConnected(true);
          setConnectionStatus('live');
          reconnectAttempts = 0;
          if (mockEngineRef.current) {
            mockEngineRef.current.stop();
          }
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
          console.log("[NAVIS GRID] Disconnected from live telemetry");
          setConnected(false);
          
          if (reconnectAttempts < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), maxReconnectDelay);
            reconnectAttempts++;
            console.log(`[NAVIS GRID] Attempting reconnect ${reconnectAttempts}/${maxReconnectAttempts} in ${delay}ms...`);
            reconnectTimeout = setTimeout(connect, delay);
          } else {
            console.log("[NAVIS GRID] Max reconnects reached. Falling back to Autonomous Mock Engine.");
            setConnectionStatus('mock');
            if (!mockEngineRef.current) {
              mockEngineRef.current = new MockTelemetryEngine(updateState);
            }
            mockEngineRef.current.start();
          }
        };
        
        ws.onerror = (err) => {
           console.error("[NAVIS GRID] WebSocket error", err);
           setConnectionStatus('error');
           ws?.close();
        }
      } catch (err) {
        console.error("[NAVIS GRID] Failed to initialize WebSocket", err);
        setConnectionStatus('error');
        setConnected(false);
        // Fallback immediately
        if (!mockEngineRef.current) {
          mockEngineRef.current = new MockTelemetryEngine(updateState);
        }
        setConnectionStatus('mock');
        mockEngineRef.current.start();
      }
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (ws) {
        ws.onclose = null; // Prevent reconnect loop on unmount
        ws.close();
      }
      if (mockEngineRef.current) {
        mockEngineRef.current.stop();
      }
    };
  }, [setConnected, setConnectionStatus, updateState]);

  return <>{children}</>;
}
