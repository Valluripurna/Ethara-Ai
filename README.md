# Ethara - Project Management Suite

A modern, lightweight project and task management application built with Next.js and Express.

## 🎯 Features

### Dashboard & Analytics
- Real-time project overview
- Task statistics and progress tracking
- User collaborative workspace

### Project Management
- Create and organize projects
- Add team members to projects
- Update project details and descriptions

### Task Management
- Create tasks with priority levels (low, medium, high)
- Set due dates and deadlines
- Assign tasks to team members
- Track task status (todo, in-progress, completed)
- Add detailed descriptions

### Team Collaboration
- User authentication and authorization
- Role-based access control (admin, member)
- Share projects with team members
- Real-time updates

### Modern Design
- Clean, professional UI with Tailwind CSS
- Responsive design for mobile and desktop
- Modern color scheme (Indigo, Cyan, Gray)
- Smooth animations and transitions
- Professional typography with Poppins and Inter fonts

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (lightweight, no setup required)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Security**: bcryptjs, rate limiting

### Frontend
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Runtime**: React 19

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with:
# JWT_SECRET=your-secret-key-here-min-32-chars
# CLIENT_URL=http://localhost:3000

npm run dev
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

## 📚 Documentation

- [Backend README](./backend/README.md) - API documentation and deployment
- [Frontend README](./frontend/README.md) - Frontend setup and Vercel deployment
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Complete production deployment instructions

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `GET /api/auth/users` - Get all users

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - List all tasks with filters
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

See [Backend README](./backend/README.md) for detailed API documentation.

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Tertiary**: Cyan (#06b6d4)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Headings**: Poppins
- **Body**: Inter
- **Monospace**: Cascadia Code

### Components
- Buttons (primary, secondary)
- Cards with shadow effects
- Forms with validation
- Navigation & sidebar
- Status badges
- Priority indicators

## 🔐 Security Features

- **Authentication**: JWT-based authentication
- **Password**: Bcrypt hashing with salt
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured for production
- **Input Validation**: Zod schema validation
- **Environmental Secrets**: JWT_SECRET managed securely

## 📦 Deployment

### Quick Deploy to Render (Backend)
1. Push to GitHub
2. Connect on Render
3. Set environment variables
4. Deploy

### Quick Deploy to Vercel (Frontend)
1. Push to GitHub
2. Connect on Vercel
3. Set `NEXT_PUBLIC_API_URL`
4. Deploy automatically

See [Deployment Guide](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🛠️ Development

### Database
- SQLite automatically creates and initializes on first run
- Tables: users, projects, tasks
- Persistent storage on production (Render)

### Project Structure
```
task/
├── backend/
│   ├── src/
│   │   ├── app.js           # Express app configuration
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   └── routes/          # API routes
│   ├── server.js            # Server entry point
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── dashboard/       # Protected routes
│   ├── package.json
│   └── next.config.ts
└── DEPLOYMENT_GUIDE.md
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check documentation in the README files
- Review the Deployment Guide for common issues

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/)

---

**Made with ❤️ for teams that want to get things done.**
