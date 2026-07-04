from fastapi import APIRouter
from services.water_service import predict_water_demand

router = APIRouter()


@router.post("/predict-water-demand")
def water_prediction(data: dict):

    return predict_water_demand(data)