# API Documentation

## Base URL

The API base URL is: `http://localhost:3000/api`

## Authentication

All API endpoints except `/auth/login` require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "user": {
      "id": "number",
      "email": "string",
      "name": "string",
      "role": "string",
      "department": {
        "id": "number",
        "name": "string"
      }
    },
    "token": "string"
  }
  ```

#### Get Profile
- **GET** `/auth/profile`
- **Response:**
  ```json
  {
    "user": {
      "id": "number",
      "email": "string",
      "name": "string",
      "role": "string",
      "department": {
        "id": "number",
        "name": "string"
      }
    }
  }
  ```

## Diagnoses

### Get All Diagnoses
- **GET** `/diagnoses`
- **Query Parameters:**
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
- **Response:**
  ```json
  {
    "diagnoses": [
      {
        "diagnosis_id": "number",
        "name": "string",
        "created_at": "datetime",
        "updated_at": "datetime"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "pages": "number"
    }
  }
  ```

### Get Single Diagnosis with Complications
- **GET** `/diagnoses/:id`
- **Response:**
  ```json
  {
    "diagnosis": {
      "diagnosis_id": "number",
      "name": "string",
      "complications": [
        {
          "complication_id": "number",
          "name": "string",
          "lab_investigations": [
            {
              "lab_id": "number",
              "name": "string"
            }
          ],
          "radiology_investigations": [
            {
              "radiology_id": "number",
              "name": "string"
            }
          ],
          "medications": [
            {
              "medication_id": "number",
              "name": "string"
            }
          ]
        }
      ]
    }
  }
  ```

## Complications

### Get Complications for Diagnosis
- **GET** `/complications`
- **Query Parameters:**
  - `diagnosis_id`: number
- **Response:**
  ```json
  {
    "complications": [
      {
        "complication_id": "number",
        "name": "string",
        "diagnosis_id": "number"
      }
    ]
  }
  ```

### Get Single Complication with Investigations
- **GET** `/complications/:id`
- **Response:**
  ```json
  {
    "complication": {
      "complication_id": "number",
      "name": "string",
      "diagnosis_id": "number",
      "lab_investigations": [
        {
          "lab_id": "number",
          "name": "string"
        }
      ],
      "radiology_investigations": [
        {
          "radiology_id": "number",
          "name": "string"
        }
      ],
      "medications": [
        {
          "medication_id": "number",
          "name": "string"
        }
      ]
    }
  }
  ```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token is required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Rate Limiting

The API implements rate limiting with the following defaults:
- Window: 15 minutes
- Max requests per window: 100

When rate limit is exceeded, the API returns:
```json
{
  "error": "Too many requests"
}
``` 