import asyncio
import random
import uuid
import time
from typing import List, Dict, Any

class SimulationEngine:
    def __init__(self):
        self.is_running = False
        self.base_lat = 40.7128 # NAVIS PRIME GRID
        self.base_lng = -74.0060
        self.fleets = self._generate_initial_fleets(80)
        self.agents = ["Optimization", "Navigation", "Risk", "Traffic", "Weather", "Defense", "Core"]
        self.agent_logs: List[Dict[str, Any]] = []
        self.threat_events: List[Dict[str, Any]] = []
        self.missions: List[Dict[str, Any]] = []
        self.operational_memory: List[Dict[str, Any]] = []
        self.strategic_recommendations: List[Dict[str, Any]] = []
        
        self.sectors = [
            {"id": "SEC-ALPHA", "name": "Sector Alpha", "bounds": [[-74.020, 40.720], [-73.990, 40.720], [-73.990, 40.740], [-74.020, 40.740]], "threat_level": "NOMINAL", "congestion": 30.0, "ai_control": 95.0, "health": 100.0, "color": "emerald", "is_healing": False},
            {"id": "SEC-BETA", "name": "Neo Urban Zone-7", "bounds": [[-74.050, 40.690], [-74.020, 40.690], [-74.020, 40.720], [-74.050, 40.720]], "threat_level": "NOMINAL", "congestion": 45.0, "ai_control": 90.0, "health": 98.0, "color": "cyan", "is_healing": False},
            {"id": "SEC-GAMMA", "name": "Corridor-X", "bounds": [[-74.020, 40.690], [-73.990, 40.690], [-73.990, 40.720], [-74.020, 40.720]], "threat_level": "WARNING", "congestion": 75.0, "ai_control": 82.0, "health": 85.0, "color": "orange", "is_healing": False},
            {"id": "SEC-DELTA", "name": "Aerospace Grid", "bounds": [[-73.990, 40.690], [-73.960, 40.690], [-73.960, 40.740], [-73.990, 40.740]], "threat_level": "NOMINAL", "congestion": 20.0, "ai_control": 99.0, "health": 100.0, "color": "blue", "is_healing": False}
        ]
        
        self.projections = []
        self.forecasts = {"t5m": [], "t30m": [], "t2h": [], "t24h": []}
        self.negotiations = []

        self.metrics = {
            "active_nodes": 1404,
            "threat_level": "NOMINAL",
            "system_load": 42.5,
            "anomalies_detected": 0,
            "network_stability": 99.9,
            "efficiency_index": 98.2,
            "coordination_quality": 95.5,
            "readiness_index": 100.0,
            "global_pressure": 15.0,
            "infrastructure_fatigue": 5.0,
            "energy_consumption": 45.0,
            "mobility_demand": 60.0,
            "ecosystem_resilience": 90.0,
            "governance_mode": "EFFICIENCY_OPTIMIZER",
            "civilization_cycle": "MORNING_SURGE"
        }
        
        self.active_emergencies = False
        self.storm_active = False
        self.cycle_timer = 0
        
        self._add_memory("System Boot", "NAVIS PRIME GRID orchestration layer online. Stabilization doctrines active.", "success", "governance")
        self.add_agent_log("Core", "Orchestration node initialized. Governing logic engaged.")
        self._generate_strategic_recommendations()

    def _generate_initial_fleets(self, count: int) -> List[Dict]:
        fleets = []
        types = ["drone", "vehicle", "defense"]
        for i in range(count):
            fleet_type = random.choice(types)
            speed_mult = 1.0
            if fleet_type == "drone": speed_mult = 1.5
            if fleet_type == "defense": speed_mult = 2.0
            
            fleets.append({
                "id": f"{fleet_type[:2].upper()}-{random.randint(1000, 9999)}",
                "type": fleet_type,
                "status": "active" if random.random() > 0.1 else "routing",
                "lat": self.base_lat + random.uniform(-0.04, 0.04),
                "lng": self.base_lng + random.uniform(-0.04, 0.04),
                "target_lat": self.base_lat + random.uniform(-0.04, 0.04),
                "target_lng": self.base_lng + random.uniform(-0.04, 0.04),
                "base_speed": random.uniform(0.0005, 0.0015) * speed_mult,
                "speed": random.uniform(0.0005, 0.0015) * speed_mult
            })
        return fleets

    def get_state(self):
        return {
            "fleets": self.fleets,
            "agent_logs": self.agent_logs[-30:],
            "threat_events": self.threat_events[-15:],
            "missions": self.missions[-8:],
            "operational_memory": self.operational_memory[-15:],
            "strategic_recommendations": self.strategic_recommendations,
            "metrics": self.metrics,
            "sectors": self.sectors,
            "projections": self.projections,
            "forecasts": self.forecasts,
            "negotiations": self.negotiations
        }

    async def run_loop(self):
        self.is_running = True
        while self.is_running:
            self._simulate_civilization_cycles()
            self._update_fleets()
            self._simulate_sectors() 
            self._simulate_agent_activity()
            self._simulate_negotiations()
            self._update_metrics()
            self._simulate_environmental_events()
            self._simulate_mission_progress()
            self._generate_projections()
            self._generate_multi_horizon_forecasts()
            self._autonomous_interventions()
            self._evaluate_governance_mode()
            self.cycle_timer += 1
            await asyncio.sleep(1)

    def _simulate_civilization_cycles(self):
        cycle_length = 60 # 60 seconds per macro cycle for simulation pacing
        current_phase = (self.cycle_timer // cycle_length) % 4
        
        if current_phase == 0:
            new_cycle = "MORNING_SURGE"
            target_demand = 85.0
        elif current_phase == 1:
            new_cycle = "MIDDAY_PEAK"
            target_demand = 95.0
        elif current_phase == 2:
            new_cycle = "EVENING_SATURATION"
            target_demand = 75.0
        else:
            new_cycle = "NIGHTTIME_RECOVERY"
            target_demand = 30.0

        if new_cycle != self.metrics["civilization_cycle"]:
            self.metrics["civilization_cycle"] = new_cycle
            self._add_memory("Cycle Shift", f"Ecosystem transitioning to {new_cycle}.", "info", "event")
            self.add_agent_log("Core", f"Operational parameters shifting to {new_cycle} dynamics.")

        # Smooth interpolation towards target demand
        demand_diff = target_demand - self.metrics["mobility_demand"]
        self.metrics["mobility_demand"] += demand_diff * 0.05 + random.uniform(-1.0, 1.0)
        self.metrics["mobility_demand"] = max(0.0, min(100.0, self.metrics["mobility_demand"]))
        
        self.metrics["energy_consumption"] = max(30.0, min(100.0, self.metrics["energy_consumption"] + (demand_diff * 0.02) + random.uniform(-0.5, 0.5)))
        
        if self.metrics["civilization_cycle"] == "NIGHTTIME_RECOVERY":
            self.metrics["ecosystem_resilience"] = min(100.0, self.metrics["ecosystem_resilience"] + random.uniform(0.5, 1.5))
            self.metrics["global_pressure"] = max(0.0, self.metrics["global_pressure"] - random.uniform(0.5, 2.0))
        elif self.metrics["global_pressure"] > 70:
            self.metrics["ecosystem_resilience"] = max(10.0, self.metrics["ecosystem_resilience"] - random.uniform(0.1, 0.5))

    def _evaluate_governance_mode(self):
        current_mode = self.metrics["governance_mode"]
        p_idx = self.metrics["global_pressure"]
        r_idx = self.metrics["ecosystem_resilience"]
        
        new_mode = current_mode
        # Use hysteresis: higher threshold to enter a state, lower to exit
        if current_mode != "AGGRESSIVE_INTERVENTIONIST" and p_idx > 85:
            new_mode = "AGGRESSIVE_INTERVENTIONIST"
        elif current_mode == "AGGRESSIVE_INTERVENTIONIST" and p_idx < 70:
             # Look for next best mode
             if r_idx < 50: new_mode = "RESILIENCE_PRIORITY"
             else: new_mode = "EFFICIENCY_OPTIMIZER"
             
        elif current_mode != "RESILIENCE_PRIORITY" and p_idx > 60 and r_idx < 50:
            new_mode = "RESILIENCE_PRIORITY"
        elif current_mode == "RESILIENCE_PRIORITY" and (p_idx < 40 or r_idx > 70):
             new_mode = "EFFICIENCY_OPTIMIZER"
             
        elif current_mode != "EFFICIENCY_OPTIMIZER" and p_idx < 40 and r_idx > 70:
            new_mode = "EFFICIENCY_OPTIMIZER"
            
        if new_mode != current_mode:
            self.metrics["governance_mode"] = new_mode
            self._add_memory("Governance Shift", f"Autonomous doctrine escalated to {new_mode}.", "alert", "policy")
            self.add_agent_log("Core", f"Governance Doctrine shifted to: {new_mode}. Reprioritizing objectives.")

    def _update_fleets(self):
        # Fleet speed is affected by the cycle and governance mode
        speed_multiplier = 1.0
        if self.metrics["civilization_cycle"] == "NIGHTTIME_RECOVERY":
            speed_multiplier = 0.5
        elif self.metrics["civilization_cycle"] == "MIDDAY_PEAK":
            speed_multiplier = 1.2
            
        if self.metrics["governance_mode"] == "EFFICIENCY_OPTIMIZER":
            speed_multiplier *= 1.1

        for fleet in self.fleets:
            if fleet["status"] == "halted":
                continue
                
            fleet["speed"] = fleet["base_speed"] * speed_multiplier
                
            dx = fleet["target_lng"] - fleet["lng"]
            dy = fleet["target_lat"] - fleet["lat"]
            dist = (dx**2 + dy**2)**0.5
            
            if dist < fleet["speed"]:
                fleet["target_lat"] = self.base_lat + random.uniform(-0.04, 0.04)
                fleet["target_lng"] = self.base_lng + random.uniform(-0.04, 0.04)
                if self.active_emergencies and fleet["type"] != "defense":
                    fleet["status"] = "rerouting"
                else:
                    fleet["status"] = "active"
            else:
                jitter_lat = random.uniform(-0.0003, 0.0003) if self.storm_active else 0
                jitter_lng = random.uniform(-0.0003, 0.0003) if self.storm_active else 0
                
                fleet["lng"] += (dx / dist) * fleet["speed"] + jitter_lng
                fleet["lat"] += (dy / dist) * fleet["speed"] + jitter_lat
                
            if random.random() < 0.002 and not self.active_emergencies:
                fleet["status"] = "warning"
            elif fleet["status"] == "warning" and random.random() < 0.1:
                fleet["status"] = "active"

    def _simulate_sectors(self):
        total_congestion = 0
        total_health = 0
        
        for i, sector in enumerate(self.sectors):
            demand_influence = (self.metrics["mobility_demand"] - 50) * 0.05
            sector["congestion"] = max(0.0, min(100.0, sector["congestion"] + random.uniform(-1.5, 2.0) + demand_influence))
            
            if self.storm_active:
                sector["congestion"] += random.uniform(1, 4)
                sector["health"] = max(0.0, sector["health"] - random.uniform(0.5, 2))
                sector["ai_control"] = max(20.0, sector["ai_control"] - random.uniform(0.5, 3))
                sector["is_healing"] = False
            else:
                fatigue_penalty = self.metrics["infrastructure_fatigue"] / 100.0
                
                # Nighttime Recovery heavily promotes self-healing
                healing_threshold = 70 if self.metrics["civilization_cycle"] == "NIGHTTIME_RECOVERY" else 60
                
                if sector["health"] < 90 and sector["congestion"] < healing_threshold:
                    sector["is_healing"] = True
                    sector["health"] += random.uniform(0.5, 2.5) * (1 - fatigue_penalty)
                    if random.random() < 0.02:
                        self.add_agent_log("Core", f"Autonomous stabilization corridor active in {sector['name']}.")
                else:
                    sector["is_healing"] = False
                    sector["health"] = min(100.0, sector["health"] + random.uniform(0.1, 0.5) * (1 - fatigue_penalty))
                    
                sector["ai_control"] = min(100.0, sector["ai_control"] + random.uniform(0.5, 1.5))
                
            if sector["congestion"] > 90 or sector["health"] < 40:
                sector["threat_level"] = "CRITICAL"
                sector["color"] = "red"
            elif sector["congestion"] > 70 or sector["health"] < 70:
                sector["threat_level"] = "WARNING"
                sector["color"] = "orange"
            elif sector["congestion"] > 40:
                sector["threat_level"] = "ELEVATED"
                sector["color"] = "yellow"
            else:
                sector["threat_level"] = "NOMINAL"
                sector["color"] = "blue" if sector["is_healing"] else ("emerald" if sector["ai_control"] > 90 else "cyan")
                
            if sector["congestion"] > 85 and random.random() < 0.2:
                next_i = (i + 1) % len(self.sectors)
                self.sectors[next_i]["congestion"] += 5
            
            total_congestion += sector["congestion"]
            total_health += sector["health"]
            
        avg_congestion = total_congestion / len(self.sectors)
        self.metrics["system_load"] = avg_congestion
        
        if avg_congestion > 70:
            self.metrics["global_pressure"] = min(100.0, self.metrics["global_pressure"] + random.uniform(0.5, 2.0))
        else:
            self.metrics["global_pressure"] = max(0.0, self.metrics["global_pressure"] - random.uniform(0.2, 1.5))
            
        if self.metrics["global_pressure"] > 80:
            self.metrics["infrastructure_fatigue"] = min(100.0, self.metrics["infrastructure_fatigue"] + random.uniform(0.05, 0.3))
        elif self.metrics["global_pressure"] < 30:
            self.metrics["infrastructure_fatigue"] = max(0.0, self.metrics["infrastructure_fatigue"] - random.uniform(0.01, 0.1))

    def _simulate_agent_activity(self):
        if random.random() < 0.35:
            agent = random.choice(self.agents)
            actions = [
                "Redistributing systemic energy loads.",
                "Executing strategic micro-routing on Beta swarm.",
                "Resilience protocols active in Sector Delta.",
                "Telemetry synchronized with Governance Core.",
                "Predictive load balancing executed.",
                "Civilization mobility density spike modeled."
            ]
            self.add_agent_log(agent, random.choice(actions))

    def _simulate_negotiations(self):
        self.negotiations = [n for n in self.negotiations if n["status"] != "resolved" or (time.time() - n["timestamp"] < 10)]
        
        if random.random() < 0.05 and len(self.negotiations) == 0 and self.metrics["global_pressure"] > 50:
            agents = random.sample(self.agents, 2)
            topics = [
                {"topic": "Sector Lockdown", "a1_stance": "Recommend immediate lockdown.", "a2_stance": "Counters with predictive rerouting."},
                {"topic": "Energy Rebalancing", "a1_stance": "Throttle civilian mobility networks.", "a2_stance": "Divert power from Aerospace Grid."},
                {"topic": "Infrastructure Prioritization", "a1_stance": "Allocate repair swarms to Sector Alpha.", "a2_stance": "Preserve swarms for Core Node."}
            ]
            topic = random.choice(topics)
            self.negotiations.append({
                "id": str(uuid.uuid4()),
                "topic": topic["topic"],
                "agent1": agents[0],
                "a1_stance": topic["a1_stance"],
                "agent2": agents[1],
                "a2_stance": topic["a2_stance"],
                "status": "debating",
                "progress": 0,
                "timestamp": time.time()
            })
            
        for n in self.negotiations:
            if n["status"] == "debating":
                n["progress"] += random.uniform(5, 15)
                if n["progress"] >= 100:
                    n["status"] = "resolved"
                    n["progress"] = 100
                    resolution = f"Consensus Reached: {n['topic']} resolved via strategic governance."
                    n["resolution"] = resolution
                    self.add_agent_log("Core", resolution)
                    self.metrics["coordination_quality"] = min(100.0, self.metrics["coordination_quality"] + 2)

    def _simulate_environmental_events(self):
        if self.storm_active and random.random() < 0.1:
            self.metrics["network_stability"] = max(50.0, self.metrics["network_stability"] - random.uniform(1, 5))

    def _simulate_mission_progress(self):
        if random.random() < 0.02 and len(self.missions) < 8:
            m_types = ["Infrastructure Regeneration", "Congestion Mitigation", "Energy Grid Balancing", "Autonomous Logistics"]
            sector = random.choice(self.sectors)
            self.missions.append({
                "id": f"MSN-{random.randint(100,999)}",
                "type": random.choice(m_types),
                "zone": sector["name"],
                "progress": 0,
                "status": "In Progress",
                "confidence": int(sector["ai_control"]),
                "assigned_fleets": random.randint(3, 12),
                "timestamp": time.time()
            })

        for m in self.missions:
            if m["status"] == "In Progress":
                m["progress"] += random.uniform(0.5, 2.5)
                if m["progress"] >= 100:
                    m["progress"] = 100
                    m["status"] = "Completed"
                    self._add_memory("Mission Success", f"Governance directive {m['type']} concluded.", "success", "mission")
                    self.metrics["readiness_index"] = min(100.0, self.metrics["readiness_index"] + 2)

        self.missions = [m for m in self.missions if m["status"] == "In Progress" or (time.time() - m["timestamp"] < 60)]

    def _generate_projections(self):
        if random.random() < 0.1:
            self.projections = []
            for sector in self.sectors:
                trend = random.choice(["escalating", "stabilizing", "degrading"])
                proj_congestion = sector["congestion"] + (15 if trend == "escalating" else -10)
                proj_congestion = max(0, min(100, proj_congestion))
                
                self.projections.append({
                    "sector": sector["name"],
                    "projected_congestion": proj_congestion,
                    "trend": trend,
                    "risk_probability": int(proj_congestion * 0.8)
                })

    def _generate_multi_horizon_forecasts(self):
        if random.random() < 0.05:
            r_idx = self.metrics["readiness_index"]
            p_idx = self.metrics["global_pressure"]
            f_idx = self.metrics["infrastructure_fatigue"]
            
            self.forecasts = {
                "t5m": [
                    {"metric": "Operational Readiness", "value": int(max(0, min(100, r_idx + random.uniform(-5, 5)))), "trend": "volatile"},
                    {"metric": "Congestion Spread", "value": int(max(0, min(100, p_idx + random.uniform(-2, 10)))), "trend": "escalating" if p_idx > 50 else "stable"}
                ],
                "t30m": [
                    {"metric": "Sector Collapse Prob", "value": int(max(0, min(100, p_idx * 1.2))), "trend": "escalating"},
                    {"metric": "AI Stabilization Conf", "value": int(max(0, min(100, 100 - (p_idx * 0.5)))), "trend": "degrading"}
                ],
                "t2h": [
                    {"metric": "Infrastructure Fatigue", "value": int(max(0, min(100, f_idx + (p_idx * 0.1)))), "trend": "escalating"},
                    {"metric": "Mission Degradation Risk", "value": int(max(0, min(100, p_idx * 0.8))), "trend": "escalating" if p_idx > 40 else "stable"}
                ],
                "t24h": [
                    {"metric": "Civilization Load", "value": int(max(0, min(100, 40 + random.uniform(-10, 20) + f_idx))), "trend": "stable"},
                    {"metric": "Systemic Resilience", "value": int(max(0, min(100, 100 - f_idx * 1.5))), "trend": "degrading" if f_idx > 20 else "stable"}
                ]
            }

    def _autonomous_interventions(self):
        for sector in self.sectors:
            if sector["threat_level"] == "CRITICAL" and sector["congestion"] > 90:
                probability = 0.05
                if self.metrics["governance_mode"] == "AGGRESSIVE_INTERVENTIONIST":
                    probability = 0.25 # High chance of intervention
                elif self.metrics["governance_mode"] == "RESILIENCE_PRIORITY":
                    probability = 0.15 # Proactively redistributes
                elif self.metrics["governance_mode"] == "EFFICIENCY_OPTIMIZER":
                    probability = 0.02 # Reluctant to intervene
                    
                if random.random() < probability: 
                    # More subtle intervention: rather than instantly solving, it ticks down
                    sector["congestion"] -= 15
                    sector["ai_control"] += 10
                    self.metrics["global_pressure"] -= 5
                    
                    if self.metrics["governance_mode"] == "AGGRESSIVE_INTERVENTIONIST":
                        self.metrics["infrastructure_fatigue"] += 1.0 # High cost
                        
                    msg = f"GOVERNANCE DOCTRINE EXECUTED: Strategic rerouting applied to {sector['name']} to preserve systemic continuity."
                    if random.random() < 0.1: # Don't spam the log every tick
                        self.add_agent_log("Core", msg)
                        self._add_memory("Governance Intervention", msg, "alert", "policy")
                        self.strategic_recommendations.append(
                            {"id": f"rec-{uuid.uuid4()}", "title": f"Override: {sector['name']}", "impact": "High", "confidence": 99, "type": "proactive"}
                        )

    def _update_metrics(self):
        base_readiness = 100.0 - (self.metrics["global_pressure"] * 0.3) - (self.metrics["infrastructure_fatigue"] * 0.5)
        
        if self.active_emergencies:
            self.metrics["coordination_quality"] = max(40.0, self.metrics["coordination_quality"] - random.uniform(1, 3))
            self.metrics["efficiency_index"] = max(30.0, self.metrics["efficiency_index"] - random.uniform(2, 4))
            self.metrics["readiness_index"] = max(20.0, base_readiness - random.uniform(10, 20))
            self.metrics["threat_level"] = "CRITICAL"
        else:
            self.metrics["network_stability"] = min(100.0, self.metrics["network_stability"] + random.uniform(0.5, 2.0))
            self.metrics["coordination_quality"] = min(100.0, self.metrics["coordination_quality"] + random.uniform(0.5, 1.5))
            self.metrics["efficiency_index"] = max(85.0, min(99.9, self.metrics["efficiency_index"] + random.uniform(-0.5, 0.5)))
            self.metrics["readiness_index"] = max(0.0, min(100.0, base_readiness))
            
            critical_sectors = sum(1 for s in self.sectors if s["threat_level"] == "CRITICAL")
            if critical_sectors >= 2:
                self.metrics["threat_level"] = "WARNING"
            elif critical_sectors == 0:
                self.metrics["threat_level"] = "NOMINAL"
            
        self.metrics["active_nodes"] = 1400 + random.randint(-20, 20)
        self.strategic_recommendations = self.strategic_recommendations[-5:]

    def add_agent_log(self, agent: str, message: str):
        self.agent_logs.append({
            "id": str(uuid.uuid4()),
            "agent": agent,
            "message": message,
            "timestamp": time.time()
        })
        if len(self.agent_logs) > 100:
            self.agent_logs.pop(0)

    def add_threat_event(self, type: str, description: str, severity: str):
        self.threat_events.append({
            "id": str(uuid.uuid4()),
            "type": type,
            "description": description,
            "severity": severity,
            "timestamp": time.time()
        })
        self.metrics["anomalies_detected"] += 1
        if len(self.threat_events) > 30:
            self.threat_events.pop(0)

    def _add_memory(self, category: str, details: str, type: str, memory_class: str = "event"):
        self.operational_memory.append({
            "id": str(uuid.uuid4()),
            "category": category,
            "details": details,
            "type": type,
            "memory_class": memory_class,
            "timestamp": time.time()
        })
        if len(self.operational_memory) > 50:
            self.operational_memory.pop(0)

    def _generate_strategic_recommendations(self):
        self.strategic_recommendations = [
            {"id": "rec1", "title": "Optimize Corridor X Routing", "impact": "Medium", "confidence": 92, "type": "strategic"}
        ]

    def trigger_copilot_command(self, command: str) -> str:
        cmd = command.lower()
        
        if "master_demo" in cmd:
            asyncio.create_task(self._execute_master_demo_sequence())
            return "MASTER DEMO SEQUENCE INITIATED. Cinematic orchestration active."
            
        elif "collapse" in cmd:
            self.active_emergencies = True
            self.metrics["mobility_demand"] = 100.0
            self.metrics["infrastructure_fatigue"] = 90.0
            self.metrics["global_pressure"] = 100.0
            self.metrics["ecosystem_resilience"] = 10.0
            self._add_memory("System Collapse", "Civilization-scale collapse simulated.", "alert", "policy")
            for sector in self.sectors:
                sector["threat_level"] = "CRITICAL"
                sector["color"] = "red"
                sector["congestion"] = 100.0
                sector["health"] = 10.0
            for f in self.fleets:
                if f["type"] != "defense":
                    f["status"] = "halted"
            return "Civilization Collapse. Extreme infrastructure fatigue injected."

        elif "recovery" in cmd:
            self.active_emergencies = False
            self.metrics["governance_mode"] = "RESILIENCE_PRIORITY"
            self.metrics["civilization_cycle"] = "NIGHTTIME_RECOVERY"
            self.metrics["mobility_demand"] = 20.0
            self._add_memory("Recovery Protocol", "Autonomous Recovery Protocol initiated.", "success", "policy")
            for sector in self.sectors:
                sector["congestion"] = 40.0
                sector["health"] = 60.0
                sector["is_healing"] = True
                sector["color"] = "blue"
            for f in self.fleets:
                f["status"] = "active"
                f["speed"] = f["base_speed"] * 0.5
            return "Autonomous Recovery Protocol. Global self-healing initiated."

        elif "climate" in cmd or ("weather" in cmd and "severe" in cmd):
            self.storm_active = True
            self.metrics["network_stability"] = 40.0
            self._add_memory("Climate Cascade", "Atmospheric destabilization detected.", "warning", "event")
            for sector in self.sectors:
                sector["congestion"] += 40
                sector["health"] -= 30
                sector["color"] = "orange"
                sector["threat_level"] = "WARNING"
            return "Severe Climate Event. Modeling network attenuation."

        elif "override" in cmd:
            self.metrics["governance_mode"] = "AGGRESSIVE_INTERVENTIONIST"
            self.metrics["global_pressure"] = 90.0
            self._add_memory("Governance Override", "Aggressive Interventionist override executed.", "alert", "governance")
            return "Governance Override. Commencing severe rerouting tradeoffs."

        elif "infrastructure" in cmd and "failure" in cmd:
            self.metrics["infrastructure_fatigue"] = 100.0
            self.metrics["ecosystem_resilience"] = 0.0
            self._add_memory("Infrastructure Failure", "Systemic infrastructure degradation injected.", "alert", "event")
            for sector in self.sectors:
                sector["health"] = 20.0
            return "Infrastructure Cascade Failure. Resilience depleted."

        elif "resume" in cmd or "nominal" in cmd or "clear" in cmd:
            self.active_emergencies = False
            self.storm_active = False
            self.metrics["global_pressure"] = max(0, self.metrics["global_pressure"] - 20)
            self._add_memory("System Restored", "Resuming nominal operations.", "success", "policy")
            for sector in self.sectors:
                sector["congestion"] = 30
                sector["health"] = 100
                sector["ai_control"] = 99
            for f in self.fleets:
                f["status"] = "active"
                f["speed"] = f["base_speed"]
            return "Protocols cleared. Resuming nominal civilization operations."
            
        else:
            return "Strategic directive received. Modeling civilization impact paths."
            
    async def _execute_master_demo_sequence(self):
        # Phase 1: Stable
        self.trigger_copilot_command("resume")
        self.add_agent_log("Core", "Civilization operational parameters stable.")
        await asyncio.sleep(10)
        
        # Phase 2: Climate Escalation
        self.trigger_copilot_command("climate")
        self.add_agent_log("Weather", "Atmospheric destabilization detected. Cascade imminent.")
        await asyncio.sleep(12)
        
        # Phase 3: Infrastructure Stress Propagation
        self.trigger_copilot_command("infrastructure failure")
        self.add_agent_log("Risk", "Systemic infrastructure stress propagation detected.")
        await asyncio.sleep(15)
        
        # Phase 4: AI Governance Conflict (Implicit as pressure builds)
        self.metrics["global_pressure"] = 85.0
        self.add_agent_log("Core", "Governance doctrine escalation authorized. Re-evaluating thresholds.")
        await asyncio.sleep(10)
        
        # Phase 5: Collapse
        self.trigger_copilot_command("collapse")
        self.add_agent_log("Core", "Systemic instability threshold exceeded. Sector lockdown.")
        await asyncio.sleep(15)
        
        # Phase 6: Governance Override
        self.trigger_copilot_command("override")
        self.add_agent_log("Optimization", "Executing heavy-handed stabilization. Resilience sacrificed for continuity.")
        await asyncio.sleep(15)
        
        # Phase 7: Recovery
        self.trigger_copilot_command("recovery")
        self.add_agent_log("Core", "Autonomous resilience protocols activated. Continuity probability recovering.")

sim_engine = SimulationEngine()
