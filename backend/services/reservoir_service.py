def get_reservoir_risk(water_level_percent):

    if water_level_percent < 40:
        return {
            "risk": "Critical"
        }

    elif water_level_percent < 60:
        return {
            "risk": "Alert"
        }

    return {
        "risk": "Normal"
    }