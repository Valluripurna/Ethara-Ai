const { z } = require('zod');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().optional(),
  dueDate: z.string().optional().transform((val) => (val ? new Date(val).toISOString() : undefined)),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  assignedTo: z
    .preprocess((val) => (val === '' || val === null || val === undefined ? undefined : val), z.string().optional()),
  projectId: z.string().min(1, 'Project ID is required')
});

exports.getTasks = (req, res, next) => {
  try {
    const { projectId, status, assignedTo } = req.query;
    let tasks = [];

    if (projectId) {
      tasks = Task.findByProjectId(projectId);
    } else {
      if (req.user.role === 'member') {
        const allProjects = Project.findAll();
        const memberProjects = allProjects.filter(p => p.members.includes(req.user.id));
        const projectIds = memberProjects.map(p => p.id);

        tasks = projectIds.flatMap(pId => Task.findByProjectId(pId));
      } else {
        const allProjects = Project.findAll();
        tasks = allProjects.flatMap(p => Task.findByProjectId(p.id));
      }
    }

    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }

    if (assignedTo) {
      tasks = tasks.filter(t => t.assignedTo === assignedTo);
    }

    if (req.user.role === 'member' && projectId) {
      const project = Project.findById(projectId);
      if (!project.members.includes(req.user.id) && project.createdBy !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Access denied to this project' });
      }
    }

    res.status(200).json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    next(error);
  }
};

exports.createTask = (req, res, next) => {
  try {
    const validatedData = taskSchema.parse(req.body);

    const project = Project.findById(validatedData.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const task = Task.create(validatedData);

    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = (req, res, next) => {
  try {
    const task = Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const body = { ...req.body };
    if (body.assignedTo === '') {
      body.assignedTo = null;
    }

    if (req.user.role === 'member') {
      const isAssigned = task.assignedTo === req.user.id;
      const allowedFields = ['status'];
      const requestedFields = Object.keys(body);

      const hasDisallowed = requestedFields.some((f) => !allowedFields.includes(f));
      if (hasDisallowed || !isAssigned) {
        return res.status(403).json({ success: false, message: 'Members can only update status of their assigned tasks' });
      }
    }

    const updatedTask = Task.updateById(req.params.id, body);

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = (req, res, next) => {
  try {
    const task = Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    Task.deleteById(req.params.id);

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
