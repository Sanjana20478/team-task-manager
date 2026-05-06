const express = require('express');
const mongoose = require('mongoose');

const Project = require('../models/Project');
const Task = require('../models/Task');

const { authRequired } = require('../middleware/auth.middleware');

const router = express.Router();

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function loadProjectOr404(req, res, next) {
  const { projectId } = req.params;
  if (!validateObjectId(projectId)) return res.status(400).json({ message: 'Invalid projectId' });

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const membership = project.members.find((m) => String(m.userId) === String(req.user.userId));
  if (!membership) return res.status(403).json({ message: 'Not a project member' });

  req.project = project;
  return next();
}

router.get('/dashboard', authRequired, async (req, res, next) => {
  try {
    // Overdue: dueDate < now and not DONE; by membership
    const now = new Date();
    const projects = await Project.find({ 'members.userId': req.user.userId });
    const projectIds = projects.map((p) => p._id);

    const tasks = await Task.find({
      projectId: { $in: projectIds },
      assignedTo: req.user.userId,
      status: { $ne: 'DONE' },
      dueDate: { $lt: now }
    }).sort({ dueDate: 1 });

    const statusSummary = await Task.aggregate([
      { $match: { projectId: { $in: projectIds }, assignedTo: req.user.userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({ overdueTasks: tasks, statusSummary });
  } catch (err) {
    next(err);
  }
});

router.post('/:projectId/tasks', authRequired, loadProjectOr404, async (req, res, next) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'title is required' });

    const normalizedStatus = status || 'TODO';
    if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(normalizedStatus)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    let assignee = assignedTo || null;
    if (assignee) {
      const memberIds = req.project.members.map((m) => String(m.userId));
      if (!memberIds.includes(String(assignee))) {
        return res.status(400).json({ message: 'assignedTo must be a project member' });
      }
    }

    const task = await Task.create({
      projectId: req.project._id,
      title: title.trim(),
      description: description || '',
      status: normalizedStatus,
      assignedTo: assignee,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      createdBy: req.user.userId
    });

    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
});

router.get('/:projectId/tasks', authRequired, loadProjectOr404, async (req, res, next) => {
  try {
    const tasks = await Task.find({ projectId: req.project._id }).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
});

router.patch('/:projectId/tasks/:taskId', authRequired, loadProjectOr404, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    if (!validateObjectId(taskId)) return res.status(400).json({ message: 'Invalid taskId' });

    const { status, assignedTo, dueDate } = req.body;

    if (!status && !assignedTo && !dueDate) {
      return res.status(400).json({ message: 'Provide status, assignedTo, or dueDate' });
    }

    const task = await Task.findOne({ _id: taskId, projectId: req.project._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // If assigning, enforce project membership
    if (assignedTo !== undefined && assignedTo !== null) {
      const memberIds = req.project.members.map((m) => String(m.userId));
      if (!memberIds.includes(String(assignedTo))) {
        return res.status(400).json({ message: 'assignedTo must be a project member' });
      }
      task.assignedTo = assignedTo;
    }

    if (status) {
      if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      task.status = status;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : undefined;
    }

    await task.save();
    res.json({ task });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

