# 🏋️ FORGE — AI-Powered Fitness Platform

> Train Smarter. Lift Better. Become Stronger.

---

## 📁 Project Structure

```
forge/
├── frontend/        ← Next.js 14 (App Router, TypeScript, Tailwind, Shadcn/UI)
├── backend/         ← Node.js + Express (TypeScript, Prisma, PostgreSQL)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- pnpm (`npm i -g pnpm`)
- PostgreSQL (or Supabase account)

### 1. Clone & Install

```bash
git clone <repo-url>
cd forge

# Install frontend deps
cd frontend && pnpm install

# Install backend deps
cd ../backend && pnpm install
```

### 2. Environment Setup

```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

### 3. Run Dev Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend && pnpm dev

# Terminal 2 — Frontend (port 3000)
cd frontend && pnpm dev
```

---

## 🌿 GitHub Branching Strategy

```
main
 └── develop
       ├── feature/frontend/<feature-name>   ← Frontend dev
       ├── feature/backend/<feature-name>    ← Backend dev
       └── feature/shared/<schema-or-types>  ← Both agree first
```

### Branch Rules
| Branch | Purpose | Who merges |
|--------|---------|------------|
| `main` | Production code | PR with 1 review |
| `develop` | Integration branch | PR with 1 review |
| `feature/*` | Individual features | PR into develop |

### Daily Workflow
```bash
# Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/frontend/home-page

# Work... commit...
git add .
git commit -m "feat: add hero section to home page"
git push origin feature/frontend/home-page

# Open PR → develop (never directly to main)
```

---

## 👥 Team Responsibilities

| Area | Frontend Dev | Backend Dev |
|------|-------------|-------------|
| **Owns** | `frontend/` | `backend/` |
| **Shared** | API types / contracts (agree before coding) | Same |
| **Never touch** | `backend/prisma/` without discussion | `frontend/components/` |

---

## 📋 Tech Stack

### Frontend
- **Next.js 14** — App Router, SSR/SSG
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **Shadcn/UI** — Accessible component library
- **TanStack Query** — Server state management
- **Zustand** — Client state (auth, UI)
- **Framer Motion** — Animations
- **Recharts** — Progress charts
- **React Hook Form + Zod** — Forms & validation

### Backend
- **Express.js** — REST API server
- **TypeScript** — Full type safety
- **Prisma** — ORM + database migrations
- **PostgreSQL** — Primary database
- **JWT (jsonwebtoken)** — Authentication
- **bcryptjs** — Password hashing
- **Zod** — Request validation

---

## 📅 Build Phases (6 Weeks)

| Week | Frontend | Backend |
|------|---------|---------|
| 1 | Home page + Auth UI + Onboarding | Prisma schema + Auth API |
| 2 | Workout page + Dashboard | Workout API + AI plan generator |
| 3 | Nutrition page + meal log UI | Nutrition API + diet filter |
| 4 | Progress charts + chatbot widget | Progress API + chatbot proxy |
| 5 | AI CAM shell + Pricing page | AI CAM stubs + Razorpay billing |
| 6 | Polish, responsive QA, accessibility | Rate limiting, error handling, logging |
