from services.model_loader import (
    water_demand_model,
    water_demand_encoders,
    water_demand_target_encoder
)

import pandas as pd


def predict_water_demand(input_data):

    df = pd.DataFrame([input_data])

    for col, encoder in water_demand_encoders.items():
        if col in df.columns:
            df[col] = encoder.transform(df[col])

    prediction = water_demand_model.predict(df)

    irrigation_need = water_demand_target_encoder.inverse_transform(
        prediction
    )[0]

    return {
        "irrigation_need": irrigation_need
    }