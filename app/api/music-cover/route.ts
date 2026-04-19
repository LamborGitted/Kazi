import { NextRequest, NextResponse } from "next/server";
import { parseFile } from "music-metadata";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  if (!file) {
    return new NextResponse("Missing file param", { status: 400 });
  }

  const safeName = path.basename(file);
  const filePath = path.join(process.cwd(), "public", "music", safeName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const metadata = await parseFile(filePath);
    const pic = metadata.common.picture?.[0];

    if (!pic) {
      return new NextResponse("No cover", { status: 404 });
    }

    return new NextResponse(Buffer.from(pic.data), {
      headers: {
        "Content-Type": pic.format || "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new NextResponse("Parse error", { status: 500 });
  }
}
