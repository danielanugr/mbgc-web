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
  } catch (error: any) {
    console.error("BGG Sync API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    // Sebagai API public, dalam aplikasi nyata kita mungkin memerlukan
    // secret token pada header Authorization, tapi untuk keperluan testing
    // atau MVP (seperti PRD tanpa authentication), kita biarkan public/terbuka
    // atau bisa tambahkan basic secure secret.

    const result = await syncToSanity();

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any) {
    console.error("BGG Sync API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
