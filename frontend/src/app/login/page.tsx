"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const payload = mode === "login" ? { email, password } : { name, email, password };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.user) {
        localStorage.setItem("forge_user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
      // On success, browser will redirect — no need to do anything here
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 800, letterSpacing: "0.08em" }}>
          FORGE
        </Link>

        <div style={{ marginTop: "1.2rem", marginBottom: "1.7rem" }}>
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: "0.45rem" }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            {mode === "login"
              ? "Sign in to continue your training journey."
              : "Join FORGE and unlock your next-level fitness experience."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.25rem" }}>
          <button
            type="button"
            className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {/* ── Google OAuth Button ── */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.65rem",
            padding: "0.75rem 1rem",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: googleLoading ? "not-allowed" : "pointer",
            transition: "background 0.2s, border-color 0.2s",
            marginBottom: "1.1rem",
            opacity: googleLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!googleLoading) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
          }}
        >
          {/* Google "G" SVG icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        {/* ── Divider ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.1rem",
            color: "var(--text-secondary, #666)",
            fontSize: "0.8rem",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          or continue with email
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.9rem" }}>
          {mode === "signup" && (
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
                Full name
              </label>
              <input
                className="auth-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ava Taylor"
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
              Email address
            </label>
            <input
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", marginBottom: "0.35rem", color: "var(--text-secondary)" }}>
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div style={{ color: "#fda4af", fontSize: "0.9rem", background: "rgba(255, 0, 0, 0.08)", padding: "0.7rem 0.8rem", borderRadius: "12px" }}>
              {error}
            </div>
          )}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </main>
  );
}
