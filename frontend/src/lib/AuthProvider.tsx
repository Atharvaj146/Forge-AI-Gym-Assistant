"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface UserProfileData {
  goal: string;
  experienceLevel: string;
  height: number;
  weight: number;
  age: number;
  sex: string;
  dietaryPreference: string;
  location: string;
  equipment: string[];
  onboardingDone: boolean;
  subscriptionTier?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfileData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  logout: async () => {},
  refreshProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("forge_user");
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore parse error
      }
    }
    return null;
  });
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        // If cookie is invalid, check if we had a local session
        return;
      }

      const data = await res.json();
      if (data.success && data.user) {
        const authUser: AuthUser = {
          id: data.user.id,
          name: data.user.name || "Member",
          email: data.user.email,
        };
        setUser(authUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("forge_user", JSON.stringify(authUser));
        }
      }
    } catch {
      // Keep local state if available
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setProfile({
            goal: data.user.goal || "general_fitness",
            experienceLevel: data.user.experience || "beginner",
            height: data.user.height || 175,
            weight: data.user.weight || 75,
            age: data.user.age || 25,
            sex: data.user.sex || "male",
            dietaryPreference: data.user.dietaryPreference || "non_vegetarian",
            location: data.user.location || "gym",
            equipment: data.user.equipment || [],
            onboardingDone: data.user.onboardingDone ?? true,
            subscriptionTier: data.user.subscriptionTier || "basic",
          });
        }
      }
    } catch {
      // Profile fetch failed — keep existing state
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Logout endpoint failed — clear local state anyway
    }
    setUser(null);
    setProfile(null);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (user) {
      refreshProfile();
    }
  }, [user, refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
