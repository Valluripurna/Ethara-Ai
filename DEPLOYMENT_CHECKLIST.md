# Ethara Deployment Verification Checklist

Use this checklist to verify your deployments are working correctly before going live.

## Pre-Deployment (Local Testing)

### Backend
- [ ] Run `npm install` in backend folder
- [ ] Create `.env` from `.env.example`
- [ ] Set `JWT_SECRET` to a strong random string (min 32 chars)
- [ ] Set `CLIENT_URL=http://localhost:3000`
- [ ] Run `npm run dev`
- [ ] Backend starts on `http://localhost:5000`
- [ ] Health check passes: `curl http://localhost:5000/api/health`

### Frontend
- [ ] Run `npm install` in frontend folder
- [ ] `.env.local` already has `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] Run `npm run dev`
- [ ] Frontend loads on `http://localhost:3000`
- [ ] No console errors about API connectivity

### Local Integration
- [ ] Can navigate to login page
- [ ] Can navigate to register page
- [ ] Can attempt registration (will fail without backend)
- [ ] Backend is responding to requests

---

## Backend Deployment (Render)

### Initial Setup
- [ ] Created Web Service on Render
- [ ] Connected GitHub repository
- [ ] Service name: `ethara-backend`
- [ ] Runtime: Node
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Health Check Path: `/api/health`

### Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET` set to strong random string
- [ ] `CLIENT_URL` ready (will update after frontend deployed)
- [ ] `DB_PATH=/var/data/ethara.db`
- [ ] `PORT=10000` (or auto-assigned)

### Persistent Disk
- [ ] Persistent disk added for database
- [ ] Disk name: `ethara-db`
- [ ] Mount path: `/var/data`
- [ ] Disk status: Active

### Validation Checks
- [ ] Service deployed successfully
- [ ] Service shows "Live" status
- [ ] Check service logs for errors
- [ ] Health check endpoint works: `https://your-backend-url/api/health`
- [ ] No 404 or 500 errors in logs

### Database Verification
- [ ] Tables created on first run
- [ ] Can view database file in `/var/data/ethara.db`
- [ ] Database persists across service restarts

---

## Frontend Deployment (Vercel)

### Initial Setup
- [ ] Project imported to Vercel
- [ ] Framework: Next.js (auto-detected)
- [ ] Build verified successfully
- [ ] No build errors in Vercel logs

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` set to backend Render URL
- [ ] URL format: `https://your-backend-url` (no trailing slash)
- [ ] No `http://localhost` in production config

### Deployment Validation
- [ ] Frontend deployed successfully
- [ ] Vercel shows deployment as "Ready"
- [ ] Accessing frontend URL loads page
- [ ] No SSL/TLS certificate errors

### Post-Deployment Testing
- [ ] Home page loads and displays correctly
- [ ] Navigation menu shows all links
- [ ] Login page accessible
- [ ] Register page accessible
- [ ] Can see "Get Started" and "Sign In" buttons on home page

---

## Backend Configuration Update

After frontend is deployed:

- [ ] Copy frontend URL from Vercel
- [ ] Go to Render backend service settings
- [ ] Update `CLIENT_URL` environment variable to frontend URL
- [ ] Redeploy backend service
- [ ] Backend service rebuilt and redeployed
- [ ] Check new health endpoint returns 200

---

## Integration Testing (Post-Deployment)

### Authentication Flow
- [ ] Can navigate to register page
- [ ] Can submit registration form
- [ ] Submission sends request to backend (check Network tab)
- [ ] Success message or error displays appropriately
- [ ] Token stored in localStorage
- [ ] Can navigate to login page
- [ ] Can submit login form with valid credentials
- [ ] Redirects to dashboard on successful login
- [ ] Can view user profile in top right

### Dashboard
- [ ] Dashboard loads after login
- [ ] Stats cards display (0 values initially acceptable)
- [ ] Quick action buttons present
- [ ] Sidebar navigation works

### Project Management
- [ ] Can click "New Project" button
- [ ] Create project dialog opens
- [ ] Can enter project name and description
- [ ] Form submission works
- [ ] New project appears in list
- [ ] Can navigate to projects list from sidebar
- [ ] Projects display in grid/list format

### Task Management
- [ ] Can navigate to tasks page
- [ ] Filter buttons present (All, Todo, In Progress, Completed)
- [ ] Filters work without errors

### Settings Page
- [ ] Can access settings from sidebar
- [ ] User name displays correctly
- [ ] User email displays correctly
- [ ] User role displays correctly
- [ ] Logout button present and functional

### Error Handling
- [ ] Wrong login credentials show error message
- [ ] Form validation errors display
- [ ] API errors don't crash the page
- [ ] Network errors handled gracefully

---

## Performance Checks

### Load Times
- [ ] Home page loads in < 3 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] No layout shift after load

### Network
- [ ] API responses in < 1 second
- [ ] No failed requests to API
- [ ] CORS headers present in responses

### Security
- [ ] No sensitive data in localStorage (except token)
- [ ] Token sent in Authorization header
- [ ] HTTPS in use for all URLs
- [ ] No mixed content warnings

---

## Browser Compatibility

Test in major browsers:

- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac/iOS)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Monitoring & Logs

### Render Backend Logs
- [ ] No error messages
- [ ] No WARN messages (except expected ones)
- [ ] Database connection successful
- [ ] Server listening on correct port

### Vercel Frontend Logs
- [ ] Build completed successfully
- [ ] No deployment errors
- [ ] No runtime errors in logs

---

## Go-Live Checklist

- [ ] All above items checked
- [ ] Team has been notified of live URLs
- [ ] Database is backed up (optional but recommended)
- [ ] Support team has access to logs/dashboards
- [ ] Documentation updated with live URLs
- [ ] Team can log in and access features

---

## Post-Launch (Next 24 Hours)

- [ ] Monitor error rates in logs
- [ ] Check for unexpected traffic patterns
- [ ] Verify database growth is normal
- [ ] Test with actual users
- [ ] Collect feedback on UI/UX
- [ ] Fix any critical bugs immediately
- [ ] Document any issues for future improvements

---

## Troubleshooting Reference

### Backend Issues

**Service won't build:**
- Check `npm install` completes without errors
- Verify `package.json` syntax is valid
- Check Node version compatibility (18+)

**Service crashes on start:**
- Check logs for error messages
- Verify environment variables are set
- Ensure database path is writable

**No database access:**
- Verify persistent disk is enabled
- Check `/var/data` mount path exists
- Ensure database file has correct permissions

### Frontend Issues

**Vercel build fails:**
- Check TypeScript errors: `npm run build` locally
- Verify `next.config.ts` is valid
- Ensure all dependencies are in package.json

**Can't connect to backend:**
- Verify `NEXT_PUBLIC_API_URL` is set and correct
- Check no `http://localhost` in production
- Ensure backend CORS allows frontend origin
- Check Network tab for actual request URL

**Styling looks different:**
- Clear Vercel cache and redeploy
- Ensure Tailwind CSS is properly configured
- Check `globals.css` is imported in layout

---

## Success Criteria

✅ **Your deployment is successful when:**

1. Home page loads without errors
2. Can register a new account
3. Can log in with the new account
4. Dashboard displays user information
5. Can create a new project
6. Can see the created project in the projects list
7. Can create a task in a project
8. Can see the task in the tasks list
9. All navigation works smoothly
10. No console errors in browser
11. No server errors in Render logs

---

## Next Steps

After successful deployment:

1. Share live URLs with team
2. Gather feedback from initial users
3. Plan UI/UX improvements
4. Consider adding project features:
   - Project member invitations
   - Real-time task updates
   - File attachments
   - Email notifications
5. Set up database backups
6. Monitor platform metrics
