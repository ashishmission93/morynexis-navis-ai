import { create } from 'zustand';

export interface Fleet {
    id: string;
    type: string;
    status: string;
    lat: number;
    lng: number;
    target_lat: number;
    target_lng: number;
    base_speed: number;
    speed: number;
}

export interface Sector {
    id: string;
    name: string;
    bounds: [[number, number], [number, number], [number, number], [number, number]];
    threat_level: string;
    congestion: number;
    ai_control: number;
    health: number;
    color: string;
    is_healing?: boolean;
}

export interface Projection {
    sector: string;
    projected_congestion: number;
    trend: string;
    risk_probability: number;
}

export interface ForecastItem {
    metric: string;
    value: number;
    trend: string;
}

export interface MultiHorizonForecast {
    t5m: ForecastItem[];
    t30m: ForecastItem[];
    t2h: ForecastItem[];
    t24h: ForecastItem[];
}

export interface Negotiation {
    id: string;
    topic: string;
    agent1: string;
    a1_stance: string;
    agent2: string;
    a2_stance: string;
    status: string;
    progress: number;
    timestamp: number;
    resolution?: string;
}

export interface AgentLog {
    id: string;
    agent: string;
    message: string;
    timestamp: number;
}

export interface ThreatEvent {
    id: string;
    type: string;
    description: string;
    severity: string;
    timestamp: number;
}

export interface Mission {
    id: string;
    type: string;
    zone: string;
    progress: number;
    status: string;
    confidence: number;
    assigned_fleets: number;
    timestamp: number;
}

export interface OperationalMemory {
    id: string;
    category: string;
    details: string;
    type: string;
    memory_class?: string;
    timestamp: number;
}

export interface StrategicRecommendation {
    id: string;
    title: string;
    impact: string;
    confidence: number;
    type?: string;
}

export interface Metrics {
    active_nodes: number;
    threat_level: string;
    system_load: number;
    anomalies_detected: number;
    network_stability: number;
    efficiency_index: number;
    coordination_quality: number;
    readiness_index: number;
    global_pressure: number;
    infrastructure_fatigue: number;
    energy_consumption: number;
    mobility_demand: number;
    ecosystem_resilience: number;
    governance_mode: string;
    civilization_cycle: string;
}

export interface SimulationState {
    fleets: Fleet[];
    sectors: Sector[];
    projections: Projection[];
    forecasts: MultiHorizonForecast;
    negotiations: Negotiation[];
    agent_logs: AgentLog[];
    threat_events: ThreatEvent[];
    missions: Mission[];
    operational_memory: OperationalMemory[];
    strategic_recommendations: StrategicRecommendation[];
    metrics: Metrics;
    isConnected: boolean;
    connectionStatus: 'connecting' | 'live' | 'mock' | 'error' | 'offline';
    presentationMode: boolean;
    setConnected: (status: boolean) => void;
    setConnectionStatus: (status: 'connecting' | 'live' | 'mock' | 'error' | 'offline') => void;
    togglePresentationMode: () => void;
    updateState: (newState: Partial<SimulationState>) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    fleets: [],
    sectors: [],
    projections: [],
    forecasts: { t5m: [], t30m: [], t2h: [], t24h: [] },
    negotiations: [],
    agent_logs: [],
    threat_events: [],
    missions: [],
    operational_memory: [],
    strategic_recommendations: [],
    metrics: {
        active_nodes: 0,
        threat_level: "UNKNOWN",
        system_load: 0,
        anomalies_detected: 0,
        network_stability: 0,
        efficiency_index: 0,
        coordination_quality: 0,
        readiness_index: 0,
        global_pressure: 0,
        infrastructure_fatigue: 0,
        energy_consumption: 0,
        mobility_demand: 0,
        ecosystem_resilience: 0,
        governance_mode: "UNKNOWN",
        civilization_cycle: "UNKNOWN"
    },
    isConnected: false,
    connectionStatus: 'offline',
    presentationMode: false,
    setConnected: (status) => set({ isConnected: status }),
    setConnectionStatus: (status) => set({ connectionStatus: status }),
    togglePresentationMode: () => set((state) => ({ presentationMode: !state.presentationMode })),
    updateState: (newState) => set((state) => ({ ...state, ...newState }))
}));
