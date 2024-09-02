"use client";

import { Fantasies } from "@/components/Fantasies";
import useSettings from "@/hooks/useSettings";
import useStateDB from "@/hooks/useState";
import { useStateStore } from "@/store/useStateStore";

export default function Home() {
  useSettings();
  useStateDB();

  const [showFantasiesModal, setShowFantasiesModal] = useStateStore((s) => [
    s.showFantasiesModal,
    s.setShowFantasiesModal,
  ]);

  return (
    <main>
      {showFantasiesModal && <Fantasies />}

      <button onClick={() => setShowFantasiesModal(true)}>
        show fantasies
      </button>
    </main>
  );
}
