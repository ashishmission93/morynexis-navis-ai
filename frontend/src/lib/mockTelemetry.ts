import { SimulationState, Fleet, Sector, Projection, AgentLog, ThreatEvent, Mission, OperationalMemory, StrategicRecommendation } from '../store/useSimulationStore';

export class MockTelemetryEngine {
  private intervalId: NodeJS.Timeout | null = null;
  private updateState: (state: Partial<SimulationState>) => void;
  private tickCount = 0;

  // Mock initial state
  private metrics = {
    active_nodes: 1024,
    threat_level: 'NOMINAL',
    system_load: 42.5,
    anomalies_detected: 0,
    network_stability: 99.9,
    efficiency_index: 85.0,
    coordination_quality: 92.0,
    readiness_index: 100.0,
    global_pressure: 30.0,
    infrastructure_fatigue: 15.0,
    energy_consumption: 60.0,
    mobility_demand: 40.0,
    ecosystem_resilience: 88.0,
    governance_mode: 'STABILITY_MAXIMIZER',
    civilization_cycle: 'MIDDAY_PEAK'
  };

  private sectors: Sector[] = [
    { id: "S1", name: "Sector Alpha", bounds: [[-74.01, 40.72], [-73.99, 40.72], [-73.99, 40.70], [-74.01, 40.70]], threat_level: "LOW", congestion: 30, ai_control: 90, health: 100, color: "cyan" },
    { id: "S2", name: "Sector Beta", bounds: [[-73.99, 40.74], [-73.97, 40.74], [-73.97, 40.72], [-73.99, 40.72]], threat_level: "MEDIUM", congestion: 65, ai_control: 80, health: 90, color: "blue" },
    { id: "S3", name: "Sector Gamma", bounds: [[-74.02, 40.75], [-73.99, 40.75], [-73.99, 40.72], [-74.02, 40.72]], threat_level: "HIGH", congestion: 85, ai_control: 70, health: 75, color: "orange" },
  ];

  private fleets: Fleet[] = [
    { id: "F-01", type: "drone", status: "active", lat: 40.71, lng: -74.00, target_lat: 40.73, target_lng: -73.98, base_speed: 1, speed: 1 },
    { id: "F-02", type: "transport", status: "routing", lat: 40.73, lng: -73.98, target_lat: 40.74, target_lng: -74.01, base_speed: 0.8, speed: 0.8 },
    { id: "F-03", type: "defense", status: "warning", lat: 40.74, lng: -74.01, target_lat: 40.71, target_lng: -74.00, base_speed: 1.2, speed: 1.2 },
  ];

  private agent_logs: AgentLog[] = [];
  private threat_events: ThreatEvent[] = [];
  private missions: Mission[] = [
    { id: "M-001", type: "Recon", zone: "Sector Beta", progress: 45, status: "active", confidence: 88, assigned_fleets: 2, timestamp: Date.now() / 1000 }
  ];

  constructor(updateState: (state: Partial<SimulationState>) => void) {
    this.updateState = updateState;
  }

  private currentForecasts = {
    t5m: [{ metric: "Congestion", value: 45, trend: "stable" }],
    t30m: [{ metric: "Energy Draw", value: 65, trend: "escalating" }],
    t2h: [{ metric: "Grid Load", value: 80, trend: "volatile" }],
    t24h: [{ metric: "System Resilience", value: 92, trend: "stable" }]
  };

  public start() {
    if (this.intervalId) return;
    console.log("[MOCK TELEMETRY] Engine started");

    // Send initial state immediately
    const initialState: Partial<SimulationState> = {
      metrics: { ...this.metrics },
      sectors: [...this.sectors],
      fleets: [...this.fleets],
      missions: [...this.missions],
      forecasts: { ...this.currentForecasts }
    };

    this.updateState(initialState);
    this.intervalId = setInterval(() => this.tick(), 2000);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("[MOCK TELEMETRY] Engine stopped");
    }
  }

  private tick() {
    this.tickCount++;

    // Randomize metrics slightly
    this.metrics.system_load = Math.max(10, Math.min(100, this.metrics.system_load + (Math.random() * 4 - 2)));
    this.metrics.global_pressure = Math.max(0, Math.min(100, this.metrics.global_pressure + (Math.random() * 2 - 1)));
    this.metrics.energy_consumption = Math.max(20, Math.min(100, this.metrics.energy_consumption + (Math.random() * 3 - 1.5)));
    this.metrics.threat_level = this.metrics.system_load > 85 ? 'CRITICAL' : this.metrics.system_load > 70 ? 'WARNING' : 'NOMINAL';

    // Move fleets
    this.fleets = this.fleets.map(f => {
      const dx = f.target_lng - f.lng;
      const dy = f.target_lat - f.lat;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 0.001) {
        // Pick new target
        return {
          ...f,
          target_lat: 40.70 + Math.random() * 0.06,
          target_lng: -74.02 + Math.random() * 0.05
        };
      }
      
      const moveDist = 0.002 * f.speed;
      return {
        ...f,
        lng: f.lng + (dx / dist) * moveDist,
        lat: f.lat + (dy / dist) * moveDist
      };
    });

    // Update mission progress
    this.missions = this.missions.map(m => {
      if (m.progress >= 100) return m;
      return { ...m, progress: Math.min(100, m.progress + Math.random() * 5) };
    });

    // Generate random logs occasionally
    if (Math.random() < 0.3) {
      const agents = ["Optimization", "Risk", "Traffic", "Navigation"];
      const messages = ["Rerouting active streams", "Anomaly contained", "Optimizing throughput", "Consensus Reached"];
      this.agent_logs.push({
        id: `log-${Date.now()}`,
        agent: agents[Math.floor(Math.random() * agents.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: Date.now() / 1000
      });
      if (this.agent_logs.length > 20) this.agent_logs.shift();
    }

    // Dynamic forecasts
    if (this.tickCount % 5 === 0) {
      this.currentForecasts.t5m[0].value = Math.max(10, Math.min(90, this.currentForecasts.t5m[0].value + (Math.random() * 6 - 3)));
      this.currentForecasts.t30m[0].value = Math.max(20, Math.min(100, this.currentForecasts.t30m[0].value + (Math.random() * 4 - 2)));
    }

    // Random threats
    if (Math.random() < 0.1) {
      const types = ["CYBER_INTRUSION", "HARDWARE_FAILURE", "NETWORK_PARTITION", "TRAFFIC_SPIKE"];
      const desc = ["Unauthorized access attempt", "Node degraded in Sector B", "Latency spike detected", "Sudden load increase"];
      this.threat_events.unshift({
        id: `th-${Date.now()}`,
        type: types[Math.floor(Math.random() * types.length)],
        description: desc[Math.floor(Math.random() * desc.length)],
        severity: Math.random() > 0.8 ? "CRITICAL" : "WARNING",
        timestamp: Date.now() / 1000
      });
      if (this.threat_events.length > 5) this.threat_events.pop();
    }

    this.updateState({
      metrics: { ...this.metrics },
      fleets: [...this.fleets],
      missions: [...this.missions],
      agent_logs: [...this.agent_logs],
      forecasts: { ...this.currentForecasts },
      threat_events: [...this.threat_events]
    });
  }
}
