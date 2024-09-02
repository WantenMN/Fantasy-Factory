import { NextResponse } from "next/server";

import { getSetting, setSetting, SettingKeys } from "@/db/settingsHandler";
import { Setting } from "@/lib/types";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Key is required." }, { status: 400 });
  }

  const setting = getSetting(key as SettingKeys);

  if (!setting) {
    return NextResponse.json(
      { error: `No setting found with key "${key}".` },
      { status: 404 }
    );
  }

  return NextResponse.json(setting);
}

export async function POST(req: Request) {
  try {
    const { key, value } = (await req.json()) as Setting;

    if (!key || !value) {
      throw new Error("Both key and value are required.");
    }

    setSetting(key as SettingKeys, value);

    return NextResponse.json({ key, value }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
