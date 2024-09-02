import { NextResponse } from "next/server";

import { initializeDefaultSettings } from "@/db/settingsHandler";

export function GET() {
  try {
    initializeDefaultSettings();
    return NextResponse.json({
      msg: "Settings initialized!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error,
    });
  }
}
