from fastapi import APIRouter
from services.yield_service import predict_yield

router = APIRouter()


@router.post("/predict-yield")
def yield_prediction(data: dict):

    return predict_yield(
        data["area"],
        data["item"],
        data["year"],
        data["rainfall"],
        data["pesticides"],
        data["avg_temp"]
    )