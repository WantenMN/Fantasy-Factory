import { SettingKeys } from "@/db/settingsHandler";

import { Setting } from "../lib/types";

export const initSettings = async () => {
  try {
    const response = await fetch("/api/settings/init");

    if (!response.ok) {
      throw new Error("Failed to initialize settings");
    }

    console.log("Settings initialized:");
  } catch (error) {
    console.error("Error initializing settings:", error);
  }
};

export const setSetting = (key: SettingKeys, value: string) => {
  fetch("/api/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to store setting");
      }
      console.log(
        `Setting with key "${key}" and value "${value}" has been stored.`
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getSetting = async (key: SettingKeys): Promise<Setting> => {
  try {
    const response = await fetch(
      `/api/settings?key=${encodeURIComponent(key)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch setting for key: "${key}"`);
    }

    const data = (await response.json()) as Setting;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
