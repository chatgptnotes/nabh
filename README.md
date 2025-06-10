# NABH Audit Readiness Platform

A comprehensive software platform for hospitals to ensure continuous NABH compliance with real-time tracking, proactive alerts, and audit preparedness tools.

## 🏗️ Project Structure

```
nabh/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── config/       # Configuration files
│   └── tests/           # Backend tests
├── frontend/            # React web application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── utils/       # Utility functions
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
├── mobile/              # React Native mobile app
├── database/            # Database schemas and migrations
│   ├── schemas/         # SQL schema files
│   ├── migrations/      # Database migrations
│   └── seeds/           # Sample data
└── docs/               # Documentation
    ├── api/            # API documentation
    ├── setup/          # Setup guides
    └── user-guide/     # User documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your database settings in .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Database Setup

```bash
# Create database
createdb nabh_platform

# Run schema
psql -d nabh_platform -f database/schemas/init.sql

# Add sample data (optional)
psql -d nabh_platform -f database/seeds/sample_data.sql
```

## 🎯 Core Features

- **Department-Specific Checklists** - Daily/weekly/monthly compliance tasks
- **Document Management** - Centralized storage with expiry alerts
- **Real-Time Alerts** - Proactive notifications for deadlines
- **Compliance Dashboards** - Visual indicators by department
- **Role-Based Access** - Staff, managers, and admin permissions
- **Incident Logging** - Non-conformity tracking and resolution
- **Automated Reporting** - Audit-ready reports generation
- **SSO Integration** - Secure authentication

## 🔧 Technology Stack

- **Backend**: Node.js, Express.js, PostgreSQL, Sequelize ORM
- **Frontend**: React, Vite, TailwindCSS, React Query
- **Mobile**: React Native (planned)
- **Authentication**: JWT with SSO support
- **File Storage**: Local/S3 compatible

## 📱 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server
- `npm run test` - Run tests
- `npm run lint` - Lint code

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests

## 🔐 Environment Variables

Copy `.env.example` files and configure:

- Database connection
- JWT secrets
- Email service (for notifications)
- File upload paths
- SSO provider credentials

## 📊 Database Schema

Key entities:
- Users & Departments
- Checklist Templates & Entries
- Documents with expiry tracking
- Alerts & Notifications
- Incidents & Non-conformities

## 🚀 Getting Started

### Option 1: Using Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd nabh
   ```

2. **Start all services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Initialize the database:**
   ```bash
   # Wait for services to start, then run:
   docker-compose exec postgres psql -U postgres -d nabh_platform -f /docker-entrypoint-initdb.d/init.sql
   
   # Load sample data
   docker-compose exec postgres psql -U postgres -d nabh_platform < database/seeds/sample_data.sql
   ```

4. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - Database: localhost:5432

### Option 2: Manual Setup

1. **Prerequisites:**
   - Node.js 18+
   - PostgreSQL 14+
   - npm or yarn

2. **Database Setup:**
   ```bash
   createdb nabh_platform
   psql -d nabh_platform -f database/schemas/init.sql
   psql -d nabh_platform -f database/seeds/sample_data.sql
   ```

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database settings
   npm run dev
   ```

4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔐 Demo Credentials

Use these credentials to test different user roles:

- **Admin:** admin@hospital.com / password
- **Quality Manager:** qa.manager@hospital.com / password  
- **Department Head:** ed.head@hospital.com / password
- **Nurse:** nurse.ed1@hospital.com / password

## 🧪 Testing

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

## 🛠️ API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)
- `GET /api/auth/profile` - Get user profile

### Core Features
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/checklists/templates` - Get checklist templates
- `GET /api/checklists/entries` - Get checklist entries
- `GET /api/documents` - Get documents
- `GET /api/incidents` - Get incidents
- `GET /api/alerts` - Get alerts

## 🏗️ Project Status

✅ **Completed Features:**
- Authentication & Authorization
- Role-based access control
- Dashboard with real-time stats
- Department management
- Checklist template creation
- Document management with expiry tracking
- Incident reporting and tracking
- Alert notification system
- Responsive web interface
- Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🏥 About NABH

The National Accreditation Board for Hospitals & Healthcare Providers (NABH) is a constituent board of Quality Council of India, set up to establish and operate accreditation programme for healthcare organizations.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Review the documentation in `/docs`
- Check the setup guides in `/docs/setup`