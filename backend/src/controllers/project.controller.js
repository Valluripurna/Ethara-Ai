const { z } = require('zod');
const Project = require('../models/project.model');
const Task = require('../models/task.model');

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  members: z.array(z.string()).optional()
});

exports.getProjects = (req, res, next) => {
  try {
    let projects;

    if (req.user.role === 'member') {
      const allProjects = Project.findAll();
      projects = allProjects.filter(p => 
        p.members.includes(req.user.id)
      );
    } else {
      projects = Project.findAll();
    }

    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

exports.createProject = (req, res, next) => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const project = Project.create({
      name: validatedData.name,
      description: validatedData.description,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = (req, res, next) => {
  try {
    const validatedData = projectSchema.partial().parse(req.body);

    const project = Project.updateById(req.params.id, validatedData);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = (req, res, next) => {
  try {
    const project = Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Delete all associated tasks
    const tasks = Task.findByProjectId(req.params.id);
    tasks.forEach(task => Task.deleteById(task.id));

    Project.deleteById(req.params.id);

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = (req, res, next) => {
  try {
    const project = Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = project.members.includes(req.user.id);
    const isCreator = project.createdBy === req.user.id;

    if (req.user.role !== 'admin' && !isMember && !isCreator) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};
