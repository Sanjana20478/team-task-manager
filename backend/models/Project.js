const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['ADMIN', 'MEMBER'], required: true, default: 'MEMBER' }
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: '', trim: true },
    members: { type: [membershipSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);

