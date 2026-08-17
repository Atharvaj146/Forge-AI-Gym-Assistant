"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/AuthProvider";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Camera,
  TrendingUp,
  Bell,
  LogOut,
  Crown,
  User,
} from "lucide-react";
import { ComingSoonModal, ComingSoonFeatureType } from "@/components/ComingSoonModal";

const navLinks: { label: string; href: string; icon: typeof LayoutDashboard; featureKey?: ComingSoonFeatureType }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workout", href: "#", icon: Dumbbell, featureKey: "workout" },
  { label: "Nutrition", href: "#", icon: Utensils, featureKey: "nutrition" },
  { label: "AI CAM", href: "#", icon: Camera, featureKey: "aicam" },
  { label: "Progress", href: "#", icon: TrendingUp, featureKey: "progress" },
];

const tierColors: Record<string, string> = {
  basic: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  hardcore: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function DashboardNavbar({
  onFeatureClick,
}: {
  onFeatureClick?: (feature: ComingSoonFeatureType) => void;
}) {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const [internalModal, setInternalModal] = useState<ComingSoonFeatureType>(null);

  const handleLogout = async () => {
    await logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("forge_user");
    }
    window.location.href = "/login";
  };

  const handleNavClick = (e: React.MouseEvent, item: (typeof navLinks)[0]) => {
    if (item.featureKey) {
      e.preventDefault();
      if (onFeatureClick) {
        onFeatureClick(item.featureKey);
      } else {
        setInternalModal(item.featureKey);
      }
    }
  };

  const tier = profile?.subscriptionTier || "basic";
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const displayName = user?.name || (user?.email ? user.email.split("@")[0] : "Member");

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 1rem",
        }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(18, 19, 26, 0.92)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "9999px",
            padding: "0.35rem 0.5rem 0.35rem 0.75rem",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(139, 92, 246, 0.08)",
            maxWidth: 1080,
            width: "95%",
            margin: "0 auto",
          }}
        >
          {/* FORGE Logo */}
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              paddingRight: "0.75rem",
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
                color: "#FFFFFF",
              }}
            >
              FORGE
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.15rem",
              overflow: "hidden",
            }}
          >
            {navLinks.map((item) => {
              const isActive = item.href === "/dashboard" && pathname === "/dashboard";
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 500,
                    padding: "0.4rem 0.65rem",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: isActive ? "rgba(139, 92, 246, 0.12)" : "transparent",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon
                    size={14}
                    style={{
                      color: isActive ? "#8B5CF6" : "var(--text-tertiary)",
                      flexShrink: 0,
                    }}
                  />
                  <span className="nav-label-text">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side: User Info + Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {/* Notification Bell */}
            <button
              onClick={() => {
                if (onFeatureClick) onFeatureClick("coach");
                else setInternalModal("coach");
              }}
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
              title="Notifications"
            >
              <Bell size={14} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#8B5CF6",
                }}
              />
            </button>

            {/* Tier Badge */}
            <div
              className={`${tierColors[tier] || tierColors.basic}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "9999px",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                border: "1px solid",
              }}
            >
              <Crown size={10} />
              {tierLabel}
            </div>

            {/* User Avatar + Real Name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span
                className="nav-user-name"
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                }}
              >
                {displayName}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "9999px",
                padding: "0.35rem 0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                cursor: "pointer",
                color: "var(--text-secondary)",
                fontSize: "0.72rem",
                fontWeight: 600,
                transition: "all 0.2s ease",
              }}
              title="Sign Out"
            >
              <LogOut size={12} />
              <span className="nav-label-text">Logout</span>
            </button>
          </div>
        </motion.nav>
      </div>

      <ComingSoonModal feature={internalModal} onClose={() => setInternalModal(null)} />
    </>
  );
}
