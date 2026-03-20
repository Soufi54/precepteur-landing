import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Lire les emails existants
    let subscribers: string[] = [];
    try {
      const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
      subscribers = JSON.parse(data);
    } catch {
      // Fichier n'existe pas encore
    }

    // Eviter les doublons
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
