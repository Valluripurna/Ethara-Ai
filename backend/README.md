# Ethara Backend

Express + SQLite API for the project/task manager (REST API with no external database dependencies).

## Features

- ? Lightweight SQLite database
- ? JWT authentication
- ? Project and task management
- ? Team collaboration support
- ? Rate limiting for security
- ? CORS support
- ? Production-ready

## Environment variables

| Variable | Required (production) | Description |
|----------|------------------------|-------------|
| DB_PATH | No | Path to SQLite database file. Defaults to ./ethara.db. On Render: /var/data/ethara.db. |
| JWT_SECRET | Yes | Secret for signing JWTs (long random string, min 32 chars). |
| CLIENT_URL | Yes | Frontend origin(s) for CORS — **no trailing slash**. Use commas for multiple. |
| NODE_ENV | No | Set to production for production deployments. |
| PORT | No | Server port. Defaults to 5000. Set automatically on Render. |

Copy .env.example to .env for local development.

## Local run

``ash
npm install
cp .env.example .env
# Edit .env with a strong JWT_SECRET and CLIENT_URL
npm run dev
``

Server runs on http://localhost:5000

## Deploy on Render

1. Push this repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com): **New** ? **Web Service** ? connect your repo.
3. Configure:
   - **Runtime**: Node
   - **Build Command**: 
pm install
   - **Start Command**: 
pm start
   - **Health check path**: /api/health
4. Set **Environment** variables:
   - JWT_SECRET (strong random string)
   - CLIENT_URL (your frontend URL)
   - DB_PATH (set to /var/data/ethara.db for persistent storage)
   - NODE_ENV=production

**Alternatively**, use the **Blueprint** feature and import ender.yaml, then add secret variables in the UI.

### Persistent Database Storage

For production on Render, the ender.yaml includes a persistent disk mount at /var/data/ethara.db to preserve data between deployments.

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- GET /api/auth/users - List all users

### Projects
- GET /api/projects - List user projects
- POST /api/projects - Create new project
- GET /api/projects/:id - Get project details
- PATCH /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

### Tasks
- GET /api/tasks - List tasks with filters
- POST /api/tasks - Create new task
- GET /api/tasks/:id - Get task details
- PATCH /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

## Rate limiting

- **Auth** (POST /login, /register): Global limit per IP to reduce brute-force attempts.
- **Create/Update**: Burst limits to reduce duplicate submissions and abuse.

## Database Schema

SQLite tables:
- users - User accounts with authentication
- projects - Project records with member lists (stored as JSON)
- 	asks - Tasks linked to projects with assignments
