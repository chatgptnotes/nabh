# Development Setup Guide

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Git
- npm or yarn package manager

## Local Development Setup

### 1. Clone and Setup Repository

```bash
git clone <repository-url>
cd nabh
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql
brew services start postgresql

# Create database
createdb nabh_platform

# Run schema
psql -d nabh_platform -f database/schemas/init.sql

# Add sample data (optional)
psql -d nabh_platform -f database/seeds/sample_data.sql
```

#### Option B: Docker
```bash
# Start PostgreSQL with Docker
docker run --name nabh-postgres -e POSTGRES_DB=nabh_platform -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# Run schema
docker exec -i nabh-postgres psql -U postgres -d nabh_platform < database/schemas/init.sql
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=nabh_platform
# DB_USER=postgres
# DB_PASSWORD=password

# Start development server
npm run dev
```

The backend will be available at `http://localhost:3000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3001`

## Development Workflow

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Quality

```bash
# Lint backend code
cd backend
npm run lint

# Lint frontend code
cd frontend
npm run lint
```

### Database Migrations

When making schema changes:

1. Create new migration file in `database/migrations/`
2. Update the main schema in `database/schemas/init.sql`
3. Test locally before committing

## Docker Development (Alternative)

For a complete containerized setup:

```bash
# Build and start all services
docker-compose up --build

# Backend: http://localhost:3000
# Frontend: http://localhost:3001
# PostgreSQL: localhost:5432
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check credentials in `.env` file
- Verify database exists

### Port Conflicts
- Change ports in `.env` files if 3000/3001 are in use
- Update docker-compose.yml port mappings

### Node.js Version Issues
- Use Node.js 18 or higher
- Consider using nvm to manage Node versions

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nabh_platform
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-super-secret-key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Next Steps

1. Set up your IDE with ESLint and Prettier
2. Configure git hooks for code quality
3. Review the API documentation in `docs/api/`
4. Check out the user guide in `docs/user-guide/`