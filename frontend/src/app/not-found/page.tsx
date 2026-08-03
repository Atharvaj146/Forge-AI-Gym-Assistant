import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <p style={{ color: "#8B5CF6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.8rem" }}>
          Route unavailable
        </p>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>
          This page is not ready yet
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
          Your authentication flow is working, and this is now the destination after successful login or signup.
        </p>
        <Link href="/" style={{ display: "inline-block", padding: "0.8rem 1.2rem", borderRadius: "9999px", background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", color: "white", textDecoration: "none", fontWeight: 700 }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
