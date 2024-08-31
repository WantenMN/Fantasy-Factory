"use client";

import { useState, useEffect } from "react";

// Define the structure of a fantasy item
interface Fantasy {
  id: number;
  name: string;
}

// Named export for the component
export function FantasyList() {
  const [fantasies, setFantasies] = useState<Fantasy[]>([]);
  const [newFantasyName, setNewFantasyName] = useState<string>("");

  // Fetch the list of fantasies when the component mounts
  useEffect(() => {
    const fetchFantasies = async () => {
      try {
        const response = await fetch("/api/fantasies");
        if (!response.ok) throw new Error("Failed to fetch fantasies");
        const data = (await response.json()) as Fantasy[];
        setFantasies(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchFantasies();
  }, []);

  const handleClickCreateFantasy = () => {
    void createFantasy();
  };

  // Function to handle the creation of a new fantasy
  const createFantasy = async () => {
    if (!newFantasyName.trim()) {
      alert("Please enter a name for the new fantasy.");
      return;
    }

    try {
      const response = await fetch("/api/fantasies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newFantasyName }),
      });

      if (!response.ok) throw new Error("Failed to create fantasy");

      const newFantasy = (await response.json()) as Fantasy;
      setFantasies([...fantasies, newFantasy]);
      setNewFantasyName(""); // Clear input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Fantasy List</h1>
      <ul>
        {fantasies.map((fantasy) => (
          <li key={fantasy.id}>{fantasy.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newFantasyName}
        onChange={(e) => setNewFantasyName(e.target.value)}
        placeholder="Enter new fantasy name"
      />
      <button onClick={handleClickCreateFantasy}>Create Fantasy</button>
    </main>
  );
}
