-- Sample data for NABH Platform

-- Insert sample departments
INSERT INTO departments (name, code, description) VALUES
('Emergency Department', 'ED', 'Emergency and trauma care'),
('Intensive Care Unit', 'ICU', 'Critical care unit'),
('Operating Theater', 'OT', 'Surgical procedures'),
('Pharmacy', 'PHARM', 'Medication management'),
('Laboratory', 'LAB', 'Diagnostic testing'),
('Radiology', 'RAD', 'Medical imaging'),
('Nursing Administration', 'NURSING', 'Nursing supervision and coordination'),
('Quality Assurance', 'QA', 'Quality management and compliance');

-- Insert sample users (password is 'password' hashed with bcrypt)
INSERT INTO users (email, name, role, department_id, password) VALUES
('admin@hospital.com', 'System Administrator', 'admin', 8, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('qa.manager@hospital.com', 'Quality Manager', 'quality_manager', 8, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('ed.head@hospital.com', 'Dr. Emergency Head', 'department_head', 1, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('icu.head@hospital.com', 'Dr. ICU Head', 'department_head', 2, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('nurse.ed1@hospital.com', 'Nurse Mary ED', 'nurse', 1, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('nurse.icu1@hospital.com', 'Nurse John ICU', 'nurse', 2, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('pharmacy.head@hospital.com', 'Pharmacist Chief', 'department_head', 4, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe'),
('lab.tech1@hospital.com', 'Lab Technician', 'staff', 5, '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe');

-- Update department heads
UPDATE departments SET head_user_id = 3 WHERE id = 1; -- ED
UPDATE departments SET head_user_id = 4 WHERE id = 2; -- ICU
UPDATE departments SET head_user_id = 7 WHERE id = 4; -- Pharmacy

-- Sample checklist templates
INSERT INTO checklist_templates (title, description, frequency, department_id, created_by) VALUES
('Daily Hand Hygiene Compliance', 'Daily check for hand hygiene compliance in department', 'daily', 1, 2),
('Weekly Equipment Maintenance', 'Weekly maintenance check for critical equipment', 'weekly', 2, 2),
('Monthly Medication Inventory', 'Monthly inventory and expiry check for medications', 'monthly', 4, 2),
('Daily Infection Control Measures', 'Daily infection prevention checklist', 'daily', 2, 2);

-- Sample checklist items
INSERT INTO checklist_items (template_id, item_text, item_order, item_type) VALUES
-- Daily Hand Hygiene Compliance (template_id: 1)
(1, 'Hand sanitizer dispensers are functional and filled', 1, 'checkbox'),
(1, 'Staff observed following 5 moments of hand hygiene', 2, 'checkbox'),
(1, 'Compliance rate percentage', 3, 'number'),
(1, 'Upload photo evidence of proper signage', 4, 'file_upload'),

-- Weekly Equipment Maintenance (template_id: 2)
(2, 'Ventilators checked and functioning', 1, 'checkbox'),
(2, 'Monitoring devices calibrated', 2, 'checkbox'),
(2, 'Emergency equipment tested', 3, 'checkbox'),
(2, 'Maintenance log updated', 4, 'checkbox'),

-- Monthly Medication Inventory (template_id: 3)
(3, 'Expired medications identified and segregated', 1, 'checkbox'),
(3, 'Cold chain medications temperature logged', 2, 'checkbox'),
(3, 'Stock levels verified against system', 3, 'checkbox'),
(3, 'Number of expired items found', 4, 'number'),

-- Daily Infection Control (template_id: 4)
(4, 'Isolation protocols followed for infectious patients', 1, 'checkbox'),
(4, 'PPE availability checked', 2, 'checkbox'),
(4, 'Waste segregation properly maintained', 3, 'checkbox'),
(4, 'Environmental cleaning completed', 4, 'checkbox');

-- Sample documents
INSERT INTO documents (title, document_type, file_url, department_id, uploaded_by, expiry_date) VALUES
('Hand Hygiene SOP', 'Standard Operating Procedure', '/documents/hand-hygiene-sop.pdf', 1, 2, '2024-12-31'),
('Emergency Response Protocol', 'Protocol', '/documents/emergency-response.pdf', 1, 3, '2025-06-30'),
('ICU Equipment Manual', 'Manual', '/documents/icu-equipment-manual.pdf', 2, 4, '2025-03-15'),
('Pharmacy License', 'License', '/documents/pharmacy-license.pdf', 4, 7, '2024-08-31'),
('NABH Accreditation Certificate', 'Certificate', '/documents/nabh-certificate.pdf', 8, 1, '2025-12-31');

-- Sample alerts
INSERT INTO alerts (alert_type, title, message, target_department_id, priority, due_date) VALUES
('document_expiry', 'Pharmacy License Expiring Soon', 'Pharmacy license expires in 30 days. Please renew immediately.', 4, 'high', '2024-08-31'),
('checklist_overdue', 'Daily Hand Hygiene Check Overdue', 'Daily hand hygiene compliance check is overdue for Emergency Department.', 1, 'medium', CURRENT_TIMESTAMP),
('equipment_maintenance', 'Weekly Equipment Check Due', 'Weekly equipment maintenance check is due for ICU.', 2, 'medium', CURRENT_TIMESTAMP + INTERVAL '2 days');

-- Sample incidents
INSERT INTO incidents (incident_type, title, description, department_id, reported_by, severity, status) VALUES
('infection_control', 'Hand Hygiene Non-Compliance', 'Staff member observed not following proper hand hygiene protocol during patient care.', 1, 5, 'medium', 'investigating'),
('equipment_failure', 'Ventilator Malfunction', 'Ventilator #3 in ICU showing error codes and requiring immediate attention.', 2, 6, 'high', 'open'),
('medication_error', 'Expired Medication Found', 'Expired antibiotics found in emergency medication kit during routine check.', 4, 7, 'medium', 'resolved');

-- Sample Data for Medical Database

-- Insert sample diagnoses
INSERT INTO diagnoses (name) VALUES
    ('Diagnosis 1966'),
    ('Acute Appendicitis'),
    ('Chronic Sinusitis');

-- Insert sample complications
INSERT INTO complications (name, diagnosis_id) VALUES
    ('Abscess', 1),
    ('Infection', 1),
    ('Delayed Healing', 1),
    ('Nerve Injury', 1),
    ('Peritonitis', 2),
    ('Post-operative Pain', 2),
    ('Chronic Headache', 3),
    ('Nasal Polyps', 3);

-- Insert sample lab investigations
INSERT INTO lab_investigations (name, complication_id) VALUES
    ('Blood Culture', 1),
    ('Wound Swab', 1),
    ('Complete Blood Count', 2),
    ('C-Reactive Protein', 2),
    ('Wound Culture', 3),
    ('Serum Electrolytes', 3),
    ('Nerve Conduction Study', 4),
    ('EMG', 4);

-- Insert sample radiology investigations
INSERT INTO radiology_investigations (name, complication_id) VALUES
    ('CT Scan', 1),
    ('MRI', 1),
    ('Chest X-Ray', 2),
    ('Ultrasound', 2),
    ('MRI Spine', 3),
    ('X-Ray', 3),
    ('CT Nerve', 4),
    ('MRI Brain', 4);

-- Insert sample medications
INSERT INTO medications (name, complication_id) VALUES
    ('Amoxicillin', 1),
    ('Ibuprofen', 1),
    ('Metronidazole', 1),
    ('Wound Ointment', 1),
    ('Ceftriaxone', 2),
    ('Paracetamol', 2),
    ('Gentamicin', 2),
    ('Dressing', 2),
    ('Growth Factor', 3),
    ('Pain Relief Gel', 3),
    ('Vitamin Complex', 3),
    ('Antiseptic Solution', 3),
    ('Gabapentin', 4),
    ('Pregabalin', 4),
    ('B12 Supplement', 4),
    ('Topical Analgesic', 4);