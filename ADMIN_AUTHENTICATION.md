# Admin Authentication System

## Overview

The admin dashboard (`/admin`) is now protected with JWT-based authentication using your existing `users` table. Only validated users can access the chat summaries and lead data.

## Features

✅ **Secure Login**: JWT tokens with 24-hour expiration  
✅ **Password Hashing**: bcrypt with 12 salt rounds  
✅ **Auto Token Verification**: Checks token validity on page load  
✅ **Protected API Endpoints**: Chat summaries require authentication  
✅ **User Validation**: Only validated users can login  
✅ **Clean Logout**: Removes tokens and redirects to login  

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install bcrypt jsonwebtoken
```

### 2. Create Your First Admin User

```bash
cd server
npm run create-admin admin@daveenci.ai your-secure-password "Your Name"
```

**Example:**
```bash
npm run create-admin anton@daveenci.ai mypassword123 "Anton Osipov"
```

### 3. Set JWT Secret (Production)

Add to your `.env` file:
```bash
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters
```

## Usage

### Accessing Admin Dashboard

1. Navigate to `/admin` (e.g., `https://yourdomain.com/admin`)
2. You'll see the login form if not authenticated
3. Enter your email and password
4. Successfully authenticated users see the chat dashboard

### API Endpoints

**Login:**
```
POST /api/auth/login
Body: { "email": "user@domain.com", "password": "password" }
Response: { "token": "jwt-token", "user": {...} }
```

**Verify Token:**
```
GET /api/auth/verify
Headers: Authorization: Bearer <token>
Response: { "user": {...} }
```

**Get Chat Summaries (Protected):**
```
GET /api/chat/summaries
Headers: Authorization: Bearer <token>
Response: { "summaries": [...], "pagination": {...} }
```

## Security Features

### 🔐 **Password Security**
- Passwords hashed with bcrypt (12 salt rounds)
- No plaintext passwords stored
- Secure comparison using bcrypt.compare()

### 🎫 **JWT Tokens**
- 24-hour expiration
- Contains user ID, email, and name
- Verified on every protected request
- Auto-refresh on successful verification

### 🛡️ **User Validation**
- Only users with `validated = true` can login
- Prevents unauthorized access even with correct credentials
- Easy user management through database

### 🚫 **Protected Routes**
- `/api/chat/summaries` requires authentication
- Invalid/expired tokens return 401 Unauthorized
- Frontend automatically redirects to login

## Database Schema

Your existing `users` table is used:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    password TEXT NOT NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    validated BOOLEAN DEFAULT false NOT NULL
);
```

## User Management

### Create New Admin User
```bash
npm run create-admin email@domain.com password123 "Full Name"
```

### Validate Existing User
```sql
UPDATE users SET validated = true WHERE email = 'user@domain.com';
```

### Deactivate User
```sql
UPDATE users SET validated = false WHERE email = 'user@domain.com';
```

### Change Password (requires hashing)
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('newpassword', 12);
// Then update in database
```

## Troubleshooting

### "Authentication failed" Error
1. Check if user exists in database
2. Verify `validated = true`
3. Ensure password is correct
4. Check JWT_SECRET is set

### "Token expired" Error
1. Login again to get new token
2. Tokens expire after 24 hours

### Cannot Access Dashboard
1. Ensure server is running
2. Check database connection
3. Verify user is validated
4. Clear browser storage and try again

## Production Considerations

1. **Set Strong JWT Secret**: Use at least 32 random characters
2. **HTTPS Only**: Never use HTTP in production
3. **Rate Limiting**: Already implemented (100 requests/15 minutes)
4. **Database Security**: Use environment variables for credentials
5. **Regular Backups**: Backup your users table

## Development Notes

- Tokens stored in `localStorage`
- Auto-redirect to login if token invalid
- Clean error handling with user-friendly messages
- Responsive design for mobile admin access 