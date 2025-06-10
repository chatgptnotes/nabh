-- Medical Database Schema

-- Diagnosis Table
CREATE TABLE IF NOT EXISTS diagnoses (
    diagnosis_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complication Table
CREATE TABLE IF NOT EXISTS complications (
    complication_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    diagnosis_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(diagnosis_id) ON DELETE CASCADE
);

-- Lab Investigation Table
CREATE TABLE IF NOT EXISTS lab_investigations (
    lab_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    complication_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complication_id) REFERENCES complications(complication_id) ON DELETE CASCADE
);

-- Radiology Investigation Table
CREATE TABLE IF NOT EXISTS radiology_investigations (
    radiology_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    complication_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complication_id) REFERENCES complications(complication_id) ON DELETE CASCADE
);

-- Medication Table
CREATE TABLE IF NOT EXISTS medications (
    medication_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    complication_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complication_id) REFERENCES complications(complication_id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_complications_diagnosis ON complications(diagnosis_id);
CREATE INDEX idx_lab_investigations_complication ON lab_investigations(complication_id);
CREATE INDEX idx_radiology_investigations_complication ON radiology_investigations(complication_id);
CREATE INDEX idx_medications_complication ON medications(complication_id); 