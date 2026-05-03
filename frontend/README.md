# Ethara Frontend

Modern Next.js frontend for the Ethara project management suite. Built with React 19, TypeScript, and Tailwind CSS.

## Features

- ?? Modern, responsive design with Tailwind CSS
- ?? JWT authentication
- ?? Project and task management dashboard
- ? Fast and optimized with Next.js 16
- ?? Mobile-friendly interface
- ?? Ready for production deployment

## Environment Configuration

Create a .env.local file:

``
NEXT_PUBLIC_API_URL=http://localhost:5000
``

For production, create .env.production:

``
NEXT_PUBLIC_API_URL=https://ethara-backend.onrender.com
``

## Local Development

``ash
npm install
npm run dev
``

Frontend runs on http://localhost:3000

Make sure the backend is running on http://localhost:5000

## Deploy on Vercel (Recommended)

1. Push to GitHub
2. Go to [Vercel](https://vercel.com) ? New Project ? Import your repository
3. Set **Framework**: Next.js
4. Set environment variable:
   - NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
5. Click Deploy

Your frontend will be live instantly with automatic deployments on every push.

## Deploy on Render (Alternative)

1. Connect this repo on [Render](https://render.com)
2. **Runtime:** Node
3. **Build command:** 
pm install && npm run build
4. **Start command:** 
pm start
5. **Environment Variables:**
   - NEXT_PUBLIC_API_URL=https://ethara-backend.onrender.com

## Build for Production

``ash
npm run build
npm start
``

## Pages

- / - Landing page with features and call-to-action
- /login - User login
- /register - User registration
- /dashboard - Main dashboard with stats
- /dashboard/projects - Projects management
- /dashboard/tasks - Task management
- /dashboard/settings - Account settings
