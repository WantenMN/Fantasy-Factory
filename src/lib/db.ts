import Database from "better-sqlite3";

// Function to initialize and open the database
export const openDb = () => {
  // Create or open the SQLite database with the hardcoded path
  const db = new Database("fantasy-factory.sqlite", { verbose: console.log });

  // Create 'fantasies' table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS fantasies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  return db;
};
