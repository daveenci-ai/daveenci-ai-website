import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { workshopRoutes } from './routes/workshop.js';
import { initializeDatabase } from './config/init-db.js';
import { closePool } from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy headers from Render (specific to avoid rate limiting warnings)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - Allow your static site domains
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080', 
    'http://localhost:8081',
    'https://daveenci.ai',
    'https://www.daveenci.ai',
    'https://daveenci.netlify.app',
    'https://daveenci.vercel.app'
  ],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'DaVeenci Server', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/workshop', workshopRoutes);
// Future routes can be added here:
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'DaVeenci Server API',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/api/workshop/register',
      '/api/workshop/info'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server with database initialization
const startServer = async () => {
  try {
    // Initialize database on startup
    if (process.env.DATABASE_URL) {
      console.log('🔗 Initializing database connection...');
      await initializeDatabase();
    } else {
      console.log('⚠️  No DATABASE_URL found - running without database');
    }

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 DaVeenci Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('🔒 HTTP server closed');
        
        // Close database connections
        if (process.env.DATABASE_URL) {
          await closePool();
        }
        
        console.log('👋 Graceful shutdown complete');
        process.exit(0);
      });
    };

    // Listen for shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer(); 