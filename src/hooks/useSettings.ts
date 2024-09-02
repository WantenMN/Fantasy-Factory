"use client";

import { useEffect } from "react";

import { initSettings } from "@/fetchers/settings";
import { emptyFun } from "@/lib/utils";

const useSettings = () => {
  useEffect(() => {
    initSettings().catch(emptyFun);
  }, []);
};

export default useSettings;
