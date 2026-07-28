## 📋 PR Checklist

### Type of Change
- [ ] `feat` — New feature
- [ ] `fix` — Bug fix
- [ ] `refactor` — Code cleanup (no feature change)
- [ ] `chore` — Config, deps, build changes
- [ ] `docs` — Documentation only

### Branch
- [ ] Branched from `develop` (not `main`)
- [ ] Branch name follows: `feature/frontend/<name>` or `feature/backend/<name>`

### For Frontend PRs
- [ ] Tested at 375px (mobile) width
- [ ] Tested at 1280px (desktop) width
- [ ] No hardcoded API URLs (use `NEXT_PUBLIC_API_URL`)
- [ ] Components are in the right folder (`components/`, `app/`)

### For Backend PRs
- [ ] New/changed API endpoints are documented in this PR description
- [ ] Zod validation added for all request bodies
- [ ] No new Prisma migration without notifying the other dev
- [ ] Auth middleware applied to protected routes

### General
- [ ] `console.log` removed
- [ ] No `.env` files committed (use `.env.example`)
- [ ] Types updated in `shared/types.ts` if API shape changed

---

### What does this PR do?
_Brief description..._

### How to test
_Steps to verify the change..._

### Screenshots (if UI change)
_Paste screenshots here..._
