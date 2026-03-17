# Phishing URL Detector

A full-stack web application that detects phishing URLs using a rule based system. It is built with React for the frontend and Node.js + Express for the backend.

## Features
- Input any URL and get a score and status: Safe, Suspicious, Likely Phishing
- Dynamic color coded display
- Shows reasons why a URL is flagged
- Real-time response via REST API

## Technologies Used
- Frontend: React, Vite
- Backend: Node.js, Express, CORS
- Deployment: Vercel (frontend), Render/Railway (backend)

### Backend
```bash
cd backend
npm install
node server.js