"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fantasy as FantasyType } from "@/lib/types";

import { Fantasy } from "./Fantasy";

// Named export for the component
export function Fantasies() {
  const { fantasies, createFantasy, renameFantasy, deleteFantasy } =
    useFantasies();
  const [newFantasyName, setNewFantasyName] = useState<string>("");

  const handleCreateFantasy = () => {
    if (newFantasyName.trim()) {
      createFantasy(newFantasyName).catch(() => {});
      setNewFantasyName("");
    } else {
      alert("Please enter a name for the new fantasy.");
    }
  };

  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-black/70">
      <Card>
        <CardHeader>
          <CardTitle>Fantasies</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4 grid grid-cols-2 gap-2">
            {fantasies.map((fantasy) => (
              <Fantasy
                key={fantasy.id}
                fantasy={fantasy}
                onRename={renameFantasy}
                onDelete={deleteFantasy}
              />
            ))}
          </ul>

          <input
            type="text"
            value={newFantasyName}
            onChange={(e) => setNewFantasyName(e.target.value)}
            placeholder="Enter new fantasy name"
          />
          <button onClick={handleCreateFantasy}>New Fantasy</button>
        </CardContent>
      </Card>
    </div>
  );
}

function useFantasies() {
  const [fantasies, setFantasies] = useState<FantasyType[]>([]);

  useEffect(() => {
    fetchFantasies().catch(() => {});
  }, []);

  const fetchFantasies = async () => {
    try {
      const response = await fetch("/api/fantasies");
      if (!response.ok) throw new Error("Failed to fetch fantasies");
      const data = (await response.json()) as FantasyType[];
      setFantasies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createFantasy = async (name: string) => {
    try {
      const response = await fetch("/api/fantasies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to create fantasy");
      const newFantasy = (await response.json()) as FantasyType;
      setFantasies([...fantasies, newFantasy]);
    } catch (error) {
      console.error(error);
    }
  };

  const renameFantasy = async (id: number, newName: string) => {
    try {
      const response = await fetch("/api/fantasies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: newName }),
      });
      if (!response.ok) throw new Error("Failed to rename fantasy");
      const updatedFantasy = (await response.json()) as FantasyType;
      setFantasies(
        fantasies.map((fantasy) =>
          fantasy.id === updatedFantasy.id ? updatedFantasy : fantasy
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFantasy = async (id: number) => {
    try {
      const response = await fetch(`/api/fantasies?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete fantasy");
      setFantasies(fantasies.filter((fantasy) => fantasy.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { fantasies, createFantasy, renameFantasy, deleteFantasy };
}
