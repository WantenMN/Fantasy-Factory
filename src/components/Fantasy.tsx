import { useState } from "react";

import { setState } from "@/fetchers/state";
import { Fantasy as FantasyType } from "@/lib/types";
import { useStateStore } from "@/store/useStateStore";

interface FantasyProps {
  fantasy: FantasyType;
  onRename: (id: number, newName: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function Fantasy({ fantasy, onRename, onDelete }: FantasyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(fantasy.name);

  const [setShowFantasiesModal] = useStateStore((s) => [
    s.setShowFantasiesModal,
  ]);

  const handleRename = () => {
    if (newName.trim()) {
      onRename(fantasy.id, newName).catch(() => {});
      setIsEditing(false);
    } else {
      alert("Name cannot be empty.");
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${fantasy.name}"?`)) {
      onDelete(fantasy.id).catch(() => {});
    }
  };

  const selectFantasy = (fantasy: FantasyType) => {
    setState("currentFantasy", fantasy.id.toString());
    setShowFantasiesModal(false);
  };

  return (
    <li
      className="flex gap-2 rounded border p-4"
      onClick={() => {
        selectFantasy(fantasy);
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
          />
          <button onClick={handleRename}>Save</button>
        </>
      ) : (
        <>
          {fantasy.name}
          <button onClick={() => setIsEditing(true)}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
}
