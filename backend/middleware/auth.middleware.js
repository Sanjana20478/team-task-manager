const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing/invalid Authorization header' });
  }

  const token = header.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, email, role }
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid/expired token' });
  }
}

module.exports = { authRequired };

