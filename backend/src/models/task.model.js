const { get, all, run } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class Task {
  static create(data) {
    const id = uuidv4();
    run(
      'INSERT INTO tasks (id, projectId, title, description, status, assignedTo, priority, dueDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        data.projectId,
        data.title,
        data.description || null,
        data.status || 'todo',
        data.assignedTo || null,
        data.priority || 'medium',
        data.dueDate || null
      ]
    );
    return Task.findById(id);
  }

  static findById(id) {
    return get('SELECT * FROM tasks WHERE id = ?', [id]);
  }

  static findByProjectId(projectId) {
    return all('SELECT * FROM tasks WHERE projectId = ? ORDER BY createdAt DESC', [projectId]);
  }

  static findByAssignedTo(userId) {
    return all('SELECT * FROM tasks WHERE assignedTo = ? ORDER BY createdAt DESC', [userId]);
  }

  static updateById(id, data) {
    const updates = [];
    const values = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      values.push(data.description);
    }
    if (data.status !== undefined) {
      updates.push('status = ?');
      values.push(data.status);
    }
    if (data.assignedTo !== undefined) {
      updates.push('assignedTo = ?');
      values.push(data.assignedTo);
    }
    if (data.priority !== undefined) {
      updates.push('priority = ?');
      values.push(data.priority);
    }
    if (data.dueDate !== undefined) {
      updates.push('dueDate = ?');
      values.push(data.dueDate);
    }

    if (updates.length === 0) return Task.findById(id);

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);

    run(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
    return Task.findById(id);
  }

  static deleteById(id) {
    run('DELETE FROM tasks WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Task;
