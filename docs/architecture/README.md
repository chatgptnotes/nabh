# System Architecture

This document provides a comprehensive overview of the NABH Platform's architecture through various diagrams.

## System Overview

The NABH Platform uses a modern microservices architecture with the following key components:
- React frontend with Vite
- Node.js backend with Express
- PostgreSQL database
- Redis cache
- Docker containerization

### High-Level Architecture

```mermaid
graph TD
    Client["Client Browser/App"]
    FE["Frontend<br/>React + Vite"]
    BE["Backend API<br/>Node.js + Express"]
    DB["PostgreSQL<br/>Database"]
    Cache["Redis Cache"]
    
    Client -->|"HTTP/HTTPS"| FE
    FE -->|"REST API"| BE
    BE -->|"Query/Update"| DB
    BE -->|"Cache Data"| Cache
    
    subgraph "Docker Environment"
        FE
        BE
        DB
        Cache
    end
```

## Database Schema

The following Entity Relationship Diagram (ERD) shows the database structure:

```mermaid
erDiagram
    DIAGNOSIS ||--o{ COMPLICATION : "has"
    COMPLICATION ||--o{ LAB_INVESTIGATION : "requires"
    COMPLICATION ||--o{ RADIOLOGY_INVESTIGATION : "requires"
    COMPLICATION ||--o{ MEDICATION : "needs"

    DIAGNOSIS {
        int diagnosis_id PK
        string name
        timestamp created_at
        timestamp updated_at
    }

    COMPLICATION {
        int complication_id PK
        string name
        int diagnosis_id FK
        timestamp created_at
        timestamp updated_at
    }

    LAB_INVESTIGATION {
        int lab_id PK
        string name
        int complication_id FK
        timestamp created_at
        timestamp updated_at
    }

    RADIOLOGY_INVESTIGATION {
        int radiology_id PK
        string name
        int complication_id FK
        timestamp created_at
        timestamp updated_at
    }

    MEDICATION {
        int medication_id PK
        string name
        int complication_id FK
        timestamp created_at
        timestamp updated_at
    }
```

## Authentication Flow

The sequence diagram below illustrates the authentication process:

```mermaid
sequenceDiagram
    participant C as Client
    participant F as Frontend
    participant B as Backend
    participant D as Database

    C->>F: Enter Credentials
    F->>B: POST /api/auth/login
    B->>D: Verify Credentials
    D-->>B: User Data
    B->>B: Generate JWT
    B-->>F: Return Token + User Data
    F->>F: Store Token
    F-->>C: Show Dashboard

    Note over C,F: Subsequent Requests
    C->>F: Make Request
    F->>B: Request + JWT Header
    B->>B: Verify JWT
    B-->>F: Response
    F-->>C: Show Data
```

## Frontend Architecture

The frontend follows a component-based architecture:

```mermaid
graph TD
    subgraph "Frontend Architecture"
        App["App.jsx"]
        Router["Router"]
        Auth["AuthProvider"]
        API["API Service"]
        
        subgraph "Pages"
            Login["Login.jsx"]
            Dashboard["Dashboard.jsx"]
            Diagnoses["Diagnoses.jsx"]
            Complications["Complications.jsx"]
        end
        
        subgraph "Components"
            Layout["Layout.jsx"]
            Protected["ProtectedRoute.jsx"]
            Nav["Navigation.jsx"]
        end
        
        subgraph "Hooks"
            UseAuth["useAuth()"]
            UseAPI["useAPI()"]
        end
        
        App --> Router
        App --> Auth
        Router --> Protected
        Protected --> Pages
        Pages --> |"uses"| API
        Pages --> |"uses"| UseAuth
        API --> UseAPI
        Auth --> UseAuth
    end
```

## Backend Architecture

The backend follows a layered architecture pattern:

```mermaid
graph TD
    subgraph "Backend Architecture"
        App["app.js"]
        Routes["Routes"]
        Controllers["Controllers"]
        Services["Services"]
        Models["Models"]
        Middleware["Middleware"]
        
        subgraph "Database"
            PG["PostgreSQL"]
            Redis["Redis Cache"]
        end
        
        App --> Routes
        Routes --> Controllers
        Controllers --> Services
        Services --> Models
        Models --> PG
        Services --> Redis
        
        Middleware --> |"Auth"| Routes
        Middleware --> |"Validation"| Controllers
        
        subgraph "External Services"
            Email["Email Service"]
            Storage["File Storage"]
        end
        
        Services --> Email
        Services --> Storage
    end
```

## Key Components

### Frontend
- **React + Vite**: Modern frontend framework with fast build tools
- **TailwindCSS**: Utility-first CSS framework
- **React Query**: Data fetching and caching
- **React Router**: Client-side routing
- **Zustand**: State management

### Backend
- **Node.js + Express**: Server framework
- **PostgreSQL**: Primary database
- **Redis**: Caching layer
- **JWT**: Authentication
- **Express Validator**: Request validation

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **GitHub Actions**: CI/CD (planned)
- **Nginx**: Reverse proxy (production) 