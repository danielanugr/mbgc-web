import { NextResponse } from "next/server";
import { syncToSanity } from "@/services/bgg";
import { isAuthorizedSyncRequest } from "@/lib/sync-bgg";

const expectedSecret = process.env.BGG_SYNC_SECRET;

export async function GET(req: Request) {
  if (!isAuthorizedSyncRequest(req, expectedSecret)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

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

export async function POST(req: Request) {
  if (!isAuthorizedSyncRequest(req, expectedSecret)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

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
