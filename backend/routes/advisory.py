from fastapi import APIRouter
from services.advisory_service import generate_advisory

router = APIRouter()


@router.post("/advisory")
def advisory(data: dict):

    return generate_advisory(
        data["crop"],
        data["yield_value"],
        data["irrigation_need"],
        data["water_level_percent"]
    )