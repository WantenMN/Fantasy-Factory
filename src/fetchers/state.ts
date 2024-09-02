import { StateKeys } from "@/db/stateHandler";

import { State } from "../lib/types";

export const initState = async () => {
  try {
    const response = await fetch("/api/state/init");

    if (!response.ok) {
      throw new Error("Failed to initialize state");
    }

    console.log("State initialized!");
  } catch (error) {
    console.error("Error initializing state:", error);
  }
};

export const setState = (key: StateKeys, value: string) => {
  fetch("/api/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to store state");
      }
      console.log(
        `State with key "${key}" and value "${value}" has been stored.`
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getState = async (key: StateKeys): Promise<State> => {
  try {
    const response = await fetch(`/api/state?key=${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch state for key: "${key}"`);
    }

    const data = (await response.json()) as State;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
