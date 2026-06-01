# Team Task Manager

A full-stack task and project management application with user authentication, project collaboration, task tracking, and dashboard statistics.

## Overview

This repository contains two separate applications:

- `backend/` — Node.js + Express API with MySQL database integration.
- `frontend/` — React + Vite UI with Tailwind CSS and Redux Toolkit.

## Key Features

- User registration and login
- JWT-based authentication
- Project creation, management, and member assignment
- Task creation, updating, status tracking, and filtering
- Dashboard summaries for tasks and project activity
- Role-based access control and protected routes

## Tech Stack

- Backend:
  - Node.js
  - Express
  - MySQL (`mysql2`)
  - JWT authentication
  - `bcryptjs` password hashing
  - `express-validator` input validation
- Frontend:
  - React
  - Vite
  - Tailwind CSS
  - Redux Toolkit
  - React Router
  - Axios

## Setup

### 1. Backend

```powershell
cd "c:\Users\Dell\Downloads\Team Task Manager\backend"
npm install
```

Create a `.env` file in `backend/` with values similar to:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=team_task_manager
DB_SSL=false
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Then start the backend:

```powershell
npm run dev
```

### 2. Frontend

```powershell
cd "c:\Users\Dell\Downloads\Team Task Manager\frontend"
npm install
```

Create a `.env` file in `frontend/` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Then start the frontend:

```powershell
npm run dev
```

## Available Scripts

### Backend

- `npm start` — Run the server with Node.js.
- `npm run dev` — Run the server with Nodemon for development.

### Frontend

- `npm run dev` — Start the Vite development server.
- `npm run build` — Build the production assets.
- `npm run preview` — Preview the production build.
- `npm run lint` — Run ESLint.

## Environment Variables

### Backend

- `PORT` — optional server port (default: `5000`).
- `DB_HOST` — MySQL host.
- `DB_PORT` — MySQL port.
- `DB_USER` — MySQL username.
- `DB_PASSWORD` — MySQL password.
- `DB_NAME` — MySQL database name.
- `DB_SSL` — set to `true` when using SSL/TLS for the database.
- `JWT_SECRET` — secret key for signing JWT tokens.
- `CLIENT_URL` — comma-separated allowed frontend origins for CORS.

### Frontend

- `VITE_API_URL` — Base URL for backend API requests.

## API Routes

- `GET /api/health` — Basic health check.
- `POST /api/auth/register` — Register a new user.
- `POST /api/auth/login` — Login and receive a JWT.
- `GET /api/projects` — List projects.
- `POST /api/projects` — Create a new project.
- `GET /api/projects/:id` — Get project details.
- `PUT /api/projects/:id` — Update a project.
- `DELETE /api/projects/:id` — Delete a project.
- `GET /api/tasks` — List tasks.
- `POST /api/tasks` — Create a task.
- `PUT /api/tasks/:id` — Update a task.
- `DELETE /api/tasks/:id` — Delete a task.
- `GET /api/dashboard` — Fetch dashboard stats.
- `GET /api/users` — List users.

> Note: Most API routes require an authenticated JWT token.

## Project Structure

- `backend/`
  - `server.js` — server startup and database initialization.
  - `app.js` — Express app configuration and routes.
  - `src/config` — database and initialization code.
  - `src/controllers` — request handlers.
  - `src/routes` — route definitions.
  - `src/models` — data models.
  - `src/middleware` — auth, validation, and role checks.
  - `src/utils` — helpers for JWT, hashing, and responses.
- `frontend/`
  - `src/App.jsx` — main route layout with protected routes.
  - `src/api` — Axios API client and endpoint wrappers.
  - `src/components` — UI components.
  - `src/features` — Redux slices.
  - `src/hooks` — custom hooks.
  - `src/pages` — application pages.
  - `src/utils` — utility functions.

## Notes

- Ensure MySQL is running and the database credentials in `.env` are correct.
- The backend initializes database tables automatically on startup.
- The frontend stores the JWT token in `localStorage` and sends it with API requests.

## License

This project is provided as-is without a license specified.
