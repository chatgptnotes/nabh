# Medical Database Schema

This database schema is designed to manage relationships between diagnoses, complications, and their associated investigations and medications.

## Table Structure

### Diagnoses
- Primary table storing medical diagnoses
- Each diagnosis can have multiple complications

### Complications
- Stores complications associated with diagnoses
- Each complication is linked to a specific diagnosis
- Each complication has associated lab investigations, radiology investigations, and medications

### Lab Investigations
- Stores lab investigation types
- Each lab investigation is linked to a specific complication
- Each complication typically has 2 lab investigations

### Radiology Investigations
- Stores radiology investigation types
- Each radiology investigation is linked to a specific complication
- Each complication typically has 2 radiology investigations

### Medications
- Stores medications
- Each medication is linked to a specific complication
- Each complication typically has 4 medications

## Example Queries

### Get all complications for a diagnosis
```sql
SELECT c.*
FROM complications c
WHERE c.diagnosis_id = [diagnosis_id];
```

### Get lab and radiology investigations for a complication
```sql
-- Get lab investigations
SELECT l.*
FROM lab_investigations l
WHERE l.complication_id = [complication_id];

-- Get radiology investigations
SELECT r.*
FROM radiology_investigations r
WHERE r.complication_id = [complication_id];
```

### Get medications for a complication
```sql
SELECT m.*
FROM medications m
WHERE m.complication_id = [complication_id];
```

### Get complete information for a diagnosis
```sql
SELECT 
    d.name as diagnosis_name,
    c.name as complication_name,
    l.name as lab_investigation,
    r.name as radiology_investigation,
    m.name as medication
FROM diagnoses d
JOIN complications c ON c.diagnosis_id = d.diagnosis_id
LEFT JOIN lab_investigations l ON l.complication_id = c.complication_id
LEFT JOIN radiology_investigations r ON r.complication_id = c.complication_id
LEFT JOIN medications m ON m.complication_id = c.complication_id
WHERE d.diagnosis_id = [diagnosis_id];
```

## Setup Instructions

1. Create the database schema:
```bash
psql -d your_database_name -f schemas/medical_schema.sql
```

2. Load sample data:
```bash
psql -d your_database_name -f seeds/sample_data.sql
```

## Notes
- All tables include `created_at` and `updated_at` timestamps for audit purposes
- Foreign key constraints ensure referential integrity
- Indexes are created on foreign key columns for better query performance
- The schema uses CASCADE deletion to automatically remove related records when a parent record is deleted 