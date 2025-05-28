import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// TODO: Install document parsing libraries
// npm install pdf-parse docx2txt
// import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    let text = "";

    // Parse based on file type
    if (file.type === "application/pdf") {
      // TODO: Use pdf-parse library
      // const pdfData = await pdfParse(buffer);
      // text = pdfData.text;
      text = "PDF parsing placeholder - install pdf-parse library";
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // TODO: Use docx parsing library
      text = "DOCX parsing placeholder - install docx parsing library";
    } else if (file.type === "text/plain") {
      text = buffer.toString("utf-8");
    }

    // Generate document hash
    const docHash = crypto.createHash("sha256").update(text).digest("hex");

    return NextResponse.json({
      text,
      docHash,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  } catch (error) {
    console.error("Document parsing error:", error);
    return NextResponse.json(
      { error: "Failed to parse document" },
      { status: 500 }
    );
  }
}
