from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
from simulation import sim_engine

app = FastAPI(title="Morynexis NAVIS AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CopilotRequest(BaseModel):
    command: str

@app.on_event("startup")
async def startup_event():
    # Start the simulation loop
    asyncio.create_task(sim_engine.run_loop())

@app.get("/")
def read_root():
    return {"status": "online", "system": "NAVIS PRIME GRID"}

@app.websocket("/ws/simulation")
async def websocket_simulation(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Broadcast the full simulation state every 1 second
            state = sim_engine.get_state()
            await websocket.send_text(json.dumps(state))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print("Client disconnected from WebSocket")
    except Exception as e:
        print(f"Connection error: {e}")

@app.post("/api/copilot")
async def copilot_command(req: CopilotRequest):
    # Pass the command to the Mock LLM Orchestrator inside the simulation engine
    response = sim_engine.trigger_copilot_command(req.command)
    return {
        "status": "success",
        "command": req.command,
        "response": response
    }

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
