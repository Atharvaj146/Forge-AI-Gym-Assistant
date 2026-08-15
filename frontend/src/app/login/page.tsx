"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation before hitting the server
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (mode === "signup" && name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

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

      if (!res.ok) {
        // Handle Zod validation errors (array of field errors)
        if (data.errors && Array.isArray(data.errors)) {
          const messages = data.errors.map((e: { message: string }) => e.message).join(" ");
          throw new Error(messages);
        }
        throw new Error(data.message || "Authentication failed. Please check your credentials.");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
