# Chatbot Deployment Guide for Render

This guide will help you deploy the DaVeenci chatbot system on Render with full database integration.

## 🚀 Quick Start

### 1. Frontend Deployment (Static Site)
Deploy the frontend as a static site on Render:

**Build Settings:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### 2. Backend Deployment (Web Service)
Deploy the backend as a web service on Render:

**Build Settings:**
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`

### 3. Database Setup (PostgreSQL)
Create a PostgreSQL database on Render and note the connection URL.

## 🔧 Environment Variables

### Backend Service Environment Variables

Set these environment variables in your Render backend service:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname:port/database_name

# Node Environment
NODE_ENV=production

# Server Configuration
PORT=3001

# CORS Origins (add your frontend URL)
FRONTEND_URL=https://your-frontend-site.onrender.com
```

### Frontend Environment Variables

Set these in your frontend static site:

```bash
# API Configuration
VITE_API_URL=https://your-backend-service.onrender.com
```

## 📋 Database Tables

The following tables will be automatically created when the backend starts:

### 1. Events Table
```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  event_date TIMESTAMP,
  event_name TEXT,
  event_address TEXT,
  event_type TEXT,
  event_description TEXT,
  event_capacity INT,
  event_status TEXT,
  dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dt_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Event Participants Table
```sql
CREATE TABLE event_participants (
  id SERIAL PRIMARY KEY,
  event_id INT REFERENCES events(id),
  full_name TEXT,
  email TEXT,
  phone TEXT,
  company_name TEXT,
  website TEXT,
  notes TEXT,
  dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dt_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT,
  meta_description VARCHAR(160),
  meta_keywords TEXT,
  seo_score DECIMAL(3,2) DEFAULT 0.0,
  featured_image_url TEXT,
  status VARCHAR(20) DEFAULT 'published',
  is_featured BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  read_time_minutes INT,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by_llm BOOLEAN DEFAULT true,
  llm_prompt TEXT
);
```

### 4. Chat Summaries Table (NEW - For Chatbot)
```sql
CREATE TABLE chat_summaries (
  id SERIAL PRIMARY KEY,
  interaction_date DATE NOT NULL,
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  company_name VARCHAR(255),
  chat_summary TEXT NOT NULL,
  services_discussed JSONB DEFAULT '[]',
  key_pain_points JSONB DEFAULT '[]',
  call_to_action_offered BOOLEAN DEFAULT FALSE,
  next_step TEXT,
  lead_qualification VARCHAR(10) DEFAULT 'Cold' CHECK (lead_qualification IN ('Hot', 'Warm', 'Cold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔍 Database Indexes

The following indexes are automatically created for optimal performance:

### Events & Participants
- `idx_events_date` - on events(event_date)
- `idx_events_type` - on events(event_type)
- `idx_events_status` - on events(event_status)
- `idx_participants_event` - on event_participants(event_id)
- `idx_participants_email` - on event_participants(email)

### Blog Posts
- `idx_blog_posts_slug` - on blog_posts(slug)
- `idx_blog_posts_status` - on blog_posts(status)
- `idx_blog_posts_published_at` - on blog_posts(published_at)
- `idx_blog_posts_featured` - on blog_posts(is_featured)
- `idx_blog_posts_created_by_llm` - on blog_posts(created_by_llm)
- `idx_blog_posts_tags` - GIN index for full-text search on tags
- `idx_blog_posts_search` - GIN index for full-text search on title and content

### Chat Summaries (NEW)
- `idx_chat_summaries_date` - on chat_summaries(interaction_date)
- `idx_chat_summaries_qualification` - on chat_summaries(lead_qualification)
- `idx_chat_summaries_email` - on chat_summaries(contact_email)
- `idx_chat_summaries_created` - on chat_summaries(created_at)
- `idx_chat_summaries_company` - on chat_summaries(company_name)

## 🤖 Chatbot Features

### Frontend Features
- **Chat Widget**: Floating chat button on all pages
- **Dave AI Assistant**: Intelligent conversation flow
- **Contact Collection**: Automatic extraction of name, email, phone, company
- **Lead Qualification**: Hot/Warm/Cold scoring
- **Call-to-Action**: Encourages scheduling calls

### Backend Features
- **API Endpoints**:
  - `POST /api/chat/summary` - Store chat summaries
  - `GET /api/chat/summaries` - Retrieve chat summaries with filters
- **Data Storage**: All conversations stored in PostgreSQL
- **Admin Dashboard**: View leads at `/admin`

### Admin Dashboard Features
- View all chat conversations
- Filter by lead qualification (Hot/Warm/Cold)
- Filter by date range
- Export to CSV
- Real-time analytics and statistics

## 📊 API Endpoints

### Chat Summary Storage
```http
POST /api/chat/summary
Content-Type: application/json

{
  "interaction_date": "2025-01-15",
  "contact_info": {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-123-4567",
    "company_name": "Tech Startup Inc"
  },
  "chat_summary": "User inquired about AI automation and marketing.",
  "services_discussed": ["AI Automation", "Digital Marketing"],
  "key_pain_points": ["Manual processes", "Lead generation issues"],
  "call_to_action_offered": true,
  "next_step": "Call to action offered",
  "lead_qualification": "Hot"
}
```

### Chat Summary Retrieval
```http
GET /api/chat/summaries?qualification=Hot&page=1&limit=20
```

## 🔐 Security Features

- **CORS Configuration**: Properly configured for your domains
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All chat data validated before storage
- **SQL Injection Protection**: Parameterized queries used throughout
- **Environment Variables**: Sensitive data stored securely

## 📱 Usage

### For Website Visitors
1. Chat button appears in bottom-right corner
2. Click to start conversation with Dave
3. Dave collects information and qualifies leads
4. Encourages scheduling calls or attending events

### For Your Team
1. Access admin dashboard at `https://your-site.com/admin`
2. View all chat conversations and lead analytics
3. Filter and export lead data
4. Follow up with qualified prospects

## 🚀 Deployment Steps

1. **Create PostgreSQL Database** on Render
2. **Deploy Backend Service** with environment variables
3. **Deploy Frontend Static Site** 
4. **Test Chatbot** functionality
5. **Access Admin Dashboard** to verify data storage

## 🔧 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correctly set
- Check database service is running
- Review backend logs for connection errors

### CORS Issues
- Ensure frontend URL is added to CORS configuration
- Check environment variables are properly set

### Chat Data Not Saving
- Verify backend API is accessible
- Check database tables were created successfully
- Review browser console for API errors

## 📈 Monitoring

- **Backend Health**: Check `/health` endpoint
- **Database Status**: Monitor connection pool
- **Chat Analytics**: Use admin dashboard for insights
- **Lead Pipeline**: Track qualification distribution

---

## 🎯 Next Steps After Deployment

1. Test the chatbot on your live site
2. Monitor lead quality and conversation flow
3. Adjust Dave's responses based on user feedback
4. Set up lead follow-up processes
5. Integrate with your CRM system

The chatbot system is now ready for production use on Render! 🚀 