const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

let db;
let dbPath;

const isWritableDirectory = (dirPath) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.accessSync(dirPath, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
};

const resolveDbPath = () => {
  const requestedPath = process.env.DB_PATH || path.join(__dirname, '../../ethara.db');
  const requestedDir = path.dirname(requestedPath);

  if (isWritableDirectory(requestedDir)) {
    return requestedPath;
  }

  const fallbackPath = path.join('/tmp', path.basename(requestedPath) || 'ethara.db');
  console.warn(
    `DB_PATH directory is not writable (${requestedDir}). Falling back to ${fallbackPath}.`
  );
  return fallbackPath;
};

const saveDatabase = () => {
  if (!db || !dbPath) {
    return;
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
};

const run = (sql, params = []) => {
  db.run(sql, params);
  saveDatabase();
};

const get = (sql, params = []) => {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : undefined;
  stmt.free();
  return row;
};

const all = (sql, params = []) => {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
};

const connectDB = async () => {
  try {
    const SQL = await initSqlJs({
      locateFile: (file) => require.resolve(`sql.js/dist/${file}`)
    });

    dbPath = resolveDbPath();

    if (fs.existsSync(dbPath)) {
      const fileBuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(fileBuffer);
    } else {
      db = new SQL.Database();
    }

    db.run('PRAGMA foreign_keys = ON;');
    initializeTables();

    saveDatabase();

    console.log(`SQLite Connected: ${dbPath}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

const initializeTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      createdBy TEXT NOT NULL,
      members TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'todo',
      assignedTo TEXT,
      priority TEXT DEFAULT 'medium',
      dueDate DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (projectId) REFERENCES projects(id),
      FOREIGN KEY (assignedTo) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_projects_createdBy ON projects(createdBy);
    CREATE INDEX IF NOT EXISTS idx_tasks_projectId ON tasks(projectId);
    CREATE INDEX IF NOT EXISTS idx_tasks_assignedTo ON tasks(assignedTo);
  `);
};

const getDB = () => {
  if (!db) {
    throw new Error('Database has not been initialized. Call connectDB() first.');
  }
  return db;
};

module.exports = { connectDB, getDB, run, get, all, saveDatabase };

