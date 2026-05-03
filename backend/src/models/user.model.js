const { get, all, run } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class User {
  static create(data) {
    const id = uuidv4();
    run(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [id, data.name, data.email, data.password, data.role || 'user']
    );
    return User.findById(id);
  }

  static findById(id) {
    return get('SELECT * FROM users WHERE id = ?', [id]);
  }

  static findByEmail(email) {
    return get('SELECT * FROM users WHERE email = ?', [email]);
  }

  static findAll() {
    return all('SELECT id, name, email, role, createdAt FROM users');
  }

  static updateById(id, data) {
    const updates = [];
    const values = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.email !== undefined) {
      updates.push('email = ?');
      values.push(data.email);
    }
    if (data.password !== undefined) {
      updates.push('password = ?');
      values.push(data.password);
    }
    if (data.role !== undefined) {
      updates.push('role = ?');
      values.push(data.role);
    }

    if (updates.length === 0) return User.findById(id);

    updates.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);

    run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
    return User.findById(id);
  }

  static deleteById(id) {
    run('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }
}

module.exports = User;
