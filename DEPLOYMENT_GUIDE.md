# Ethara Deployment Guide

This guide covers deploying Ethara with:
- Backend: Render + MongoDB Atlas
- Frontend: Vercel

## 1. Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Allow network access.
4. Copy the connection string for `MONGO_URI`.

## 2. Deploy Backend on Render

1. Open Render and create a new Web Service.
2. Connect the GitHub repo `Valluripurna/Ethara-Ai`.
3. Set the root directory to `backend`.
4. Use these settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
5. Add environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=<your Atlas connection string>`
   - `JWT_SECRET=<strong random secret>`
   - `CLIENT_URL=<your frontend URL after Vercel deploy>`
6. Deploy the service.

## 3. Deploy Frontend on Vercel

1. Open Vercel and import the same GitHub repo.
2. Set the root directory to `frontend`.
3. Add this environment variable:
   - `NEXT_PUBLIC_API_URL=<your Render backend URL>`
4. Deploy the frontend.

## 4. Connect Frontend Back to Backend

1. Copy the Vercel frontend URL.
2. Go back to Render and update `CLIENT_URL` to that URL.
3. Redeploy the backend.

## 5. Verify

1. Open `https://<your-backend-url>/api/health`.
2. Open the frontend URL.
3. Register a user and log in.
4. Create a project and task.

## Important Notes

- Do not set `DB_PATH` or disk settings anymore.
- The backend now uses MongoDB, not SQLite.
- Render free service is enough for the app itself; MongoDB Atlas can be free too.
- Keep URLs without trailing slashes.
https://ethara-backend-7ihs.onrender.com/api/health