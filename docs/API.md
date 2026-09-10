# DroneTV REST API Documentation

Comprehensive technical reference for the DroneTV AI Support & Lead Assistant RESTful API.

- **Base URL (Local)**: `http://localhost:5000`
- **Content Type**: `application/json`
- **Standard Success Format**: `{ "success": true, "message": string, "data"?: any }`
- **Standard Error Format**: `{ "success": false, "message": string, "errors"?: string[] }`

---

## Table of Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health, uptime & DB status | Public |
| `POST` | `/api/enquiries` | Create and submit a new lead enquiry | Public |
| `GET` | `/api/enquiries` | List paginated enquiries with search & filter | Admin |
| `GET` | `/api/enquiries/stats` | Aggregate KPI statistics for admin dashboard | Admin |
| `GET` | `/api/enquiries/:id` | Retrieve single enquiry by its MongoDB ID | Admin |
| `PATCH` | `/api/enquiries/:id` | Update enquiry status or attributes | Admin |
| `DELETE` | `/api/enquiries/:id` | Delete an enquiry record permanently | Admin |

---

## 1. Health Check

### `GET /api/health`
Checks server responsiveness, current uptime, and MongoDB connection status.

#### Request
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-09-09T20:06:24.666Z",
  "uptime": 100,
  "database": "connected",
  "environment": "development"
}
```

---

## 2. Submit Lead Enquiry

### `POST /api/enquiries`
Submits a new customer or student lead. Enforces strict input validation and sanitization. The enquiry status is automatically set to `'New'` on the server regardless of any payload input.

#### Request Body
```json
{
  "name": "Aarav Mehta",
  "email": "aarav.mehta@example.com",
  "phone": "+91 9876543210",
  "userType": "Student",
  "interest": "DGCA Certified Remote Pilot Certificate (RPC)",
  "message": "I would like to enroll in the upcoming weekend batch for DGCA RPC certification."
}
```

#### Field Specifications:
- `name` (String, required): 2 to 100 characters. Trimmed and sanitized.
- `email` (String, required): Valid email format. Converted to lowercase.
- `phone` (String, required): Valid phone number containing at least 10 digits.
- `userType` (String, required): One of `["Student", "Customer", "Other"]`.
- `interest` (String, required): Maximum 200 characters.
- `message` (String, required): 5 to 3,000 characters. Sanitized to strip HTML/script tags.

#### Response: `201 Created`
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": {
    "_id": "67cf1e4a1a08b61c99bfaad4",
    "name": "Aarav Mehta",
    "email": "aarav.mehta@example.com",
    "phone": "+91 9876543210",
    "userType": "Student",
    "interest": "DGCA Certified Remote Pilot Certificate (RPC)",
    "message": "I would like to enroll in the upcoming weekend batch for DGCA RPC certification.",
    "status": "New",
    "createdAt": "2026-09-09T20:18:18.420Z",
    "updatedAt": "2026-09-09T20:18:18.420Z"
  }
}
```

#### Error Response: `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid email address format"
}
```

---

## 3. List All Enquiries (Paginated & Filtered)

### `GET /api/enquiries`
Retrieves a paginated list of enquiries sorted by `createdAt` descending. Supports multi-field server-side search and filtering.

#### Query Parameters:
- `page` (Integer, default `1`): Current page number.
- `limit` (Integer, default `20`, max `100`): Items per page.
- `search` (String, optional): Case-insensitive search across name, email, phone, interest, and message.
- `userType` (String, optional): Filter by `"Student"`, `"Customer"`, or `"Other"`.
- `status` (String, optional): Filter by `"New"`, `"Contacted"`, `"In Progress"`, or `"Closed"`.

#### Example Request
```http
GET /api/enquiries?page=1&limit=10&status=New&userType=Student HTTP/1.1
Host: localhost:5000
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiries retrieved successfully",
  "data": {
    "enquiries": [
      {
        "_id": "67cf1e4a1a08b61c99bfaad4",
        "name": "Aarav Mehta",
        "email": "aarav.mehta@example.com",
        "phone": "+91 9876543210",
        "userType": "Student",
        "interest": "DGCA Certified Remote Pilot Certificate (RPC)",
        "message": "I would like to enroll in the upcoming weekend batch for DGCA RPC certification.",
        "status": "New",
        "createdAt": "2026-09-09T20:18:18.420Z",
        "updatedAt": "2026-09-09T20:18:18.420Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

---

## 4. Get Enquiry Statistics (KPI Metrics)

### `GET /api/enquiries/stats`
Computes real-time aggregate counts for admin dashboard metric cards.

#### Request
```http
GET /api/enquiries/stats HTTP/1.1
Host: localhost:5000
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry statistics retrieved successfully",
  "data": {
    "statuses": {
      "total": 1,
      "new": 1,
      "contacted": 0,
      "inProgress": 0,
      "closed": 0
    },
    "userTypes": {
      "student": 1,
      "customer": 0,
      "other": 0
    }
  }
}
```

---

## 5. Get Single Enquiry

### `GET /api/enquiries/:id`
Retrieves full details of a specific enquiry record.

#### Request
```http
GET /api/enquiries/67cf1e4a1a08b61c99bfaad4 HTTP/1.1
Host: localhost:5000
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry details retrieved successfully",
  "data": {
    "_id": "67cf1e4a1a08b61c99bfaad4",
    "name": "Aarav Mehta",
    "email": "aarav.mehta@example.com",
    "phone": "+91 9876543210",
    "userType": "Student",
    "interest": "DGCA Certified Remote Pilot Certificate (RPC)",
    "message": "I would like to enroll in the upcoming weekend batch for DGCA RPC certification.",
    "status": "New",
    "createdAt": "2026-09-09T20:18:18.420Z",
    "updatedAt": "2026-09-09T20:18:18.420Z"
  }
}
```

#### Error Response: `404 Not Found`
```json
{
  "success": false,
  "message": "Enquiry not found with the requested ID"
}
```

#### Error Response: `400 Bad Request` (Invalid ObjectId Format)
```json
{
  "success": false,
  "message": "Invalid enquiry ID format"
}
```

---

## 6. Update Enquiry

### `PATCH /api/enquiries/:id`
Updates status and allowed parameters of an existing enquiry.

#### Request Body
```json
{
  "status": "Contacted"
}
```

#### Valid Status Enums:
`"New"`, `"Contacted"`, `"In Progress"`, `"Closed"`

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry updated successfully",
  "data": {
    "_id": "67cf1e4a1a08b61c99bfaad4",
    "name": "Aarav Mehta",
    "email": "aarav.mehta@example.com",
    "phone": "+91 9876543210",
    "userType": "Student",
    "interest": "DGCA Certified Remote Pilot Certificate (RPC)",
    "message": "I would like to enroll in the upcoming weekend batch for DGCA RPC certification.",
    "status": "Contacted",
    "createdAt": "2026-09-09T20:18:18.420Z",
    "updatedAt": "2026-09-09T20:20:15.102Z"
  }
}
```

#### Error Response: `400 Bad Request` (Invalid Status Enum)
```json
{
  "success": false,
  "message": "Status must be one of: New, Contacted, In Progress, Closed"
}
```

---

## 7. Delete Enquiry

### `DELETE /api/enquiries/:id`
Permanently deletes an enquiry record from the database.

#### Request
```http
DELETE /api/enquiries/67cf1e4a1a08b61c99bfaad4 HTTP/1.1
Host: localhost:5000
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Enquiry deleted successfully",
  "data": {
    "id": "67cf1e4a1a08b61c99bfaad4"
  }
}
```

#### Error Response: `404 Not Found`
```json
{
  "success": false,
  "message": "Enquiry not found with the requested ID"
}
```
