import { NextResponse } from "next/server";
import { openDb } from "@/lib/db";

// Define an interface for the expected request body
interface FantasyRequestBody {
  name: string;
  id?: number; // `id` is optional
}

// Synchronous handler for GET request to retrieve all fantasies
export function GET() {
  const db = openDb();
  const fantasies = db.prepare("SELECT * FROM fantasies").all(); // Synchronous operation
  return NextResponse.json(fantasies);
}

// Synchronous handler for POST request to add or update a fantasy
export async function POST(req: Request) {
  const db = openDb();

  try {
    // Safely parse and validate the request body
    const { name, id } = (await req.json()) as FantasyRequestBody;

    if (!name) {
      throw new Error("Name is required.");
    }

    if (id === undefined) {
      // Insert new fantasy if `id` is not provided
      const stmt = db.prepare("INSERT INTO fantasies (name) VALUES (?)");
      const result = stmt.run(name); // Synchronous insertion

      return NextResponse.json(
        { id: result.lastInsertRowid, name },
        { status: 201 }
      );
    } else {
      // Update existing fantasy if `id` is provided
      const stmt = db.prepare("UPDATE fantasies SET name = ? WHERE id = ?");
      const result = stmt.run(name, id); // Synchronous update

      if (result.changes === 0) {
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

// Synchronous handler for DELETE request to remove a fantasy
export function DELETE(req: Request) {
  const db = openDb();

  try {
    // Extract `id` from the request URL query parameters
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    console.log("id: ", id);
    if (isNaN(id)) {
      throw new Error("Invalid id.");
    }

    // Perform the delete operation
    const stmt = db.prepare("DELETE FROM fantasies WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
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
