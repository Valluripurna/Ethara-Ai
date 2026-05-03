const { get, all, run } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Project {
  static create(data) {
    const id = uuidv4();
    run(
      'INSERT INTO projects (id, name, description, createdBy, members) VALUES (?, ?, ?, ?, ?)',
      [id, data.name, data.description || null, data.createdBy, JSON.stringify([])]
    );
    return Project.findById(id);
  }

  static findById(id) {
    const project = get('SELECT * FROM projects WHERE id = ?', [id]);
    if (project && project.members) {
      project.members = JSON.parse(project.members || '[]');
    }
    return project;
  }

  static findAll() {
    const projects = all('SELECT * FROM projects ORDER BY createdAt DESC');
    return projects.map(p => ({
      ...p,
      members: JSON.parse(p.members || '[]')
    }));
  }

  static findByCreatedBy(userId) {
    const projects = all('SELECT * FROM projects WHERE createdBy = ? ORDER BY createdAt DESC', [userId]);
    return projects.map(p => ({
      ...p,
      members: JSON.parse(p.members || '[]')
    }));
  }

  static addMember(projectId, userId) {
    const project = Project.findById(projectId);
    if (!project) return null;

    const members = project.members || [];
    if (!members.includes(userId)) {
      members.push(userId);
    }

    run('UPDATE projects SET members = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [JSON.stringify(members), projectId]);
    return Project.findById(projectId);
  }

  static removeMember(projectId, userId) {
    const project = Project.findById(projectId);
    if (!project) return null;

    const members = project.members || [];
    const index = members.indexOf(userId);
    if (index > -1) {
      members.splice(index, 1);
    }

    run('UPDATE projects SET members = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [JSON.stringify(members), projectId]);
    return Project.findById(projectId);
  }

  static updateById(id, data) {
    const updates = [];
    const values = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      values.push(data.description);
    }

    if (updates.length === 0) return Project.findById(id);

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);

    run(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`, values);
    return Project.findById(id);
  }

  static deleteById(id) {
    run('DELETE FROM projects WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Project;
