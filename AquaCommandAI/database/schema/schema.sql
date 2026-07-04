-- ==========================================
-- AquaCommandAI Final Database Schema
-- PostgreSQL
-- ==========================================

-- ==========================================
-- RESERVOIRS
-- ==========================================

DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS weather CASCADE;
DROP TABLE IF EXISTS soil CASCADE;
DROP TABLE IF EXISTS farmers CASCADE;
DROP TABLE IF EXISTS villages CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS command_areas CASCADE;
DROP TABLE IF EXISTS reservoirs CASCADE;

CREATE TABLE reservoirs (
    reservoir_id VARCHAR(10) PRIMARY KEY,
    reservoir_name VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    river VARCHAR(100) NOT NULL,
    total_capacity_mcm NUMERIC(10,2) NOT NULL,
    live_storage_mcm NUMERIC(10,2) NOT NULL,
    dead_storage_mcm NUMERIC(10,2) NOT NULL,
    current_storage_mcm NUMERIC(10,2) NOT NULL,
    water_level_percent NUMERIC(5,2) NOT NULL,
    command_area_hectares NUMERIC(12,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- COMMAND AREAS
-- ==========================================

CREATE TABLE command_areas (
    command_area_id VARCHAR(10) PRIMARY KEY,
    reservoir_id VARCHAR(10) NOT NULL,
    command_area_name VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    canal_name VARCHAR(100) NOT NULL,
    irrigated_area_hectares NUMERIC(12,2) NOT NULL,
    number_of_villages INTEGER NOT NULL,
    primary_crop VARCHAR(100),
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_commandarea_reservoir
        FOREIGN KEY (reservoir_id)
        REFERENCES reservoirs(reservoir_id)
        ON DELETE CASCADE
);

-- ==========================================
-- VILLAGES
-- ==========================================

CREATE TABLE villages (
    village_id VARCHAR(10) PRIMARY KEY,
    command_area_id VARCHAR(10) NOT NULL,
    village_name VARCHAR(100) NOT NULL,
    district VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    population INTEGER,
    cultivated_area_hectares NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_village_commandarea
        FOREIGN KEY (command_area_id)
        REFERENCES command_areas(command_area_id)
        ON DELETE CASCADE
);

-- ==========================================
-- FARMERS
-- ==========================================

CREATE TABLE farmers (
    farmer_id VARCHAR(10) PRIMARY KEY,
    village_id VARCHAR(10) NOT NULL,
    farmer_name VARCHAR(100) NOT NULL,
    age INTEGER,
    gender VARCHAR(20),
    mobile_number VARCHAR(15),
    land_area_hectares NUMERIC(10,2),
    primary_crop VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_farmer_village
        FOREIGN KEY (village_id)
        REFERENCES villages(village_id)
        ON DELETE CASCADE
);

-- ==========================================
-- SOIL DATA
-- ==========================================

CREATE TABLE soil (
    soil_id SERIAL PRIMARY KEY,
    village_id VARCHAR(10) NOT NULL,
    nitrogen NUMERIC(10,2),
    phosphorus NUMERIC(10,2),
    potassium NUMERIC(10,2),
    ph NUMERIC(5,2),
    soil_type VARCHAR(100),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_soil_village
        FOREIGN KEY (village_id)
        REFERENCES villages(village_id)
        ON DELETE CASCADE
);

-- ==========================================
-- WEATHER DATA
-- ==========================================

CREATE TABLE weather (
    weather_id SERIAL PRIMARY KEY,
    village_id VARCHAR(10) NOT NULL,
    temperature NUMERIC(5,2),
    humidity NUMERIC(5,2),
    rainfall NUMERIC(8,2),
    wind_speed NUMERIC(5,2),
    weather_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_weather_village
        FOREIGN KEY (village_id)
        REFERENCES villages(village_id)
        ON DELETE CASCADE
);

-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- AI PREDICTIONS
-- ==========================================

CREATE TABLE predictions (
    prediction_id SERIAL PRIMARY KEY,
    farmer_id VARCHAR(10),
    crop_recommended VARCHAR(100),
    predicted_yield NUMERIC(10,2),
    confidence_score NUMERIC(5,2),
    prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prediction_farmer
        FOREIGN KEY (farmer_id)
        REFERENCES farmers(farmer_id)
        ON DELETE SET NULL
);

-- ==========================================
-- ALERTS
-- ==========================================

CREATE TABLE alerts (
    alert_id SERIAL PRIMARY KEY,
    village_id VARCHAR(10),
    alert_type VARCHAR(100),
    alert_message TEXT,
    alert_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alert_village
        FOREIGN KEY (village_id)
        REFERENCES villages(village_id)
        ON DELETE SET NULL
);

-- ==========================================
-- INDEXES
-- ==========================================

CREATE INDEX idx_farmer_village
ON farmers(village_id);

CREATE INDEX idx_weather_village
ON weather(village_id);

CREATE INDEX idx_soil_village
ON soil(village_id);

CREATE INDEX idx_prediction_farmer
ON predictions(farmer_id);