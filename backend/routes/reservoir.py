from fastapi import APIRouter, HTTPException
from services.reservoir_service import get_reservoir_risk

router = APIRouter()


@router.post("/reservoir-risk")
def reservoir_risk(data: dict):
    water_level = data.get("water_level_percent")

    if water_level is None:
        raise HTTPException(
            status_code=400,
            detail="water_level_percent is required"
        )

    return get_reservoir_risk(
        float(water_level)
    )