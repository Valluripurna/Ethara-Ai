const { z } = require('zod');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  assignedTo: z
    .preprocess((val) => (val === '' || val === null || val === undefined ? undefined : val), z.string().optional()),
  projectId: z.string().min(1, 'Project ID is required')
});

exports.getTasks = async (req, res, next) => {
  try {
    const { projectId, status, assignedTo } = req.query;
    let query = {};

    if (projectId) query.projectId = projectId;
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;

    if (req.user.role === 'member') {
      const memberProjects = await Project.find({ members: req.user._id }).select('_id');
      const projectIds = memberProjects.map((p) => p._id.toString());

      if (projectId && !projectIds.includes(projectId)) {
        return res.status(403).json({ success: false, message: 'Access denied to this project' });
      }

      if (!projectId) {
        query.projectId = { $in: projectIds };
      }
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const validatedData = taskSchema.parse(req.body);

    const project = await Project.findById(validatedData.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const task = await Task.create(validatedData);

    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    res.status(201).json({ success: true, task: populatedTask });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const body = { ...req.body };
    if (body.assignedTo === '') {
      body.assignedTo = null;
    }

    if (req.user.role === 'member') {
      const isAssigned = task.assignedTo?.toString() === req.user._id;
      const allowedFields = ['status'];
      const requestedFields = Object.keys(body);

      const hasDisallowed = requestedFields.some((f) => !allowedFields.includes(f));
      if (hasDisallowed || !isAssigned) {
        return res.status(403).json({ success: false, message: 'Members can only update status of their assigned tasks' });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    )
      .populate('assignedTo', 'name email')
      .populate('projectId', 'name');

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
