import { setState } from "@/fetchers/state";
import { create } from "zustand";

type StateStore = {
  showFantasiesModal: boolean;
  setShowFantasiesModal: (s: boolean) => void;
};

export const useStateStore = create<StateStore>((set) => ({
  showFantasiesModal: false,
  setShowFantasiesModal: (s) => {
    set({ showFantasiesModal: s });
    setState("showFantasiesModal", s ? "1" : "0");
  },
}));
