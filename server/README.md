# DaVeenci Server

Backend API service for DaVeenci AI Forge - handles workshop registrations, email notifications, and other server-side functionality.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production
npm start
```

## 📋 Environment Variables

Create a `.env` file:

```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# Email Configuration (Resend - Recommended)
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=noreply@daveenci.ai
NOTIFICATION_EMAIL=support@daveenci.ai

# Email Configuration (SMTP Fallback)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 🚀 Resend Setup (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from dashboard
3. Set `RESEND_API_KEY` environment variable
4. Enjoy 3,000 free emails/month!

## 🛠️ API Endpoints

- `GET /health` - Health check
- `GET /api/workshop/info` - Workshop information
- `POST /api/workshop/register` - Workshop registration

## 🚀 Deployment (Render)

1. **Connect this repository** to Render as Web Service
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Add environment variables** in Render dashboard

## 🔧 CORS Configuration

Update the allowed origins in `index.js` to match your frontend domains:

```javascript
origin: [
  'https://your-frontend-site.netlify.app',
  'https://your-frontend-site.vercel.app',
  // Add your actual frontend URLs
]
```

## 📁 Project Structure

```
├── index.js           # Main server file
├── routes/           # API routes
│   └── workshop.js   # Workshop-related endpoints
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

## 🔮 Future Expansions

This server is ready for:
- Authentication routes (`/api/auth`)
- Admin dashboards (`/api/admin`)
- Database integration
- File uploads
- WebSocket connections
- Background jobs 