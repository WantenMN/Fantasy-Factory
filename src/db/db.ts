import Database from "better-sqlite3";

export const openDb = () => {
  const db = new Database("fantasy-factory.sqlite", { verbose: console.log });

  db.exec(`
    CREATE TABLE IF NOT EXISTS fantasies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT UNIQUE,
      value TEXT
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS state (
      key TEXT UNIQUE,
      value TEXT
    );
  `);

  return db;
};
