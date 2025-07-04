import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const context = formData.get("context") as string;

    if (!files || files.length === 0) return NextResponse.json({ message: "No files uploaded." }, { status: 400 });
    if (!context) return NextResponse.json({ message: "Missing context name." }, { status: 400 });

    const uploadDir = path.join(process.cwd(), "public", "uploads", context);
    await fs.mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = file.name.split(".").pop();
      const filename = `${uuidv4()}.${ext}`;

      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${context}/${filename}`;
      urls.push(publicUrl);
    }

    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error("[UPLOAD_API_ERROR]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
