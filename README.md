# DroneTV AI Support & Lead Assistant

[![Full Stack Assessment](https://img.shields.io/badge/IPAGE%20Group-Internship%20Assessment-06B6D4?style=for-the-badge)](https://dronetv.in)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-3B82F6?style=for-the-badge)](#technologies)
[![Tests](https://img.shields.io/badge/Tests-16%20Passed%20%2F%200%20Failed-10B981?style=for-the-badge)](#testing)

A responsive, production-ready full-stack web application for **DroneTV**, featuring an original modern UI, interactive enterprise services & flight training academy catalogs, a deterministic rule-based AI support assistant with lead-capture handoff, and an administrative lead management CRM dashboard with real-time KPI metrics, search, filtering, and CRUD operations.

---

## 🚀 Key Features

### 1. Client Web Portal (Modern & Responsive)
- **High-Impact Landing Page**: Aerospace dark-mode theme, live telemetry HUD counter, DGCA regulatory badges, and clear primary CTAs.
- **Enterprise Services Showcase**: Reusable service cards for Aerial Surveying, Thermal Asset Inspection, Precision Agriculture, 8K Cinematography, Security Surveillance, and Custom UAV Engineering with instant quote request preselection.
- **DroneTV Flight Academy**: Course cards for DGCA Remote Pilot Certification, Industrial Thermography, and AgriTech Spraying with level tags, duration, and one-click *"Enquire Now"* auto-population.
- **Lead Enquiry Form**: Strict client-side validation with real-time error hints, loading indicators, duplicate submission prevention, and clean success/error state banners.

### 2. Deterministic Rule-Based Chatbot Assistant
- **Floating Interactive Widget**: Collapsible launcher with unread notification badge, session message history, and typing state.
- **Zero External AI Dependency**: Built with an efficient keyword and intent normalization engine with zero hallucination risk, zero third-party latency, and zero token costs.
- **Mandatory Predefined Inquiries Supported**:
  - *What services does DroneTV provide?*
  - *What courses / training are available?*
  - *How can I contact DroneTV?*
  - *How can I register?*
  - *I am interested in a service.*
  - *I am a student.*
  - *I want to speak with someone.*
- **Enquiry Handoff Action**: Detects high-intent commercial questions and surfaces an embedded *"Submit an Enquiry"* button directly inside the chat stream.
- **Graceful Fallback**: Handles unsupported questions politely without ever crashing or freezing.
- **Reset Feature**: Clear and reset conversation history at any time.

### 3. Administrator Dashboard & Lead CRM (`/admin`)
- **Passkey Authorization**: Protected administrative gate (default passkey: `dronetv2026`).
- **Real-Time KPI Statistics**: Metric cards for Total Enquiries, New Leads, Contacted, In Progress, and Closed.
- **Multi-Field Server-Side Search**: Debounced search across Name, Email, Phone, and Interest.
- **Granular Filtering**: Filter by User Category (`Student`, `Customer`, `Other`) and Lifecycle Status (`New`, `Contacted`, `In Progress`, `Closed`).
- **Comprehensive Details Modal**: View complete lead metadata, message text, and submission timestamps.
- **Lifecycle Management**: Instant status updates synced with the database.
- **Delete Confirmation**: Safe two-step deletion modal preventing accidental record loss.
- **CSV Data Export**: One-click download of all lead records for external spreadsheet analysis.

---

## 🛠️ Technologies

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS with custom cyber-aviation slate theme & glassmorphism utilities
- **Icons**: Lucide React
- **Routing**: React Router DOM v7

### Backend
- **Runtime**: Node.js (v20+ / v23+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security Middleware**: Helmet, CORS, Express Rate Limit, HTML sanitization
- **Architecture**: Strict Layered Pattern (Route → Controller → Validator → Service → Model → MongoDB)

---

## 🏗️ Architecture

```
User Browser
    ↓
React Frontend (Vite + TypeScript)
    ↓  [REST API / JSON / Sanitized]
Express Backend API (Node.js)
    ↓
Security & Rate Limit Layer
    ↓
Validation & Sanitization Middleware
    ↓
Enquiry Controller
    ↓
Enquiry Service
    ↓
Mongoose ODM (Schema Validation & Indexes)
    ↓
MongoDB (Local / Atlas Cloud)
```

---

## 📂 Project Structure

```text
DroneTV-AI/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI (Navbar, Hero, Cards, Form, Chatbot, Admin)
│   │   ├── pages/            # Routes (Home, Services, Courses, Enquiry, Admin, 404)
│   │   ├── services/         # API client & rule-based chatbot engine
│   │   ├── data/             # Services, courses, and chatbot intents catalog
│   │   ├── types/            # TypeScript interfaces and types
│   │   ├── utils/            # Client validation utilities
│   │   ├── App.tsx           # Router and root state
│   │   └── main.tsx          # Entry point
│   ├── .env.example          # Frontend environment variables template
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── config/           # Database connection setup
│   │   ├── controllers/      # HTTP request controllers
│   │   ├── middleware/       # Centralized error handler, 404 handler
│   │   ├── models/           # Mongoose schemas with indexes
│   │   ├── routes/           # Express REST endpoints
│   │   ├── services/         # Business logic & query services
│   │   ├── validators/       # Strict validation & XSS sanitization
│   │   ├── utils/            # Standardized API response formatters
│   │   └── server.js         # Server entry point
│   ├── tests/
│   │   └── api.test.js       # Automated end-to-end API test suite
│   ├── .env.example          # Backend environment variables template
│   └── package.json
│
├── docs/
│   ├── API.md                # REST API technical specification
│   ├── DATABASE.md           # Schema, indexing, and MongoDB setup guide
│   └── ARCHITECTURE.md       # Architecture diagrams and interview rationale
│
├── FullStack_Chatbot_Task_Mohit_Uniyal/  # Google Drive submission package
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18.0 or newer)
- MongoDB running locally on default port `27017` (or a MongoDB Atlas connection string)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment file
cp .env.example .env

# Run automated tests to verify database and endpoints
npm test

# Start the development server
npm run dev
```
Backend API will be live at: `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`)

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Setup environment file
cp .env.example .env

# Start the Vite development server
npm run dev
```
Frontend web application will be live at: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dronetv_db
CLIENT_URL=http://localhost:5173
ADMIN_API_KEY=dronetv_admin_secure_2026
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_ADMIN_KEY=dronetv2026
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status & DB state |
| `POST` | `/api/enquiries` | Create new lead (status defaults to `New`) |
| `GET` | `/api/enquiries` | Paginated leads (`?page=1&limit=20&search=...&status=...&userType=...`) |
| `GET` | `/api/enquiries/stats` | KPI counts (`total`, `new`, `contacted`, `inProgress`, `closed`) |
| `GET` | `/api/enquiries/:id` | Fetch single enquiry by ID |
| `PATCH` | `/api/enquiries/:id` | Update enquiry status (`New`, `Contacted`, `In Progress`, `Closed`) |
| `DELETE` | `/api/enquiries/:id` | Delete enquiry record |

Detailed schemas and request/response examples are documented in [docs/API.md](docs/API.md).

---

## 🧪 Automated Testing

The backend includes a comprehensive automated test suite (`backend/tests/api.test.js`) verifying all 16 critical endpoints and validation scenarios:

```bash
cd backend
npm test
```

### Test Coverage Checklist:
- [x] Health check returns 200 OK
- [x] Rejection of missing required fields (name, email, phone, userType, message)
- [x] Validation of RFC 5322 email formatting
- [x] Validation of phone number (minimum 10 valid digits)
- [x] Rejection of invalid `userType` enums
- [x] Client tampering protection: Server enforces status `'New'` on creation
- [x] Paginated retrieval of leads
- [x] Aggregation of KPI statistics
- [x] Retrieval of single lead by ObjectId
- [x] Rejection of malformed MongoDB ObjectIds (400 Bad Request)
- [x] Non-existent ID handling (404 Not Found)
- [x] Status lifecycle transitions (PATCH `Contacted`, `In Progress`, `Closed`)
- [x] Rejection of invalid status enums
- [x] Multi-field server-side search filtering
- [x] Lead deletion and 404 verification on repeated deletion

---

## ☁️ Production Deployment Instructions

### 1. Database (MongoDB Atlas)
1. Create a free M0 cluster on [MongoDB Atlas](https://cloud.mongodb.com/).
2. Add a database user with read/write privileges.
3. Whitelist access from anywhere (`0.0.0.0/0`) for serverless deployment.
4. Copy the connection string: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/dronetv_db?retryWrites=true&w=majority`.

### 2. Backend (Render / Railway)
1. Connect repository to Render and choose **Web Service**.
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: `<Your MongoDB Atlas URI>`
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app`

### 3. Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com).
2. Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-domain.onrender.com`
   - `VITE_ADMIN_KEY`: `dronetv2026`

---

## 🎓 Candidate Architectural Explanations

1. **Why React + TypeScript?** Component-driven hierarchy guarantees clean separation between data presentation and logic. TypeScript prevents runtime bugs through strict type checking.
2. **Why Layered Architecture (Controller / Service / Model)?** Keeps HTTP transport concerns separate from business and database logic, maximizing testability and maintainability.
3. **How does the Rule-Based Chatbot work?** Normalizes incoming user messages (lowercasing, punctuation removal) and matches them deterministically against an intent matrix with keyword scoring and fallback triggers.
4. **How are secrets protected?** All connection strings and private keys are injected via environment variables. `.env` files are strictly excluded via `.gitignore`.
5. **How is input sanitized?** All inputs are validated with regex patterns and sanitized against script and HTML injection on both frontend and backend.

---

## 👤 Author

- **Name**: Mohit Uniyal
- **Email**: mohituniyal1234567@gmail.com
- **Role**: Full Stack Developer Intern Candidate
- **Organization**: IPAGE Group Assessment
