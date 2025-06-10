# NABH Platform

A comprehensive platform for managing medical diagnoses, complications, and associated investigations in healthcare facilities.

## Features

- **Diagnosis Management**: Track and manage medical diagnoses
- **Complications Tracking**: Associate complications with diagnoses
- **Investigation Management**: Link lab and radiology investigations to complications
- **Medication Management**: Associate medications with complications
- **User Role Management**: Support for multiple user roles (Admin, Quality Manager, Department Head)
- **Docker Integration**: Easy deployment with Docker containers
- **Database Management**: PostgreSQL database with proper schema and relationships

## Tech Stack

- **Frontend**: React + Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Cache**: Redis
- **Containerization**: Docker
- **Authentication**: JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/chatgptnotes/nabh.git
   cd nabh
   ```

2. Start the application using Docker:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## Development Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Database

The database schema and sample data are located in the `database` directory:
- Schemas: `database/schemas/`
- Sample Data: `database/seeds/`

## API Documentation

### Authentication Endpoints

- POST `/api/auth/login`: Login endpoint
  ```json
  {
    "email": "admin@hospital.com",
    "password": "password"
  }
  ```

- GET `/api/auth/profile`: Get user profile (requires authentication)

### Demo Credentials

- Admin:
  - Email: admin@hospital.com
  - Password: password

- Quality Manager:
  - Email: qa.manager@hospital.com
  - Password: password

- Department Head:
  - Email: ed.head@hospital.com
  - Password: password

## Project Structure

```
nabh/
├── frontend/           # React frontend application
├── backend/           # Node.js backend API
├── database/         # Database schemas and seeds
├── docs/            # Additional documentation
└── docker-compose.yml # Docker composition file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.