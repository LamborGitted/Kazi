import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/config/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    console.log("[contact]", { name, email, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
