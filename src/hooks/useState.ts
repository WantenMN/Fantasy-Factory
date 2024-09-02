"use client";

import { useEffect } from "react";

import { getState, initState } from "@/fetchers/state";
import { emptyFun } from "@/lib/utils";
import { useStateStore } from "@/store/useStateStore";

const useStateDB = () => {
  const [setShowFantasiesModal] = useStateStore((s) => [
    s.setShowFantasiesModal,
  ]);

  useEffect(() => {
    initState().catch(emptyFun);
    getState("showFantasiesModal")
      .then((res) => {
        if (res.value === "1") {
          setShowFantasiesModal(true);
        }
      })
      .catch(emptyFun);
  }, [setShowFantasiesModal]);
};

export default useStateDB;
