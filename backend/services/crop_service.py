from services.model_loader import crop_model, crop_encoder
import numpy as np


def predict_crop(
    N,
    P,
    K,
    temperature,
    humidity,
    ph,
    rainfall
):
    data = np.array([
        [
            float(N),
            float(P),
            float(K),
            float(temperature),
            float(humidity),
            float(ph),
            float(rainfall)
        ]
    ])

    prediction = crop_model.predict(data)

    crop = crop_encoder.inverse_transform(prediction)[0]

    return {
        "recommended_crop": str(crop)
    }