# Ethara - Deployment Guide

This guide covers deploying Ethara to production using:
- **Backend**: Render (with SQLite)
- **Frontend**: Vercel (recommended) or Render

## Backend Deployment (Render)

### Prerequisites
- GitHub account with your repository
- Render account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Remove chat, migrate to SQLite, update design"
   git push origin main
   ```

2. **Deploy on Render**
   - Sign in to [render.com](https://dashboard.render.com)
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Select `backend` folder as root directory

3. **Configure Service**
   - **Name**: ethara-backend
   - **Region**: Oregon (or nearest to you)
   - **Plan**: Free (or Starter)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`

4. **Set Environment Variables**
   In the Render dashboard, go to Environment and add:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: Generate a strong random string (min 32 chars)
   - `CLIENT_URL`: Will update after frontend is deployed
   - `DB_PATH`: `/var/data/ethara.db` (automatic with persistent disk)

5. **Enable Persistent Disk** (for database)
   - On the service page, go to Disks
   - Add Disk: `ethara-db` → Mount Path: `/var/data`
   - Costs $7/month on Starter plan

6. **Note Your Backend URL**
   - Copy your service URL (e.g., `https://ethara-backend-xxxx.onrender.com`)
   - You'll need this for the frontend

### Database

The SQLite database automatically creates on first run at `/var/data/ethara.db`. All data persists across deployments thanks to the persistent disk.

## Frontend Deployment (Vercel - Recommended)

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier available)

### Steps

1. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Select the `frontend` folder as root directory

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   - `NEXT_PUBLIC_API_URL`: `https://ethara-backend-xxxx.onrender.com`
     (Replace with your actual backend URL from Render)

4. **Deploy**
   - Click Deploy
   - Vercel automatically builds and deploys
   - Your frontend URL appears in the dashboard

5. **Update Backend Configuration**
   - Go back to Render backend service settings
   - Update `CLIENT_URL` environment variable to your Vercel frontend URL
   - Redeploy backend service

## Frontend Deployment (Render - Alternative)

If you prefer to keep everything on Render:

1. **Deploy on Render**
   - New → Web Service
   - Connect GitHub repo
   - Select `frontend` folder

2. **Configure**
   - **Runtime**: Node
   - **Build**: `npm install && npm run build`
   - **Start**: `npm start`

3. **Environment Variables**
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL

4. **Update Backend**
   - Add frontend URL to backend's `CLIENT_URL`

## Verification Checklist

After deployment:

- [ ] Backend service is running (check health at `/api/health`)
- [ ] Frontend loads successfully
- [ ] Login/Register pages are accessible
- [ ] Can create account and log in
- [ ] Can view dashboard
- [ ] Can create projects
- [ ] Can create tasks
- [ ] Environment variables are correctly set

## Troubleshooting

### Backend won't start
- Check that `JWT_SECRET` is set (min 32 characters)
- Verify `DB_PATH` is set to `/var/data/ethara.db`
- Check logs for specific errors

### CORS errors on frontend
- Ensure `CLIENT_URL` on backend includes your frontend URL
- No trailing slashes in URLs
- Restart backend service after updating `CLIENT_URL`

### Database not persisting
- Verify persistent disk is enabled on Render
- Check `/var/data/ethara.db` exists in service logs

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct (no trailing slash)
- Ensure backend service is running
- Check browser console for specific error messages

## Scaling Notes

### For Free Tier Users
- Services may go to sleep after 15 minutes of inactivity
- Database persists even when service is sleeping
- On paid plans, services stay active 24/7

### For Production Use
- Upgrade to Starter or Pro plans for guaranteed uptime
- Add error tracking (e.g., Sentry)
- Set up monitoring and alerts
- Regular backups of database (manual export recommended)

## Database Management

### Local Backup
```bash
# Export data from production SQLite
sqlite3 ethara.db ".dump" > backup.sql

# Restore to different database
sqlite3 new_ethara.db < backup.sql
```

### Database Growth
SQLite is suitable for:
- Small to medium projects
- Teams < 100 users
- < 10,000 records

For larger deployments, consider upgrading to PostgreSQL on Render.

## Next Steps

1. Customize branding and colors in `frontend/app/globals.css`
2. Add email notifications (integrate SendGrid/Mailgun)
3. Add file upload support for task attachments
4. Implement advanced filtering and search
5. Add project analytics and reporting
