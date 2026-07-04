import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# =====================================================
# DATASET PATH
# =====================================================

DATASET_PATH = r"C:\Users\asus\Desktop\AquaCommandAI\AquaCommandAI\ai-engine\datasets\raw\crop_recommendation\crop_recommendation.csv"

# =====================================================
# LOAD DATA
# =====================================================

df = pd.read_csv(DATASET_PATH)

print("Dataset Shape:", df.shape)
print(df.head())

# =====================================================
# FEATURES & TARGET
# =====================================================

X = df[
    [
        "N",
        "P",
        "K",
        "temperature",
        "humidity",
        "ph",
        "rainfall"
    ]
]

y = df["label"]

# =====================================================
# LABEL ENCODING
# =====================================================

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

# =====================================================
# TRAIN TEST SPLIT
# =====================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

# =====================================================
# MODEL
# =====================================================

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

# =====================================================
# TRAIN
# =====================================================

print("\nTraining Model...\n")

model.fit(X_train, y_train)

# =====================================================
# EVALUATION
# =====================================================

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\nAccuracy:", accuracy)

print("\nClassification Report:\n")
print(
    classification_report(
        y_test,
        y_pred
    )
)

# =====================================================
# SAVE MODEL
# =====================================================

joblib.dump(model, "crop_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("\nModel Saved Successfully")
print("crop_model.pkl")
print("label_encoder.pkl")