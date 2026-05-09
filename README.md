# Morynexis NAVIS AI 

**Enterprise-Grade Autonomous Infrastructure OS**

Morynexis NAVIS is a strategic cyber-physical operating system designed for the orchestration, simulation, and governance of future civilization-scale infrastructures. Featuring predictive multi-horizon forecasting, deterministic autonomous governance hysteresis, and real-time cinematic telemetry, the platform serves as an investor-ready, defense-tech showcase.

## Core Capabilities
- **Digital Twin Telemetry:** Real-time rendering of autonomous fleets and infrastructure health.
- **Autonomous Governance:** AI dynamically shifts between *Efficiency Optimizer*, *Resilience Priority*, and *Aggressive Interventionist* modes using hysteresis logic to balance congestion against infrastructure fatigue.
- **Executive Master Demo:** A deterministic, one-click 7-phase cinematic orchestration (Stable -> Climate Cascade -> Infrastructure Failure -> Governance Conflict -> Collapse -> Override -> Recovery).
- **Presentation Mode:** Fullscreen, noise-reduced storytelling UI.

## Tech Stack
- **Frontend:** Next.js 15, Zustand, TailwindCSS, Framer Motion, Lucide Icons.
- **Backend:** Python, FastAPI, WebSockets, Uvicorn.
- **Communication:** Bi-directional 1Hz WebSocket streaming.

## Local Boot Sequence

### 1. Start the Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
*The simulation orchestrator will begin on `http://127.0.0.1:8000`*

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
*The command center will be available at `http://localhost:3000`*

## Production Deployment

### Backend (Railway)
The backend is configured for seamless deployment on Railway.
1. Connect your GitHub repository to Railway.
2. Deploy from the `backend/` directory.
3. Railway will automatically inject the `$PORT` environment variable, which `main.py` binds to automatically.
4. Note your public Railway domain (e.g., `https://navis-backend.up.railway.app`).

### Frontend (Vercel)
The frontend is optimized for Vercel deployment.
1. Connect your GitHub repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Add the following Environment Variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your Railway domain (e.g., `https://navis-backend.up.railway.app`)
   - `NEXT_PUBLIC_WS_URL`: Your Railway domain with `wss://` (e.g., `wss://navis-backend.up.railway.app/ws/simulation`)
4. Deploy.

---
*Morynexis NAVIS AI - Orchestrating the Next Era.*
