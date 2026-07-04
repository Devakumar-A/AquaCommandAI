import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score, mean_absolute_error

# =====================================================
# DATASET PATH
# =====================================================

DATASET_PATH = r"C:\Users\asus\Desktop\AquaCommandAI\AquaCommandAI\ai-engine\datasets\raw\crop_yield\yield_df.csv"

# =====================================================
# LOAD DATA
# =====================================================

df = pd.read_csv(DATASET_PATH)

print("Dataset Shape:", df.shape)
print(df.head())

# =====================================================
# REMOVE FIRST COLUMN IF EXISTS
# =====================================================

if "Unnamed: 0" in df.columns:
    df = df.drop(columns=["Unnamed: 0"])

# =====================================================
# ENCODE CATEGORICAL COLUMNS
# =====================================================

area_encoder = LabelEncoder()
item_encoder = LabelEncoder()

df["Area"] = area_encoder.fit_transform(df["Area"])
df["Item"] = item_encoder.fit_transform(df["Item"])

# =====================================================
# FEATURES
# =====================================================

X = df[
    [
        "Area",
        "Item",
        "Year",
        "average_rain_fall_mm_per_year",
        "pesticides_tonnes",
        "avg_temp"
    ]
]

# =====================================================
# TARGET
# =====================================================

y = df["hg/ha_yield"]

# =====================================================
# TRAIN TEST SPLIT
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# =====================================================
# MODEL
# =====================================================

model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

# =====================================================
# TRAIN
# =====================================================

print("\nTraining Yield Model...\n")

model.fit(X_train, y_train)

# =====================================================
# EVALUATION
# =====================================================

predictions = model.predict(X_test)

r2 = r2_score(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)

print("R2 Score:", r2)
print("MAE:", mae)

# =====================================================
# SAVE
# =====================================================

joblib.dump(model, "yield_model.pkl")
joblib.dump(area_encoder, "yield_area_encoder.pkl")
joblib.dump(item_encoder, "yield_item_encoder.pkl")

print("\nSaved Successfully")
print("yield_model.pkl")
print("yield_area_encoder.pkl")
print("yield_item_encoder.pkl")