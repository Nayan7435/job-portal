# JobPortal — Full-Stack MERN Job Portal with AI Resume Analyzer

A production-style job portal connecting recruiters and job seekers, built with the MERN stack. Features role-based authentication, complete job posting/application workflows, and an AI-powered resume analyzer using Llama 3.3 70B via the Groq API.

**🔗 Live Demo:** [job-portal-dev-5.vercel.app](https://job-portal-dev-5.vercel.app/)

> Note: Backend is hosted on Render's free tier, so the first request after inactivity may take a few seconds to respond (cold start).

---

## Features

- **Role-based Authentication** — JWT-based auth with separate Recruiter and Job Seeker roles, each with distinct permissions
- **Job Management** — Recruiters can post jobs; job seekers can browse and apply with a single click
- **AI Resume Analyzer** — Paste a resume and job description to get an instant AI-generated match score, identified strengths, missing skills, and improvement suggestions
- **Protected Routes** — Both frontend (React Router guards) and backend (middleware) enforce role-based access control
- **Secure Password Storage** — Passwords hashed with bcrypt before being stored
- **Responsive UI** — Custom design system with a consistent visual identity across all pages

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Context API for global auth state

**Backend**
- Node.js / Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing

**AI Integration**
- Groq API (Llama 3.3 70B) for resume-to-job-description matching

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Architecture

```
job-portal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/          # Route-level components (Home, Jobs, Login, etc.)
│   │   ├── components/     # Reusable UI (Navbar, Spinner, ProtectedRoute)
│   │   ├── context/        # Auth context, provider, and hook
│   │   └── utils/          # Axios instance with auth interceptor
│   └── ...
└── server/                 # Express backend
    ├── controllers/        # Business logic (auth, jobs, AI analysis)
    ├── models/             # Mongoose schemas (User, Job)
    ├── routes/             # API route definitions
    ├── middleware/         # JWT verification, role-based authorization
    └── config/             # Database connection
```

---

## Core Flows

**Authentication**
- Signup/login issues a JWT (7-day expiry)
- Passwords are hashed via a Mongoose `pre('save')` hook before persistence
- Token is attached to every API request automatically via an Axios interceptor

**Job Posting & Applications**
- Only authenticated users with the `recruiter` role can create jobs
- Only authenticated users with the `jobseeker` role can apply
- Applications are tracked via a referenced array on the Job model, with duplicate-apply prevention

**AI Resume Analysis**
- User submits resume text and a target job description
- Backend constructs a structured prompt and sends it to Groq's Llama 3.3 70B model
- Response is parsed into a structured JSON object: match score, strengths, missing skills, and suggestions

---

## Running Locally

### Prerequisites
- Node.js
- MongoDB Atlas account (or local MongoDB)
- Groq API key ([console.groq.com/keys](https://console.groq.com/keys))

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `client/`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/signup` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Authenticate and receive JWT |
| GET | `/api/jobs/get-all-jobs` | Public | List all job postings |
| GET | `/api/jobs/get-job-id/:id` | Public | Get a single job's details |
| POST | `/api/jobs/create-job` | Recruiter only | Post a new job |
| POST | `/api/jobs/apply-job/:id` | Job Seeker only | Apply to a job |
| POST | `/api/ai/analyze-resume` | Authenticated | AI-powered resume vs. job description analysis |

---

## Author

**Nayan Gohel**
Final-year B.Tech Computer Engineering student
[GitHub](https://github.com/Nayan7435) • [Portfolio](https://nayangohel.vercel.app)
