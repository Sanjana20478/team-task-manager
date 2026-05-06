
# TeamTask Manager Frontend

TeamTask Manager is a polished React dashboard for planning projects, assigning work, and keeping a team aligned from one clear workspace. The interface is designed to feel like a real productivity product: focused, responsive, easy to scan, and impressive from the first screen.

## Highlights

- Sticky navigation that stays available while moving through the dashboard.
- Project health section with owners, status labels, and progress indicators.
- Live task board with To do, In progress, and Done columns.
- Working "Create project" and "New task" actions with clean modal forms.
- Real-time local UI updates when a project or task is added.
- Team capacity panel for quick workload visibility.
- Responsive layout for desktop, tablet, and mobile screens.

## Product Experience

The dashboard gives users a fast overview of:

- How many projects are active.
- How much task work has been completed.
- Which tasks still need attention.
- Which projects are on track, under review, or at risk.
- Who is available across the team.

It is intentionally more than a static landing page. The primary screen is the working app experience, so users can immediately create projects, add tasks, and see the board update.

## Tech Stack

- React
- Create React App
- CSS3 with responsive layouts
- React Testing Library

The full project also includes an Express, MongoDB, JWT, and Mongoose backend in the parent `backend` folder.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm start
```

Open the app:

```text
http://localhost:3000
```

Run tests:

```bash
npm test -- --watchAll=false
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
frontend/
  public/
    index.html
  src/
    App.js        # Main dashboard experience and interactive forms
    App.css       # Visual design, layout, responsive styling, modal styles
    App.test.js   # Smoke test for the dashboard
    index.js      # React entry point
    index.css     # Global base styles
```

## Key Screens

- Hero workspace overview
- Delivery pulse summary
- Workspace statistics
- Priority project workstreams
- Team capacity panel
- Interactive task board
- Project creation modal
- Task creation modal

## Current Behavior

The frontend currently stores newly created projects and tasks in React state. This makes the dashboard feel interactive immediately while keeping the UI fast and easy to demo.

The backend already exposes API routes for authentication, projects, and tasks, so a strong next step would be connecting these UI actions to real API calls and MongoDB persistence.

## Future Enhancements

- Connect login and signup flows to the backend auth API.
- Persist projects and tasks through the Express API.
- Add edit, delete, and status-change actions for tasks.
- Add assignee selection from real project members.
- Show dashboard analytics from live backend data.
- Add loading, empty, and error states for production readiness.

## Quality Checks

Before sharing or deploying, run:

```bash
npm test -- --watchAll=false
npm run build
```

Both commands should pass successfully.
