"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChange,
  signInWithGoogle,
  logOut,
  type User,
} from "@/lib/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Demo mode check
const isDemoMode =
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key";

// Mock user for demo mode
const mockUser = {
  uid: "demo-user-123",
  email: "demo@example.com",
  displayName: "Demo User",
} as User;

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Demo mode: check localStorage for mock auth state
  const [, setDemoAuthState] = useState<boolean>(false);

  useEffect(() => {
    if (isDemoMode) {
      // Check localStorage for demo auth state
      const demoAuth = localStorage.getItem("demo-auth") === "true";
      setDemoAuthState(demoAuth);
      setAuthState({
        user: demoAuth ? mockUser : null,
        loading: false,
        error: null,
      });
    } else {
      // Real Firebase auth
      const unsubscribe = onAuthStateChange((user) => {
        setAuthState({
          user,
          loading: false,
          error: null,
        });
      });

      return () => unsubscribe();
    }
  }, []);

  const signIn = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    if (isDemoMode) {
      // Demo mode: set mock authentication
      localStorage.setItem("demo-auth", "true");
      setDemoAuthState(true);
      setAuthState({
        user: mockUser,
        loading: false,
        error: null,
      });
      return;
    }

    const { user: _user, error } = await signInWithGoogle();

    if (error) {
      setAuthState((prev) => ({ ...prev, loading: false, error }));
    }
    // Note: User state will be updated by onAuthStateChange listener
  };

  const signOutUser = async () => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    if (isDemoMode) {
      // Demo mode: clear mock authentication
      localStorage.removeItem("demo-auth");
      setDemoAuthState(false);
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
      return;
    }

    const { error } = await logOut();

    if (error) {
      setAuthState((prev) => ({ ...prev, loading: false, error }));
    }
    // Note: User state will be updated by onAuthStateChange listener
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    signIn,
    signOut: signOutUser,
  };
}
