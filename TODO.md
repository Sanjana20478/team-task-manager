# Team Task Manager — Implementation TODO

## Backend (MongoDB + Mongoose)
- [ ] Create `backend/` folder scaffolding
- [ ] Add `backend/server.js`
- [ ] Add `backend/config/db.js`
- [ ] Add models: `User`, `Project`, `Task`
- [ ] Add middleware: `auth.middleware.js`, `rbac.middleware.js`, `error.middleware.js`
- [ ] Add routes: `auth.routes.js`, `project.routes.js`, `task.routes.js`
- [ ] Implement REST endpoints:
  - [ ] `POST /api/auth/signup`
  - [ ] `POST /api/auth/login`
  - [ ] `POST /api/projects`
  - [ ] `GET /api/projects`
  - [ ] `POST /api/projects/:projectId/members` (ADMIN-only)
  - [ ] `POST /api/projects/:projectId/tasks`
  - [ ] `GET /api/projects/:projectId/tasks`
  - [ ] `PATCH /api/projects/:projectId/tasks/:taskId`
  - [ ] `GET /api/dashboard` (overdue + status summary)
- [ ] Validate relationships + enforce RBAC (Admin/Member)

## Frontend (React)
- [ ] Replace CRA starter `frontend/src/App.js` with router
- [ ] Add pages: Login, Signup, Dashboard, Projects, ProjectDetail
- [ ] Add API client (axios) + auth token handling
- [ ] Implement CRUD UI for tasks + status updates
- [ ] Enforce role-based access in UI (plus backend enforcement)

## Local Dev
- [ ] Add root-level `.env` / backend env example (`backend/.env.example`)
- [ ] Run backend + frontend locally
- [ ] Smoke test flows: signup/login, create project, add member (admin), create/assign/update tasks

## Deployment (Railway)
- [ ] Add Railway-ready start config (`Procfile`)
- [ ] Ensure CORS + env vars are correct for production
- [ ] Provide deploy steps (backend first, then frontend or merged)

