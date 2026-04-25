@AGENTS.md

# HireFlow Candidate Frontend — Development Rules

## Architecture

### Page files (`app/**/page.tsx`)
Only high-level section components — no direct markup or logic.

```tsx
// ✅ GOOD
export default function OnboardingPage() {
  return <CandidateOnboardingSection />;
}
```

### Hooks (`hooks/`)
All state, effects, and API calls go here — nothing before the `return` in a component.

### Types (`types/`)
All TypeScript interfaces/types live here — never inline in component files.

### Server-first
- Data fetching, auth checks → server side (`lib/dal.ts`)
- UI state, file pickers, tag inputs, animations → client side (`"use client"`)

---

## Styling

### Tailwind CSS v4
All colors go in `app/globals.css` under `@theme`. Use semantic tokens, not raw values.

---

## Folder structure

```
app/                     # Next.js pages (section components only)
  actions/               # Server actions (auth.ts, onboarding.ts)
  (dashboard)/           # Protected layout — redirects unauthenticated users
  auth/                  # Auth pages (sign-in, sign-up, onboarding)
components/
  auth/                  # AuthShell, AuthField, AuthPrimaryButton, sections/
  layout/candidate/      # Sidebar, Header
lib/
  dal.ts                 # server-only, React.cache — only place server components fetch data
types/                   # All TypeScript definitions (auth.ts, etc.)
app/globals.css          # Design tokens (@theme)
```

---

## Data Access Layer (DAL) — `lib/dal.ts`

The DAL is the **only** place server components fetch from the API. It is `server-only` and uses `React.cache` for per-request deduplication.

```ts
// ✅ CORRECT — server component reads from the DAL
import { getSession } from "@/lib/dal";
const user = await getSession();
```

```ts
// ❌ WRONG — raw fetch inside a page or component
const res = await fetch("/api/auth/me");
```

---

## API calls

| Use case | Where |
|---|---|
| Server-side reads (page/layout) | `lib/dal.ts` |
| Mutations (sign-in, sign-up, onboarding) | `app/actions/*.ts` server actions |
| Client-side reads | `hooks/use*.ts` via `fetch('/api/...')` |

Never call `fetch` directly inside a component or page.

---

## Auth routes

```
POST /api/auth/register                → { role: "APPLICANT", email, password, firstName, lastName }
POST /api/auth/login                   → { email, password }
POST /api/auth/onboarding/candidate    → multipart/form-data (firstName, lastName, location, interests, resume PDF)
GET  /api/auth/me                      → returns AuthUser
```

## Key principles

1. Separation of concerns — logic in hooks/DAL/actions, markup in components
2. Type safety — all types in `types/` folder
3. Server first — DAL for all server reads, actions for all mutations
4. No API calls in components — always via DAL, hooks, or server actions
