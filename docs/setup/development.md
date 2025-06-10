# Development Setup Guide

This guide will help you set up the NABH Platform for development.

## Prerequisites

1. **Node.js**
   - Version: 14.x or higher
   - Download from: [https://nodejs.org/](https://nodejs.org/)

2. **Docker**
   - Download Docker Desktop from: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

3. **Git**
   - Download from: [https://git-scm.com/](https://git-scm.com/)

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chatgptnotes/nabh.git
   cd nabh
   ```

2. **Environment Setup**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   
   # Edit .env with your settings:
   # - Database connection
   # - JWT secret
   # - Redis connection (if using)
   ```

## Development Options

### Option 1: Using Docker (Recommended)

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Initialize the database**
   ```bash
   # Wait for services to start, then:
   docker-compose exec postgres psql -U postgres -d nabh_platform -f /docker-entrypoint-initdb.d/init.sql
   ```

3. **Load sample data (optional)**
   ```bash
   docker-compose exec postgres psql -U postgres -d nabh_platform -f /docker-entrypoint-initdb.d/sample_data.sql
   ```

4. **Access the services**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - PostgreSQL: localhost:5432
   - Redis: localhost:6379

### Option 2: Manual Setup

1. **Database Setup**
   ```bash
   # Create database
   createdb nabh_platform
   
   # Apply schema
   psql -d nabh_platform -f database/schemas/medical_schema.sql
   
   # Load sample data (optional)
   psql -d nabh_platform -f database/seeds/sample_data.sql
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Development Workflow

### Frontend Development

1. **Start development server**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Backend Development

1. **Start development server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Lint code**
   ```bash
   npm run lint
   ```

## Database Management

### Working with Schemas

The database schemas are located in `database/schemas/`:
- `medical_schema.sql`: Main schema for medical data
- `init.sql`: Initial database setup

### Sample Data

Sample data is available in `database/seeds/sample_data.sql`

## Testing

### Frontend Testing

```bash
cd frontend
npm test
```

### Backend Testing

```bash
cd backend
npm test
```

## Common Issues and Solutions

### Backend Issues

1. **Database Connection Failed**
   - Check PostgreSQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Redis Connection Failed**
   - Check Redis service is running
   - Verify Redis connection string

### Frontend Issues

1. **API Connection Failed**
   - Check backend service is running
   - Verify API URL in frontend configuration
   - Check CORS settings

2. **Build Errors**
   - Clear node_modules and reinstall
   - Update dependencies
   - Check for TypeScript errors

## Docker Commands

### Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose build

# Restart a specific service
docker-compose restart [service_name]
```

### Container Management

```bash
# Access container shell
docker-compose exec [service_name] sh

# View container status
docker-compose ps

# Remove containers and volumes
docker-compose down -v
```

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Docker
- PostgreSQL

### Configuration

1. **ESLint Configuration**
   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

2. **Prettier Configuration**
   ```json
   {
     "editor.formatOnSave": true,
     "prettier.singleQuote": true
   }
   ```

## Git Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. **Push changes**
   ```bash
   git push origin feature/your-feature
   ```

4. Create Pull Request on GitHub