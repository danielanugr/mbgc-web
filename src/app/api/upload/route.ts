import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/services/r2";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate a unique filename using crypto
    const ext = file.name.split(".").pop();
    const uniqueFileName = `${crypto.randomUUID()}.${ext}`;

    const url = await uploadToR2(buffer, uniqueFileName, file.type);

    return NextResponse.json(
      {
        success: true,
        url,
        fileName: uniqueFileName,
        originalName: file.name,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 },
    );
  }
}
