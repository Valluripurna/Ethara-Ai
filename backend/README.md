# Ethara Backend

Express + MongoDB API for the task and project manager.

## Environment variables

| Variable | Required (production) | Description |
|----------|------------------------|-------------|
| MONGO_URI | Yes | MongoDB Atlas connection string. |
| JWT_SECRET | Yes | Secret for signing JWTs. |
| CLIENT_URL | Yes | Frontend origin for CORS, no trailing slash. |
| PORT | No | Server port. Render sets this automatically. |

Copy .env.example to .env for local development.

## Local run

```bash
npm install
cp .env.example .env
# Set MONGO_URI and JWT_SECRET in .env
npm run dev
```

## Deploy on Render

1. Push this repository to GitHub.
2. Create a new Web Service in Render.
3. Set the root directory to backend.
4. Configure:
   - Build Command: npm install
   - Start Command: npm start
   - Health Check Path: /api/health
5. Add environment variables:
   - MONGO_URI
   - JWT_SECRET
   - CLIENT_URL
   - NODE_ENV=production

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Allow access from Render if needed.
4. Copy the connection string into MONGO_URI.

## API endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/auth/users
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PATCH /api/projects/:id
- DELETE /api/projects/:id
- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks/:id
- DELETE /api/tasks/:id

## Notes

- The backend no longer uses SQLite or Render disks.
- The backend now uses MongoDB Atlas.
- For the frontend, set NEXT_PUBLIC_API_URL to your Render backend URL.
