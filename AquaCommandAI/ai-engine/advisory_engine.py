def generate_advisory(
    crop,
    predicted_yield,
    water_demand,
    reservoir_risk
):

    advice = []

    advice.append(f"Recommended Crop: {crop}")

    # Yield Analysis
    if predicted_yield > 50000:
        advice.append("Expected yield is high.")

    elif predicted_yield > 25000:
        advice.append("Expected yield is moderate.")

    else:
        advice.append("Expected yield is low.")

    # Water Demand
    if water_demand == "High":
        advice.append(
            "High irrigation demand expected."
        )
        advice.append(
            "Use efficient irrigation methods."
        )

    elif water_demand == "Medium":
        advice.append(
            "Moderate irrigation required."
        )

    else:
        advice.append(
            "Low irrigation demand expected."
        )

    # Reservoir Risk
    if reservoir_risk == "Critical":
        advice.append(
            "Reservoir storage is critical."
        )
        advice.append(
            "Conserve water immediately."
        )

    elif reservoir_risk == "Alert":
        advice.append(
            "Reservoir level is under alert."
        )
        advice.append(
            "Monitor water usage carefully."
        )

    else:
        advice.append(
            "Reservoir status is normal."
        )

    return advice


if __name__ == "__main__":

    result = generate_advisory(
        crop="Rice",
        predicted_yield=65000,
        water_demand="High",
        reservoir_risk="Critical"
    )

    for item in result:
        print(item)