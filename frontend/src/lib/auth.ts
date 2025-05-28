// TODO: Install Firebase Admin SDK
// npm install firebase-admin

// import { auth } from 'firebase-admin/app';
// import { initializeApp, cert } from 'firebase-admin/app';

export interface AuthUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

/**
 * Verify Firebase ID token from Authorization header
 */
export async function verifyAuthToken(
  authHeader: string | null
): Promise<AuthUser | null> {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const _token = authHeader.substring(7);

  try {
    // TODO: Implement Firebase Admin SDK token verification
    // const decodedToken = await auth().verifyIdToken(_token);
    // return {
    //   uid: decodedToken.uid,
    //   email: decodedToken.email || null,
    //   emailVerified: decodedToken.email_verified || false
    // };

    // Placeholder for development
    return {
      uid: "placeholder-uid",
      email: "user@example.com",
      emailVerified: true,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

interface RouteContext {
  user?: AuthUser;
}

/**
 * Middleware helper for authenticated routes
 */
export function requireAuth() {
  return async (
    request: Request,
    context: RouteContext,
    next: () => Promise<Response>
  ) => {
    const authHeader = request.headers.get("authorization");
    const user = await verifyAuthToken(authHeader);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add user to context for use in route handlers
    context.user = user;
    return next();
  };
}
