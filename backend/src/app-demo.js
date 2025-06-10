const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mock data for demo
const mockUsers = [
  {
    id: 1,
    email: 'admin@hospital.com',
    name: 'System Administrator',
    role: 'admin',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe', // password
    department: { id: 8, name: 'Quality Assurance' }
  },
  {
    id: 2,
    email: 'qa.manager@hospital.com',
    name: 'Quality Manager',
    role: 'quality_manager',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe',
    department: { id: 8, name: 'Quality Assurance' }
  },
  {
    id: 3,
    email: 'ed.head@hospital.com',
    name: 'Dr. Emergency Head',
    role: 'department_head',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe',
    department: { id: 1, name: 'Emergency Department' }
  },
  {
    id: 4,
    email: 'nurse.ed1@hospital.com',
    name: 'Nurse Mary ED',
    role: 'nurse',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeJvNBUhUwmJNJLNe',
    department: { id: 1, name: 'Emergency Department' }
  }
];

const mockStats = {
  pendingChecklists: 12,
  overdueChecklists: 3,
  completedThisMonth: 45,
  expiringDocuments: 7,
  unreadAlerts: 5,
  openIncidents: 2,
  complianceRate: 92.5
};

const mockDepartmentStats = [
  { id: 1, name: 'Emergency Department', pendingTasks: 5, overdueTasks: 1 },
  { id: 2, name: 'ICU', pendingTasks: 3, overdueTasks: 0 },
  { id: 4, name: 'Pharmacy', pendingTasks: 2, overdueTasks: 1 },
  { id: 5, name: 'Laboratory', pendingTasks: 2, overdueTasks: 1 }
];

const mockActivity = [
  {
    type: 'checklist_completed',
    title: 'Daily Hand Hygiene Check completed',
    user: 'Nurse Mary ED',
    department: 'Emergency Department',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    type: 'incident_reported',
    title: 'Equipment Malfunction in ICU',
    user: 'Dr. ICU Head',
    department: 'ICU',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    severity: 'high'
  },
  {
    type: 'checklist_completed',
    title: 'Monthly Inventory completed',
    user: 'Pharmacy Head',
    department: 'Pharmacy',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = mockUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'NABH Platform API is running (Demo Mode)' });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/profile', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      department: req.user.department
    }
  });
});

// Dashboard routes
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  res.json({
    stats: mockStats,
    departmentStats: mockDepartmentStats
  });
});

app.get('/api/dashboard/activity', authenticateToken, (req, res) => {
  res.json({ activity: mockActivity });
});

// Error handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NABH Platform API running on port ${PORT} (Demo Mode)`);
  console.log('Note: This is a demo version with mock data. Full database features require PostgreSQL.');
});

module.exports = app;