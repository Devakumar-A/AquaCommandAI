from services.model_loader import (
    yield_model,
    yield_area_encoder,
    yield_item_encoder
)

import numpy as np


def predict_yield(
    area,
    item,
    year,
    rainfall,
    pesticides,
    avg_temp
):
    # Common aliases
    item_mapping = {
        "rice": "Rice, paddy",
        "paddy": "Rice, paddy",
        "rice paddy": "Rice, paddy",
        "wheat": "Wheat",
        "maize": "Maize"
    }

    item_clean = item.strip().lower()

    if item_clean in item_mapping:
        item = item_mapping[item_clean]

    area_encoded = yield_area_encoder.transform([area])[0]
    item_encoded = yield_item_encoder.transform([item])[0]

    data = np.array([
        [
            area_encoded,
            item_encoded,
            int(year),
            float(rainfall),
            float(pesticides),
            float(avg_temp)
        ]
    ])

    prediction = yield_model.predict(data)[0]

    return {
        "predicted_yield": float(prediction)
    }