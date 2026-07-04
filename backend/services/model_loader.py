from pathlib import Path
import joblib

# ==========================================
# AI ENGINE PATH
# ==========================================

AI_ENGINE = Path(
    r"C:\Users\asus\Desktop\AquaCommandAI\AquaCommandAI\ai-engine"
)

print("AI Engine Path:", AI_ENGINE)
print("Exists:", AI_ENGINE.exists())

# ==========================================
# CROP MODEL
# ==========================================

crop_model = joblib.load(
    AI_ENGINE / "crop_model.pkl"
)

crop_encoder = joblib.load(
    AI_ENGINE / "label_encoder.pkl"
)

# ==========================================
# YIELD MODEL
# ==========================================

yield_model = joblib.load(
    AI_ENGINE / "yield_model.pkl"
)

yield_area_encoder = joblib.load(
    AI_ENGINE / "yield_area_encoder.pkl"
)

yield_item_encoder = joblib.load(
    AI_ENGINE / "yield_item_encoder.pkl"
)

# ==========================================
# WATER DEMAND MODEL
# ==========================================

water_demand_model = joblib.load(
    AI_ENGINE / "water_demand_model.pkl"
)

water_demand_encoders = joblib.load(
    AI_ENGINE / "water_demand_encoders.pkl"
)

water_demand_target_encoder = joblib.load(
    AI_ENGINE / "water_demand_target_encoder.pkl"
)

# ==========================================
# SUCCESS MESSAGE
# ==========================================

print("\n✅ All AquaCommandAI models loaded successfully")
print("✅ Crop Recommendation Model")
print("✅ Yield Prediction Model")
print("✅ Water Demand Prediction Model")