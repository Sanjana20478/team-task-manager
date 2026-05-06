# TeamTask Manager

TeamTask Manager is a React and Express task-management workspace with a polished dashboard, project tracking, task boards, team capacity views, JWT authentication routes, and MongoDB-backed project/task APIs.

## Deployment Ready

This repository includes a `vercel.json` file so Vercel can deploy both parts of the app:

- `frontend/` builds as the React static site.
- `backend/server.js` runs as the serverless API.
- `/api/*` requests are routed to the backend.
- All other routes serve the React frontend.

## Vercel Environment Variables

Add these in Vercel under **Project Settings > Environment Variables**:

```text
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/team_task_manager?retryWrites=true&w=majority
JWT_SECRET=use_a_long_random_secret_value
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

Use MongoDB Atlas for `MONGO_URI`; Vercel cannot connect to a local MongoDB database like `mongodb://127.0.0.1:27017`.

## Local Development

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
npm --prefix frontend install
```

Run the frontend:

```bash
npm run dev:frontend
```

Run the backend:

```bash
npm run dev:backend
```

The frontend opens at:

```text
http://localhost:3000
```

The API runs at:

```text
http://localhost:5000/api
```

## Verification

Before deploying, run:

```bash
npm test
npm run build
```

After deployment, check:

```text
https://your-vercel-app.vercel.app/api/health
```

It should return a JSON response with `status: "ok"`.
