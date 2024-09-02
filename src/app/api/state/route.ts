import { NextResponse } from "next/server";

import { getState, setState, StateKeys } from "@/db/stateHandler";
import { State } from "@/lib/types";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key is required." }, { status: 400 });
  }

  const state = getState(key as StateKeys);

  if (!state) {
    return NextResponse.json(
      { error: `No state found with key "${key}".` },
      { status: 404 }
    );
  }

  return NextResponse.json(state);
}

export async function POST(req: Request) {
  try {
    const { key, value } = (await req.json()) as State;

    if (!key || !value) {
      throw new Error("Both key and value are required.");
    }

    setState(key as StateKeys, value);

    return NextResponse.json({ key, value }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
