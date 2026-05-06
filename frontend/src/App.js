import { useMemo, useState } from 'react';
import './App.css';

const initialProjects = [
  { name: 'Mobile app launch', owner: 'Sanjana', progress: 78, status: 'On track' },
  { name: 'Client dashboard', owner: 'Design Team', progress: 62, status: 'Review' },
  { name: 'API cleanup', owner: 'Backend', progress: 44, status: 'At risk' }
];

const initialTasks = {
  todo: [
    { title: 'Finalize sprint goals', meta: 'Today - Admin' },
    { title: 'Invite client reviewers', meta: 'Tomorrow - Member' }
  ],
  progress: [
    { title: 'Wire project analytics', meta: 'Due Fri - Backend' },
    { title: 'Polish task board states', meta: 'Due Mon - Frontend' }
  ],
  done: [
    { title: 'Create auth routes', meta: 'Completed - API' },
    { title: 'Define project roles', meta: 'Completed - RBAC' }
  ]
};

const team = [
  { initials: 'SD', name: 'Sanjana', role: 'Project Lead', load: '72%' },
  { initials: 'AK', name: 'Aarav', role: 'Frontend', load: '64%' },
  { initials: 'MR', name: 'Mira', role: 'Backend', load: '81%' },
  { initials: 'TV', name: 'Tara', role: 'QA', load: '58%' }
];

const emptyProject = {
  name: '',
  owner: '',
  status: 'On track',
  progress: 25
};

const emptyTask = {
  title: '',
  owner: '',
  due: 'Today',
  column: 'todo'
};

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [activeForm, setActiveForm] = useState(null);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [taskForm, setTaskForm] = useState(emptyTask);

  const stats = useMemo(() => {
    const allTasks = Object.values(tasks).flat();
    const completed = tasks.done.length;
    const completionRate = allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0;

    return [
      { label: 'Active projects', value: String(projects.length).padStart(2, '0'), trend: '+1 ready to plan' },
      { label: 'Tasks completed', value: `${completionRate}%`, trend: `${completed} finished items` },
      { label: 'Open tasks', value: String(tasks.todo.length + tasks.progress.length).padStart(2, '0'), trend: 'Across the board' },
      { label: 'Team focus', value: '91%', trend: 'High momentum' }
    ];
  }, [projects.length, tasks]);

  const openProjectForm = () => {
    setProjectForm(emptyProject);
    setActiveForm('project');
  };

  const openTaskForm = () => {
    setTaskForm(emptyTask);
    setActiveForm('task');
  };

  const closeForm = () => {
    setActiveForm(null);
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();

    const name = projectForm.name.trim();
    const owner = projectForm.owner.trim() || 'Unassigned';
    if (!name) return;

    setProjects((currentProjects) => [
      { ...projectForm, name, owner, progress: Number(projectForm.progress) },
      ...currentProjects
    ]);
    closeForm();
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    const title = taskForm.title.trim();
    const owner = taskForm.owner.trim() || 'Team';
    if (!title) return;

    const metaPrefix = taskForm.column === 'done' ? 'Completed' : taskForm.due.trim() || 'Today';
    const newTask = { title, meta: `${metaPrefix} - ${owner}` };

    setTasks((currentTasks) => ({
      ...currentTasks,
      [taskForm.column]: [newTask, ...currentTasks[taskForm.column]]
    }));
    closeForm();
  };

  return (
    <main className="app-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/">
          <span className="brand-mark">TT</span>
          <span>
            <strong>TeamTask</strong>
            <small>Manager</small>
          </span>
        </a>

        <div className="nav-actions">
          <a href="#projects">Projects</a>
          <a href="#tasks">Tasks</a>
          <a href="#team">Team</a>
          <button type="button" onClick={openTaskForm}>New task</button>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Smart collaboration workspace</p>
          <h1 id="hero-title">Plan, assign, and deliver team work with confidence.</h1>
          <p>
            A crisp command center for tracking projects, owners, due dates, and team momentum
            without losing sight of what needs attention next.
          </p>

          <div className="hero-actions">
            <button type="button" onClick={openProjectForm}>Create project</button>
            <a href="#tasks">View board</a>
          </div>
        </div>

        <div className="hero-panel" aria-label="Current delivery summary">
          <div className="panel-header">
            <span>Delivery pulse</span>
            <strong>May sprint</strong>
          </div>

          <div className="pulse-chart" aria-hidden="true">
            <span style={{ height: '42%' }} />
            <span style={{ height: '64%' }} />
            <span style={{ height: '58%' }} />
            <span style={{ height: '82%' }} />
            <span style={{ height: '74%' }} />
            <span style={{ height: '90%' }} />
            <span style={{ height: '68%' }} />
          </div>

          <div className="panel-footer">
            <div>
              <small>Next milestone</small>
              <strong>Client preview</strong>
            </div>
            <div>
              <small>Due</small>
              <strong>Friday</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Workspace statistics">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.trend}</small>
          </article>
        ))}
      </section>

      <section className="workspace-grid">
        <div className="project-section" id="projects">
          <div className="section-heading with-action">
            <div>
              <p className="eyebrow">Project health</p>
              <h2>Priority workstreams</h2>
            </div>
            <button type="button" onClick={openProjectForm}>Add project</button>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={`${project.name}-${project.owner}`}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.owner}</p>
                </div>
                <div className="progress-wrap" aria-label={`${project.name} ${project.progress}% complete`}>
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <strong className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </strong>
              </article>
            ))}
          </div>
        </div>

        <aside className="team-panel" id="team" aria-labelledby="team-heading">
          <div className="section-heading">
            <p className="eyebrow">Team load</p>
            <h2 id="team-heading">Available capacity</h2>
          </div>

          <div className="team-list">
            {team.map((member) => (
              <div className="team-member" key={member.name}>
                <span>{member.initials}</span>
                <div>
                  <strong>{member.name}</strong>
                  <small>{member.role}</small>
                </div>
                <em>{member.load}</em>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="task-board" id="tasks" aria-labelledby="tasks-heading">
        <div className="section-heading board-heading with-action">
          <div>
            <p className="eyebrow">Live board</p>
            <h2 id="tasks-heading">Today&apos;s execution view</h2>
          </div>
          <button type="button" onClick={openTaskForm}>Add task</button>
        </div>

        <div className="columns">
          {Object.entries(tasks).map(([column, items]) => (
            <article className="task-column" key={column}>
              <header>
                <h3>{column === 'todo' ? 'To do' : column === 'progress' ? 'In progress' : 'Done'}</h3>
                <span>{items.length}</span>
              </header>

              {items.map((task) => (
                <div className="task-card" key={`${column}-${task.title}-${task.meta}`}>
                  <strong>{task.title}</strong>
                  <small>{task.meta}</small>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      {activeForm && (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeForm}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={closeForm} aria-label="Close form">
              x
            </button>

            {activeForm === 'project' ? (
              <form onSubmit={handleProjectSubmit}>
                <p className="eyebrow">New project</p>
                <h2 id="modal-title">Create a workstream</h2>

                <label>
                  Project name
                  <input
                    autoFocus
                    required
                    value={projectForm.name}
                    onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })}
                    placeholder="Website redesign"
                  />
                </label>

                <label>
                  Owner
                  <input
                    value={projectForm.owner}
                    onChange={(event) => setProjectForm({ ...projectForm, owner: event.target.value })}
                    placeholder="Product team"
                  />
                </label>

                <div className="form-grid">
                  <label>
                    Status
                    <select
                      value={projectForm.status}
                      onChange={(event) => setProjectForm({ ...projectForm, status: event.target.value })}
                    >
                      <option>On track</option>
                      <option>Review</option>
                      <option>At risk</option>
                    </select>
                  </label>

                  <label>
                    Progress
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={projectForm.progress}
                      onChange={(event) => setProjectForm({ ...projectForm, progress: event.target.value })}
                    />
                  </label>
                </div>

                <button type="submit">Create project</button>
              </form>
            ) : (
              <form onSubmit={handleTaskSubmit}>
                <p className="eyebrow">New task</p>
                <h2 id="modal-title">Add work to the board</h2>

                <label>
                  Task title
                  <input
                    autoFocus
                    required
                    value={taskForm.title}
                    onChange={(event) => setTaskForm({ ...taskForm, title: event.target.value })}
                    placeholder="Prepare release notes"
                  />
                </label>

                <label>
                  Owner
                  <input
                    value={taskForm.owner}
                    onChange={(event) => setTaskForm({ ...taskForm, owner: event.target.value })}
                    placeholder="Frontend"
                  />
                </label>

                <div className="form-grid">
                  <label>
                    Board column
                    <select
                      value={taskForm.column}
                      onChange={(event) => setTaskForm({ ...taskForm, column: event.target.value })}
                    >
                      <option value="todo">To do</option>
                      <option value="progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                  </label>

                  <label>
                    Due
                    <input
                      value={taskForm.due}
                      onChange={(event) => setTaskForm({ ...taskForm, due: event.target.value })}
                      placeholder="Due Friday"
                    />
                  </label>
                </div>

                <button type="submit">Add task</button>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
