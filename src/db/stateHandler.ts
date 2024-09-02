import { openDb } from "@/db/db";

interface State {
  key: string;
  value: string;
}

// prettier-ignore
export type StateKeys =
"initialized" |
"showFantasiesModal" |
"currentFantasy";

const defaultState: Record<StateKeys, string> = {
  initialized: "1",
  showFantasiesModal: "1",
  currentFantasy: "",
};

export const getState = (key: StateKeys): State | null => {
  const db = openDb();
  const stmt = db.prepare("SELECT * FROM state WHERE key = ?");
  const state = stmt.get(key) as State;
  return state || null;
};

export const setState = (key: StateKeys, value: string): void => {
  const db = openDb();
  const stateExists = db
    .prepare("SELECT COUNT(*) as count FROM state WHERE key = ?")
    .get(key) as { count: number };

  if (stateExists.count > 0) {
    const stmt = db.prepare("UPDATE state SET value = ? WHERE key = ?");
    stmt.run(value, key);
  } else {
    const stmt = db.prepare("INSERT INTO state (key, value) VALUES (?, ?)");
    stmt.run(key, value);
  }
};

export const initializeDefaultState = (): void => {
  const initialized = getState("initialized");

  if (!initialized) {
    setState("initialized", "1");
    Object.entries(defaultState).forEach(([key, value]) => {
      setState(key as StateKeys, value);
    });
  }
};
