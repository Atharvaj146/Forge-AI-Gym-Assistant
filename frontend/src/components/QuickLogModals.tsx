"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Dumbbell, Scale, Check, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

/* ───────────────────────────────────────────────────────────
   SHARED MODAL SHELL
─────────────────────────────────────────────────────────── */
function ModalShell({
  open,
  onClose,
  title,
  icon,
  accentColor,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-md)",
                    background: `${accentColor}15`,
                    border: `1px solid ${accentColor}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: accentColor,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-tertiary)",
                  transition: "all 0.2s ease",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────────────────────────────────────────
   LOG MEAL MODAL
─────────────────────────────────────────────────────────── */
export function LogMealModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [mealType, setMealType] = useState("breakfast");
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/nutrition/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          mealType,
          recipeId: "custom",
          portionGrams: parseInt(calories) || 200,
          mealName,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMealName("");
        setCalories("");
        onSuccess?.();
        onClose();
      }, 1200);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  const mealTypes = [
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "snacks", label: "Snack" },
  ];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Log a Meal"
      icon={<Utensils size={18} />}
      accentColor="#10B981"
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        {/* Meal Type */}
        <div>
          <label className="modal-label">Meal Type</label>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {mealTypes.map((mt) => (
              <button
                key={mt.value}
                type="button"
                onClick={() => setMealType(mt.value)}
                style={{
                  flex: 1,
                  padding: "0.55rem 0.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${mealType === mt.value ? "#10B981" : "var(--border)"}`,
                  background:
                    mealType === mt.value
                      ? "rgba(16, 185, 129, 0.1)"
                      : "transparent",
                  color:
                    mealType === mt.value
                      ? "#10B981"
                      : "var(--text-secondary)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {mt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Name */}
        <div>
          <label className="modal-label">What did you eat?</label>
          <input
            className="auth-input"
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="e.g. Grilled chicken with rice"
            required
          />
        </div>

        {/* Calories */}
        <div>
          <label className="modal-label">Estimated Calories</label>
          <input
            className="auth-input"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="e.g. 450"
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="modal-submit"
          style={{
            background: success
              ? "#10B981"
              : "linear-gradient(135deg, #10B981, #059669)",
          }}
        >
          {success ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Check size={16} /> Logged!
            </span>
          ) : loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </span>
          ) : (
            "Log Meal"
          )}
        </button>
      </form>
    </ModalShell>
  );
}

/* ───────────────────────────────────────────────────────────
   LOG WORKOUT MODAL
─────────────────────────────────────────────────────────── */
export function LogWorkoutModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [planName, setPlanName] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/workouts/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          planDayId: "manual",
          exerciseLogs: [],
          planName,
          durationMinutes: parseInt(duration) || 45,
          notes,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPlanName("");
        setDuration("");
        setNotes("");
        onSuccess?.();
        onClose();
      }, 1200);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Log a Workout"
      icon={<Dumbbell size={18} />}
      accentColor="#8B5CF6"
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label className="modal-label">Workout Name</label>
          <input
            className="auth-input"
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="e.g. Chest & Triceps"
            required
          />
        </div>

        <div>
          <label className="modal-label">Duration (minutes)</label>
          <input
            className="auth-input"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 45"
          />
        </div>

        <div>
          <label className="modal-label">Notes (optional)</label>
          <input
            className="auth-input"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did it go?"
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="modal-submit"
          style={{
            background: success
              ? "#8B5CF6"
              : "linear-gradient(135deg, #8B5CF6, #7C3AED)",
          }}
        >
          {success ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Check size={16} /> Logged!
            </span>
          ) : loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </span>
          ) : (
            "Log Workout"
          )}
        </button>
      </form>
    </ModalShell>
  );
}

/* ───────────────────────────────────────────────────────────
   UPDATE WEIGHT MODAL
─────────────────────────────────────────────────────────── */
export function UpdateWeightModal({
  open,
  onClose,
  currentWeight,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  currentWeight?: number;
  onSuccess?: () => void;
}) {
  const [weight, setWeight] = useState(currentWeight?.toString() || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/progress/weight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ weight: parseFloat(weight) }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
        onClose();
      }, 1200);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Update Weight"
      icon={<Scale size={18} />}
      accentColor="#3B82F6"
    >
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label className="modal-label">Current Weight (kg)</label>
          <input
            className="auth-input"
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 75.5"
            required
            style={{ fontSize: "1.5rem", fontWeight: 700, textAlign: "center", padding: "1rem" }}
          />
          {currentWeight && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
                marginTop: "0.4rem",
                textAlign: "center",
              }}
            >
              Previous: {currentWeight} kg
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="modal-submit"
          style={{
            background: success
              ? "#3B82F6"
              : "linear-gradient(135deg, #3B82F6, #2563EB)",
          }}
        >
          {success ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Check size={16} /> Updated!
            </span>
          ) : loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
              <Loader2 size={16} className="animate-spin" /> Saving...
            </span>
          ) : (
            "Update Weight"
          )}
        </button>
      </form>
    </ModalShell>
  );
}
