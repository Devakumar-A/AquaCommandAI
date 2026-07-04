import pandas as pd
from sqlalchemy import create_engine, text
from urllib.parse import quote_plus

# =====================================================
# DATABASE CONNECTION
# =====================================================

DB_USER = "postgres"
DB_PASSWORD = "Devakumar@123"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "aquacommand_ai"

password = quote_plus(DB_PASSWORD)

engine = create_engine(
    f"postgresql://{DB_USER}:{password}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# =====================================================
# TEST CONNECTION
# =====================================================

try:
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("DATABASE CONNECTED SUCCESSFULLY")
except Exception as e:
    print("DATABASE CONNECTION FAILED")
    print(e)
    exit()

# =====================================================
# FILE PATHS
# =====================================================

BASE = r"C:\Users\asus\Desktop\AquaCommandAI\AquaCommandAI\ai-engine\datasets\raw"

reservoir_file = BASE + r"\reservoir\reservoir_master.xlsx"
command_file = BASE + r"\command_areas\command_areas.csv"
village_file = BASE + r"\villages\villages.csv"
farmer_file = BASE + r"\farmers\farmers_master.xlsx"

# =====================================================
# CLEAR OLD DATA (OPTIONAL)
# =====================================================

with engine.begin() as conn:
    conn.execute(text("DELETE FROM farmers"))
    conn.execute(text("DELETE FROM villages"))
    conn.execute(text("DELETE FROM command_areas"))
    conn.execute(text("DELETE FROM reservoirs"))

print("Old data cleared")

# =====================================================
# RESERVOIRS
# =====================================================

reservoirs = pd.read_excel(reservoir_file)

reservoirs = reservoirs[
    [
        "reservoir_id",
        "reservoir_name",
        "state",
        "district",
        "river",
        "total_capacity_mcm",
        "live_storage_mcm",
        "dead_storage_mcm",
        "current_storage_mcm",
        "water_level_percent",
        "command_area_hectares",
        "status",
    ]
]

reservoirs.to_sql(
    "reservoirs",
    engine,
    if_exists="append",
    index=False
)

print(f"Reservoirs Imported: {len(reservoirs)}")

# =====================================================
# COMMAND AREAS
# =====================================================

command_areas = pd.read_csv(command_file)

command_areas.to_sql(
    "command_areas",
    engine,
    if_exists="append",
    index=False
)

print(f"Command Areas Imported: {len(command_areas)}")

# =====================================================
# VILLAGES
# =====================================================

villages = pd.read_csv(village_file)

villages["cultivated_area_hectares"] = 0

villages = villages[
    [
        "village_id",
        "command_area_id",
        "village_name",
        "district",
        "state",
        "population",
        "cultivated_area_hectares",
    ]
]

villages.to_sql(
    "villages",
    engine,
    if_exists="append",
    index=False
)

print(f"Villages Imported: {len(villages)}")

# =====================================================
# FARMERS
# =====================================================

farmers = pd.read_excel(farmer_file)

farmers["age"] = None
farmers["gender"] = None

farmers = farmers.rename(
    columns={
        "village": "village_name",
        "phone": "mobile_number",
        "land_area_acres": "land_area_hectares",
    }
)

# Get villages from DB
village_map = pd.read_sql(
    "SELECT village_id, village_name FROM villages",
    engine
)

# Merge village names
farmers = farmers.merge(
    village_map,
    on="village_name",
    how="left"
)

print("Farmers before filtering:", len(farmers))

# Remove unmatched villages
farmers = farmers.dropna(subset=["village_id"])

print("Farmers after filtering:", len(farmers))

farmers = farmers[
    [
        "farmer_id",
        "village_id",
        "farmer_name",
        "age",
        "gender",
        "mobile_number",
        "land_area_hectares",
        "primary_crop",
    ]
]

if len(farmers) > 0:
    farmers.to_sql(
        "farmers",
        engine,
        if_exists="append",
        index=False
    )

print(f"Farmers Imported: {len(farmers)}")

# =====================================================
# FINAL COUNTS
# =====================================================

print("\n========== IMPORT COMPLETED ==========")

for table in [
    "reservoirs",
    "command_areas",
    "villages",
    "farmers"
]:
    count = pd.read_sql(
        f"SELECT COUNT(*) AS total FROM {table}",
        engine
    )
    print(f"{table}: {count.iloc[0]['total']}")