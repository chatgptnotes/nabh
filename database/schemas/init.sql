-- NABH Audit Readiness Platform Database Schema

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'quality_manager', 'department_head', 'staff', 'nurse')),
    department_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    head_user_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Checklist templates
CREATE TABLE checklist_templates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    frequency VARCHAR(50) NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'annually')),
    department_id INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Checklist items within templates
CREATE TABLE checklist_items (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL,
    item_text TEXT NOT NULL,
    item_order INTEGER NOT NULL,
    is_required BOOLEAN DEFAULT true,
    item_type VARCHAR(50) DEFAULT 'checkbox' CHECK (item_type IN ('checkbox', 'text', 'number', 'file_upload', 'signature')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES checklist_templates(id) ON DELETE CASCADE
);

-- Checklist entries (completed checklists)
CREATE TABLE checklist_entries (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
    completion_date TIMESTAMP,
    due_date TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES checklist_templates(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Checklist item responses
CREATE TABLE checklist_responses (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    response_value TEXT,
    file_url VARCHAR(500),
    completed_by INTEGER,
    completed_at TIMESTAMP,
    FOREIGN KEY (entry_id) REFERENCES checklist_entries(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES checklist_items(id),
    FOREIGN KEY (completed_by) REFERENCES users(id)
);

-- Documents management
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    department_id INTEGER,
    uploaded_by INTEGER,
    expiry_date DATE,
    version VARCHAR(50) DEFAULT '1.0',
    is_current_version BOOLEAN DEFAULT true,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Alerts and notifications
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target_user_id INTEGER,
    target_department_id INTEGER,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    is_read BOOLEAN DEFAULT false,
    action_required BOOLEAN DEFAULT false,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_user_id) REFERENCES users(id),
    FOREIGN KEY (target_department_id) REFERENCES departments(id)
);

-- Incidents and non-conformities
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    incident_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    department_id INTEGER NOT NULL,
    reported_by INTEGER NOT NULL,
    assigned_to INTEGER,
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
    evidence_files TEXT[],
    resolution_notes TEXT,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Add foreign key constraints
ALTER TABLE users ADD FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE departments ADD FOREIGN KEY (head_user_id) REFERENCES users(id);

-- Create indexes for better performance
CREATE INDEX idx_checklist_entries_status ON checklist_entries(status);
CREATE INDEX idx_checklist_entries_due_date ON checklist_entries(due_date);
CREATE INDEX idx_documents_expiry_date ON documents(expiry_date);
CREATE INDEX idx_alerts_target_user ON alerts(target_user_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_users_department ON users(department_id);