import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all routes that don't match static files
app.get('*', (req, res) => {
  // Check if the file exists in the dist directory
  const filePath = path.join(__dirname, 'dist', req.path);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    // File exists, serve it
    res.sendFile(filePath);
  } else {
    // File doesn't exist, serve index.html for SPA routing
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 