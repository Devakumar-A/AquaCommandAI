from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.crop import router as crop_router
from routes.yield_prediction import router as yield_router
from routes.water_demand import router as water_router
from routes.reservoir import router as reservoir_router
from routes.advisory import router as advisory_router

app = FastAPI(
    title="AquaCommandAI API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(
    crop_router,
    prefix="/api",
    tags=["Crop Recommendation"]
)

app.include_router(
    yield_router,
    prefix="/api",
    tags=["Yield Prediction"]
)

app.include_router(
    water_router,
    prefix="/api",
    tags=["Water Demand"]
)

app.include_router(
    reservoir_router,
    prefix="/api",
    tags=["Reservoir"]
)

app.include_router(
    advisory_router,
    prefix="/api",
    tags=["Advisory"]
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "AquaCommandAI Backend Running"
    }

# Health Check Route
@app.get("/health")
def health():
    return {
        "status": "ok"
    }