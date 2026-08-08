"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function AuthCallbackPage() {
  const router = useRouter();
  const handled = useRef(false);

  useEffect(() => {
    // Listen for auth state changes — Supabase will process the URL
    // hash/code and fire SIGNED_IN once the session is ready
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (handled.current) return;

        if (event === "SIGNED_IN" && session) {
          handled.current = true;

          try {
            const res = await fetch(`${API_URL}/api/auth/google-callback`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ access_token: session.access_token }),
            });

            const result = await res.json();

            if (result.success && result.user) {
              localStorage.setItem("forge_user", JSON.stringify(result.user));
              router.push("/dashboard");
            } else {
              console.error("Backend callback failed:", result);
              router.push("/login?error=backend_auth_failed");
            }
          } catch (err) {
            console.error("Auth callback exception:", err);
            router.push("/login?error=unknown");
          }
        }
      }
    );

    // Fallback: if no auth event fires within 10 seconds, redirect back
    const timeout = setTimeout(() => {
      if (!handled.current) {
        handled.current = true;
        console.error("OAuth callback timed out — no session received");
        router.push("/login?error=oauth_timeout");
      }
    }, 10000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255,255,255,0.15)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          animation: "spin 0.75s linear infinite",
        }}
      />
      <p style={{ color: "var(--text-secondary, #aaa)", fontSize: "0.95rem" }}>
        Completing sign-in…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
