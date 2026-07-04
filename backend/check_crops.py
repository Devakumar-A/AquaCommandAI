from services.model_loader import yield_item_encoder

print("\nAvailable Crops:\n")

for crop in yield_item_encoder.classes_:
    print(crop)