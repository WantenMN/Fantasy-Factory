import { NextResponse } from "next/server";

import { initializeDefaultState } from "@/db/stateHandler";

export function GET() {
  try {
    initializeDefaultState();
    return NextResponse.json({
      msg: "State initialized!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error,
    });
  }
}
