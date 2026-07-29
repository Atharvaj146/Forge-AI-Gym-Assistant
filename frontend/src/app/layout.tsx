import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORGE — Train Smarter. Lift Better. Become Stronger.",
  description:
    "FORGE is your AI-powered fitness co-pilot. Get personalised workout plans, real-time form correction via AI CAM, smart nutrition tracking, and adaptive coaching — all in one platform.",
  keywords: ["fitness app", "AI workout", "personalised training", "nutrition tracker", "AI coach"],
  openGraph: {
    title: "FORGE — AI-Powered Fitness Platform",
    description: "Train Smarter. Lift Better. Become Stronger.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
