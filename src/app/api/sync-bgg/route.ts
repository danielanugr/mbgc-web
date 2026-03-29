import { NextResponse } from "next/server";
import { syncToSanity } from "@/services/bgg";

export async function GET() {
  try {
    const result = await syncToSanity();

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("BGG Sync API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request /* eslint-disable-line @typescript-eslint/no-unused-vars */) {
  try {
    const result = await syncToSanity();

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
    console.error("BGG Sync API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
