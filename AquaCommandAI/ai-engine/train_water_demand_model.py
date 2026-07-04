import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# ==========================================
# LOAD DATASET
# ==========================================

DATASET_PATH = r"C:\Users\asus\Desktop\AquaCommandAI\AquaCommandAI\ai-engine\datasets\raw\water_demand\irrigation_prediction.csv"

df = pd.read_csv(DATASET_PATH)

print("Dataset Shape:", df.shape)

# ==========================================
# ENCODE CATEGORICAL COLUMNS
# ==========================================

encoders = {}

categorical_columns = [
    "Soil_Type",
    "Crop_Type",
    "Crop_Growth_Stage",
    "Season",
    "Irrigation_Type",
    "Water_Source",
    "Mulching_Used",
    "Region"
]

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# ==========================================
# TARGET ENCODING
# ==========================================

target_encoder = LabelEncoder()

df["Irrigation_Need"] = target_encoder.fit_transform(
    df["Irrigation_Need"]
)

# ==========================================
# FEATURES
# ==========================================

X = df.drop(columns=["Irrigation_Need"])

# ==========================================
# TARGET
# ==========================================

y = df["Irrigation_Need"]

# ==========================================
# SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================================
# MODEL
# ==========================================

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

# ==========================================
# TRAIN
# ==========================================

print("\nTraining Water Demand Model...\n")

model.fit(X_train, y_train)

# ==========================================
# EVALUATE
# ==========================================

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("Accuracy:", accuracy)

# ==========================================
# SAVE
# ==========================================

joblib.dump(model, "water_demand_model.pkl")
joblib.dump(encoders, "water_demand_encoders.pkl")
joblib.dump(target_encoder, "water_demand_target_encoder.pkl")

print("\nSaved Successfully")
print("water_demand_model.pkl")
print("water_demand_encoders.pkl")
print("water_demand_target_encoder.pkl")