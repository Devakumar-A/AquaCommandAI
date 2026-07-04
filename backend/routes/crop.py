from fastapi import APIRouter
from services.crop_service import predict_crop

router = APIRouter()


@router.post("/predict-crop")
def crop_prediction(data: dict):

    return predict_crop(
        data["N"],
        data["P"],
        data["K"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"]
    )