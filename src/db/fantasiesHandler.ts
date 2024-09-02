import { openDb } from "@/db/db";

export function getAllFantasies() {
  const db = openDb();
  return db.prepare("SELECT * FROM fantasies").all();
}

export function addFantasy(name: string) {
  const db = openDb();
  const stmt = db.prepare("INSERT INTO fantasies (name) VALUES (?)");
  const result = stmt.run(name);
  return { id: result.lastInsertRowid, name };
}

export function updateFantasy(id: number, name: string) {
  const db = openDb();
  const stmt = db.prepare("UPDATE fantasies SET name = ? WHERE id = ?");
  const result = stmt.run(name, id);
  return result.changes > 0;
}

export function deleteFantasy(id: number) {
  const db = openDb();
  const stmt = db.prepare("DELETE FROM fantasies WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}
