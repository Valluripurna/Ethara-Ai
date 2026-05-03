# Ethara Deployment Verification Checklist

Use this checklist to verify the MongoDB-based deployment before going live.

## Local Backend
- [ ] Create `backend/.env` from `backend/.env.example`
- [ ] Set `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL`
- [ ] Run `npm install` in `backend`
- [ ] Run `npm run dev` in `backend`
- [ ] Confirm `/api/health` responds successfully

## Local Frontend
- [ ] Run `npm install` in `frontend`
- [ ] Set `NEXT_PUBLIC_API_URL` for local testing if needed
- [ ] Run `npm run dev` in `frontend`
- [ ] Confirm the app loads without console errors

## Render Backend
- [ ] Create a Web Service on Render
- [ ] Set root directory to `backend`
- [ ] Set `NODE_ENV=production`
- [ ] Set `MONGO_URI` to the MongoDB Atlas connection string
- [ ] Set `JWT_SECRET` to a strong random value
- [ ] Set `CLIENT_URL` to the Vercel frontend URL
- [ ] Deploy and confirm `/api/health` works

## Vercel Frontend
- [ ] Import the GitHub repo into Vercel
- [ ] Set root directory to `frontend`
- [ ] Set `NEXT_PUBLIC_API_URL` to the Render backend URL
- [ ] Deploy and confirm the app loads

## Final Validation
- [ ] Register and log in successfully
- [ ] Create a project
- [ ] Create a task
- [ ] Verify cross-origin requests work correctly
