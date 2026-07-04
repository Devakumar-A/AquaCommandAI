import pandas as pd

def predict_reservoir_risk(water_level_percent):

    if water_level_percent < 40:
        return "Critical"

    elif water_level_percent < 60:
        return "Alert"

    else:
        return "Normal"


if __name__ == "__main__":

    level = float(input("Enter Water Level %: "))

    risk = predict_reservoir_risk(level)

    print("\nReservoir Risk:", risk)