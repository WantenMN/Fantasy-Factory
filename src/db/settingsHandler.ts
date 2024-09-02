import { openDb } from "@/db/db";

interface Setting {
  key: string;
  value: string;
}

// prettier-ignore
export type SettingKeys =
"theme"|
"language"

const defaultSettings: Record<SettingKeys, string> = {
  theme: "light",
  language: "en",
};

export const getSetting = (key: SettingKeys): Setting | null => {
  const db = openDb();
  const stmt = db.prepare("SELECT * FROM settings WHERE key = ?");
  const setting = stmt.get(key) as Setting;
  return setting || null;
};

export const getAllSettings = (): Setting[] => {
  const db = openDb();
  const stmt = db.prepare("SELECT * FROM settings");
  return stmt.all() as Setting[];
};

export const setSetting = (key: SettingKeys, value: string): void => {
  const db = openDb();
  const settingExists = db
    .prepare("SELECT COUNT(*) as count FROM settings WHERE key = ?")
    .get(key) as { count: number };

  if (settingExists.count > 0) {
    const stmt = db.prepare("UPDATE settings SET value = ? WHERE key = ?");
    stmt.run(value, key);
  } else {
    const stmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
    stmt.run(key, value);
  }
};

export const initializeDefaultSettings = (): void => {
  Object.entries(defaultSettings).forEach(([key, value]) => {
    setSetting(key as SettingKeys, value);
  });
};
