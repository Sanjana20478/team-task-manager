const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: '', trim: true },

    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], required: true, default: 'TODO' },
    dueDate: { type: Date, required: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);

