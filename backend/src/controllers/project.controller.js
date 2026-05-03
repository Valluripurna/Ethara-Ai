const { z } = require('zod');
const Project = require('../models/project.model');
const Task = require('../models/task.model');

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  members: z.array(z.string()).optional()
});

exports.getProjects = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'member') {
      query = { members: req.user._id };
    }

    const projects = await Project.find(query)
      .populate('members', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const project = await Project.create({
      name: validatedData.name,
      description: validatedData.description,
      members: validatedData.members || [],
      createdBy: req.user._id
    });

    const populatedProject = await Project.findById(project._id)
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    res.status(201).json({ success: true, project: populatedProject });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const validatedData = projectSchema.partial().parse(req.body);

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    )
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Task.deleteMany({ projectId: req.params.id });

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const isMember = project.members.some(
      (m) => m._id.toString() === req.user._id
    );
    const isCreator = project.createdBy._id.toString() === req.user._id;

    if (req.user.role !== 'admin' && !isMember && !isCreator) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};
