function isAdminInProject(project, userId) {
  const membership = project.members?.find((m) => String(m.userId) === String(userId));
  return membership && membership.role === 'ADMIN';
}

function requireProjectMember(projectDoc) {
  return function (req, res, next) {
    const membership = projectDoc.members?.find((m) => String(m.userId) === String(req.user.userId));
    if (!membership) return res.status(403).json({ message: 'Not a project member' });
    req.projectMembership = membership;
    return next();
  };
}

function requireProjectAdmin(projectDoc) {
  return function (req, res, next) {
    const ok = projectDoc.members?.some(
      (m) => String(m.userId) === String(req.user.userId) && m.role === 'ADMIN'
    );
    if (!ok) return res.status(403).json({ message: 'Admin privileges required' });
    return next();
  };
}

module.exports = { isAdminInProject, requireProjectMember, requireProjectAdmin };

