const express = require('express');
const mongoose = require('mongoose');

const Project = require('../models/Project');
const { authRequired } = require('../middleware/auth.middleware');

const router = express.Router();

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.post('/', authRequired, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Project name is required' });

    const project = await Project.create({
      name: name.trim(),
      description: description || '',
      members: [{ userId: req.user.userId, role: 'ADMIN' }]
    });

    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
});

router.get('/', authRequired, async (req, res, next) => {
  try {
    const projects = await Project.find({ 'members.userId': req.user.userId });
    res.json({ projects });
  } catch (err) {
    next(err);
  }
});

router.get('/:projectId', authRequired, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!validateObjectId(projectId)) return res.status(400).json({ message: 'Invalid projectId' });

    const project = await Project.findOne({
      _id: projectId,
      'members.userId': req.user.userId
    });

    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ project });
  } catch (err) {
    next(err);
  }
});

router.post('/:projectId/members', authRequired, async (req, res, next) => {
  try {
    const { projectId } = req.params;
    if (!validateObjectId(projectId)) return res.status(400).json({ message: 'Invalid projectId' });

    const { userId, role } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const requesterMembership = project.members.find((m) => String(m.userId) === String(req.user.userId));
    if (!requesterMembership) return res.status(403).json({ message: 'Not a project member' });
    if (requesterMembership.role !== 'ADMIN') return res.status(403).json({ message: 'Admin privileges required' });

    const normalizedRole = role || 'MEMBER';
    if (!['ADMIN', 'MEMBER'].includes(normalizedRole)) {
      return res.status(400).json({ message: 'role must be ADMIN or MEMBER' });
    }

    const already = project.members.some((m) => String(m.userId) === String(userId));
    if (already) {
      project.members = project.members.map((m) => (String(m.userId) === String(userId) ? { ...m.toObject(), role: normalizedRole } : m));
    } else {
      project.members.push({ userId, role: normalizedRole });
    }

    await project.save();
    res.json({ project });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

