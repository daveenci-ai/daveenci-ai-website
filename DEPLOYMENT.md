# DaVeenci AI Forge - Monorepo Deployment Guide

**Best of Both Worlds!** This project uses a monorepo structure for simplicity:
- 🚀 **Frontend**: React app deployed as static site
- ⚡ **Server**: Express.js API deployed as web service
- 📦 **Single Repository**: Easy to manage and coordinate changes

## Project Structure

```
daveenci-ai-forge/
├── src/                    # React frontend code
│   └── config/api.ts      # API configuration
├── server/                 # Express.js server code
│   ├── index.js           # Main server file
│   ├── routes/            # API routes
│   │   └── workshop.js    # Workshop endpoints
│   └── package.json       # Server dependencies
├── public/
│   ├── _redirects         # Netlify routing
│   └── ...
├── vercel.json            # Vercel routing
├── dist/                  # Built frontend (generated)
└── package.json           # Frontend dependencies + scripts
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install all dependencies:**
   ```bash
   npm run hybrid:install
   ```

2. **Run both frontend and server:**
   ```bash
   npm run hybrid:dev
   ```

   This starts:
   - React dev server on `http://localhost:5173`
   - Express server on `http://localhost:3001`

3. **Or run individually:**
   ```bash
   # Frontend only
   npm run dev

   # Server only
   npm run server:dev
   ```

## Production Deployment

You'll deploy TWO separate services:

### 1. Frontend (Static Site)

**Deploy to Netlify, Vercel, or Render Static Site:**

1. **Build Command:**
   ```bash
   npm run static:build
   ```

2. **Publish Directory:** `dist`

3. **Client-side routing is automatically handled** by `_redirects` (Netlify) or `vercel.json` (Vercel)

### 2. Server (Render Web Service)

1. **Create new Web Service** on Render

2. **Root Directory:** `server`

3. **Build Command:** `npm install`

4. **Start Command:** `npm start`

4. **Environment Variables:**

   **Option A: Resend (Recommended):**
   ```
   NODE_ENV=production
   PORT=3001
   RESEND_API_KEY=re_DYrxz7cb_Ft7bbvHVNacBFAs4quJE2ETQ
   FROM_EMAIL=noreply@daveenci.ai
NOTIFICATION_EMAIL=support@daveenci.ai
   ```

   **Option B: Gmail/SMTP (Fallback):**
   ```
   NODE_ENV=production
   PORT=3001
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NOTIFICATION_EMAIL=notifications@yourdomain.com
   ```

### Email Configuration

#### Option A: Resend (Recommended) 🚀
1. **Sign up** at [resend.com](https://resend.com)
2. **Get API key** from dashboard
3. **Set environment variable**: `RESEND_API_KEY=re_xxxxx`
4. **Optional**: Verify your domain for production

**Benefits:**
- ✅ No SMTP configuration needed
- ✅ Better deliverability 
- ✅ Beautiful developer experience
- ✅ Free tier: 3,000 emails/month

#### Option B: Gmail/SMTP (Fallback)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use the app password as `EMAIL_PASS`

**The system automatically falls back to SMTP if Resend fails!**

### 3. Connect Frontend to API

Update `src/config/api.ts` with your deployed API URL:

```typescript
export const API_CONFIG = {
  development: {
    baseUrl: 'http://localhost:3001'
  },
  production: {
    baseUrl: 'https://your-actual-api-service.onrender.com' // Replace with real URL
  }
};
```

## Deployment Benefits 

### ✅ **Hybrid Architecture Advantages**

1. **🚀 Frontend (Static Site)**:
   - Blazing fast CDN delivery
   - Free hosting on Netlify/Vercel
   - Excellent SEO with pre-rendering
   - Client-side routing works perfectly
   - No server maintenance needed

2. **⚡ API Service**:
   - Handles dynamic functionality
   - Email processing
   - Rate limiting & security
   - Easy to scale independently
   - Pay only for API usage

3. **🔧 Development Experience**:
   - Local development with hot reload
   - Clear separation of concerns
   - Easy debugging
   - Independent deployments

## API Endpoints

- `POST /api/workshop/register` - Workshop registration
- `GET /api/workshop/info` - Workshop information
- `GET /health` - Health check

## Troubleshooting

### Direct URL Access Issues
- ✅ **Fixed!** `_redirects` and `vercel.json` handle client-side routing
- All routes like `/events/ai-automation-workshop-austin` work directly

### CORS Issues
- Update CORS origins in `api/index.js` with your static site URLs
- Add your Netlify/Vercel domain to the allowed origins

### API Connection Issues
- Verify the API URL in `src/config/api.ts`
- Check that API service is running and accessible
- Test API endpoints directly (e.g., `/health`)

### Email Not Working
- Set environment variables in your API service
- Use Gmail App Password (not regular password)
- Check API service logs for errors

## Testing

### Local Testing
1. Run `npm run hybrid:dev`
2. Test frontend: `http://localhost:5173/events/ai-automation-workshop-austin`
3. Test API directly: `http://localhost:3001/health`

### Production Testing
1. Fill out registration form on your static site
2. Check that emails are sent
3. Verify API logs show successful processing

## Cost Comparison

| Component | Static Only | Hybrid | Web Service Only |
|-----------|-------------|---------|------------------|
| Frontend | Free (CDN) | Free (CDN) | $7+/month |
| API | ❌ No dynamic features | $7+/month | Included |
| Speed | ⚡ Fastest | ⚡ Fast frontend, normal API | 🐌 Slower |
| Scalability | Limited | Best | Good |
| Maintenance | Minimal | Low | Higher |

**Winner: Hybrid** - Best performance, cost-effective, maximum flexibility! 🏆 