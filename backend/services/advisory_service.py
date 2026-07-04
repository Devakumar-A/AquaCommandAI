from services.reservoir_service import get_reservoir_risk


def generate_advisory(
    crop,
    yield_value,
    irrigation_need,
    water_level_percent
):

    risk = get_reservoir_risk(
        water_level_percent
    )["risk"]

    return {
        "recommended_crop": crop,
        "predicted_yield": yield_value,
        "irrigation_need": irrigation_need,
        "reservoir_risk": risk,
        "advisory":
            f"Recommended crop is {crop}. "
            f"Expected yield is {yield_value:.2f}. "
            f"Irrigation requirement is {irrigation_need}. "
            f"Reservoir status is {risk}."
    }