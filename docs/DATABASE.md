# DroneTV Database Documentation

Technical documentation of the MongoDB database schema, validation rules, indexing strategy, and connection setup for **DroneTV AI Support & Lead Assistant**.

---

## 1. Database & Collection Overview

- **Database Engine**: MongoDB (v6.0+ / v7.0+)
- **ODM**: Mongoose (v8.9+)
- **Database Name**: `dronetv_db`
- **Collection**: `enquiries`

---

## 2. Schema Specification

The `enquiries` collection stores incoming customer leads and student admission inquiries.

| Field | Type | Required | Constraints / Enums | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto-generated | Unique document identifier |
| `name` | `String` | Yes | Min: 2, Max: 100, Trimmed | Full name of the applicant/client |
| `email` | `String` | Yes | Lowercase, RFC 5322 regex | Primary email address |
| `phone` | `String` | Yes | Regex, Min 10 valid digits | Direct phone number |
| `userType` | `String` | Yes | Enum: `['Student', 'Customer', 'Other']` | Type of user submitting the enquiry |
| `interest` | `String` | Yes | Max: 200, Trimmed | Service or course of interest |
| `message` | `String` | Yes | Min: 5, Max: 3000, Trimmed | Lead description or query details |
| `status` | `String` | Yes | Enum: `['New', 'Contacted', 'In Progress', 'Closed']` (Default: `'New'`) | Administrative lifecycle status |
| `createdAt` | `Date` | Yes | ISO 8601 Timestamp | Record creation timestamp |
| `updatedAt` | `Date` | Yes | ISO 8601 Timestamp | Last update timestamp |

---

## 3. Database Indexes

To ensure high-throughput queries, fast multi-attribute filtering, and low-latency server-side search across hundreds of thousands of leads, the following indexes are configured:

### 1. Single Field Indexes
```javascript
{ email: 1 }     // Fast lookup by client email
{ userType: 1 }  // Category filtering
{ status: 1 }    // Lifecycle status filtering
```

### 2. Compound Indexes
Optimized for the admin dashboard default sorting and filtering:
```javascript
{ status: 1, createdAt: -1 }    // Filter by status and sort by newest
{ userType: 1, createdAt: -1 }  // Filter by user category and sort by newest
```

### 3. Full-Text Search Index
Compound text index supporting weighted server-side fuzzy search across multiple fields simultaneously:
```javascript
{
  name: "text",
  email: "text",
  phone: "text",
  interest: "text",
  message: "text"
}
```
*Index Weights*:
- `name`: 5
- `email`: 4
- `phone`: 3
- `interest`: 2
- `message`: 1

---

## 4. Local Database Setup

### Prerequisites
- MongoDB Community Server installed locally.
- Service is started on port `27017`.

### Verify Local Service (Windows PowerShell)
```powershell
Get-Service -Name *mongo*
# Status: Running  Name: MongoDB  DisplayName: MongoDB Server
```

### Connection String
```env
MONGODB_URI=mongodb://127.0.0.1:27017/dronetv_db
```

---

## 5. MongoDB Atlas (Cloud Deployment Setup)

For production deployment on Render, Railway, or VPS:

1. **Sign in to MongoDB Atlas**: Go to [cloud.mongodb.com](https://cloud.mongodb.com/).
2. **Create a Cluster**: Choose the free **M0 Shared Cluster** (AWS, Mumbai `ap-south-1` region recommended for Indian latency).
3. **Configure Database Access User**:
   - Go to **Database Access** -> **Add New Database User**.
   - Authentication method: `Password`.
   - Role: `Read and write to any database`.
4. **Configure Network Access**:
   - Go to **Network Access** -> **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) for serverless cloud hosting platforms (like Render or Railway).
5. **Retrieve Connection String**:
   - Click **Database** -> **Connect** -> **Drivers (Node.js)**.
   - Copy connection string:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/dronetv_db?retryWrites=true&w=majority
     ```
6. **Deploy Environment Variable**:
   - Add `MONGODB_URI` to backend environment variables on Render / Railway.
