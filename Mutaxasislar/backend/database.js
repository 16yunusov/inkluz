// Mutaxasis ishchilar — SQLite ma'lumotlar bazasi (sql.js — native build kerak emas)

const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'mutaxasis.db');

let db = null;

async function initDb() {
  // sql.js — pure JavaScript, native build kerak emas (Windows/Linux/Mac)
  const initSqlJs = require('sql.js');
  const wasmPath = path.join(__dirname, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
  if (!fs.existsSync(wasmPath)) {
    throw new Error('sql.js wasm fayli topilmadi. backend papkasida npm install bajarilganini tekshiring.');
  }
  const SQL = await initSqlJs({ locateFile: () => wasmPath });
  let data = null;
  if (fs.existsSync(dbPath)) {
    data = new Uint8Array(fs.readFileSync(dbPath));
  }
  const sqlDb = new SQL.Database(data || undefined);
  sqlDb.run('PRAGMA foreign_keys = ON');

  function save() {
      try {
        const buf = sqlDb.export();
        fs.writeFileSync(dbPath, Buffer.from(buf));
      } catch (err) {
        console.warn('DB save xato:', err.message);
      }
    }

    db = {
      prepare: (sql) => {
        const stmt = sqlDb.prepare(sql);
        return {
          run: (...params) => {
            stmt.bind(params);
            stmt.step();
            const changes = sqlDb.getRowsModified();
            const rowidRes = sqlDb.exec('SELECT last_insert_rowid() as id');
            const lastInsertRowid = rowidRes[0]?.values?.[0]?.[0] ?? 0;
            stmt.free();
            save();
            return { changes, lastInsertRowid };
          },
          get: (...params) => {
            stmt.bind(params);
            const ok = stmt.step();
            const row = ok ? stmt.getAsObject() : undefined;
            stmt.free();
            return row;
          },
          all: (...params) => {
            stmt.bind(params);
            const rows = [];
            while (stmt.step()) rows.push(stmt.getAsObject());
            stmt.free();
            return rows;
          }
        };
      },
      exec: (sql) => {
      const stmts = sql.split(';').map(s => s.trim()).filter(Boolean);
      for (const s of stmts) {
        if (s) sqlDb.run(s + ';');
      }
      save();
    }
  };
  return db;
}

const handler = {
  get(target, prop) {
    if (prop === 'initDb') return initDb;
    if (db === null) throw new Error('Database hali ishga tushmagan. initDb() ni avval chaqiring.');
    return db[prop];
  }
};

const api = new Proxy({}, handler);
api.initDb = initDb;
module.exports = api;
