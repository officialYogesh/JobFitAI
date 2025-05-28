import { NextRequest, NextResponse } from "next/server";

// TODO: Install and configure Firebase Admin SDK
// import { auth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // TODO: Verify Firebase ID token
    // const decodedToken = await auth.verifyIdToken(token);
    // const uid = decodedToken.uid;

    // For now, return a placeholder response
    return NextResponse.json(
      {
        message: "Token verification endpoint ready",
        // uid: uid
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
