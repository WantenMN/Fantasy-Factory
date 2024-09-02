import { NextResponse } from "next/server";

import {
  addFantasy,
  deleteFantasy,
  getAllFantasies,
  updateFantasy,
} from "@/db/fantasiesHandler";

interface FantasyRequestBody {
  name: string;
  id?: number;
}

export function GET() {
  try {
    const fantasies = getAllFantasies();
    return NextResponse.json(fantasies);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, id } = (await req.json()) as FantasyRequestBody;

    if (!name) {
      throw new Error("Name is required.");
    }

    if (id === undefined) {
      const newFantasy = addFantasy(name);
      return NextResponse.json(newFantasy, { status: 201 });
    } else {
      const success = updateFantasy(id, name);
      if (!success) {
        throw new Error(`No fantasy found with id ${id}`);
      }
      return NextResponse.json({ id, name }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}

export function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    if (isNaN(id)) {
      throw new Error("Invalid id.");
    }

    const success = deleteFantasy(id);
    if (!success) {
      throw new Error(`No fantasy found with id ${id}`);
    }

    return NextResponse.json(
      { message: `Fantasy with id ${id} deleted` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
