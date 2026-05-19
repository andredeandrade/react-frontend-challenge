# CineDash Architecture

## 1. Purpose
This document explains the architectural decisions, project organization, and implementation patterns used in CineDash.

CineDash is a React + TypeScript application for movie discovery and curation powered by TMDB.

## 2. Tech Stack
- React 19 + TypeScript (strict)
- Vite
- React Router
- TanStack Query
- Zustand
- TailwindCSS + shadcn/ui
- React Hook Form + Zod
- Vitest + React Testing Library

## 3. Project Structure
The project follows a Feature-Sliced Design inspired structure:

- `src/app`: app composition, top-level layouts, routing, providers
- `src/pages`: route-level pages (Discovery, Trending, Popular, Watchlist, Movie Details, Login)
- `src/widgets`: page-level compositions (lists and section-level UI)
- `src/features`: business features (currently auth)
- `src/entities`: domain entities and their API/hooks/model/ui (movie)
- `src/shared`: reusable infrastructure and UI primitives (store, libs, design-system components)

Typical flow by dependency direction:
- `shared` -> `entities` -> `features` -> `widgets` -> `pages` -> `app`

## 4. Feature-Sliced Design Approach
We use FSD principles to keep responsibilities explicit:

- `entities/movie` owns movie domain contracts, API access, state hooks, and entity-level UI (`MovieCard`).
- `features/auth` owns login/session business rules and route guards.
- `widgets/*-list` compose entity components and loading/error/empty states for page sections.
- `pages/*` focus on route-level orchestration and page semantics.
- `app/*` is the composition root (router, layouts, providers).

Why this helps:
- Better scalability for adding new movie sections (Trending, Popular, Upcoming, etc.).
- Stronger boundaries between business logic and presentation.
- Easier testing and refactoring per layer.

## 5. State Management Decisions
State is split by ownership:

### 5.1 Server State (TanStack Query)
Used for remote data from TMDB:
- discover, search, popular, trending, top-rated, upcoming
- movie details, credits, videos
- genre dictionary

Reasons:
- Built-in caching, request deduplication, retries, stale management.
- Infinite pagination support via `useInfiniteQuery`.

Global defaults (`shared/lib/react-query/query-client.ts`):
- `staleTime`: 1 minute
- `gcTime`: 10 minutes
- `refetchOnWindowFocus`: false
- `retry`: 1

### 5.2 Client State (Zustand)
Used for local UI/business state:
- `features/auth/model/auth.store.ts`: auth session + status/error
- `entities/movie/model/watchlist.store.ts`: watchlist movies
- `shared/store/app.store.ts`: app UI state (theme, sidebar)

Reasons:
- Simple, typed, low boilerplate.
- Predictable local behavior without mixing with server cache.

## 6. Authentication Flow
Authentication is local/fake auth for challenge context, but modeled as real session flow.

Flow:
1. User submits login form (`features/auth/ui/login-form.tsx`) validated by Zod.
2. `auth.store.login` calls `createSession` (`features/auth/lib/auth-service.ts`).
3. Session token/user are generated and persisted in local storage.
4. `ProtectedRoute` checks auth state and persistence hydration before allowing private routes.
5. `PublicRoute` redirects authenticated users away from login to `/descobrir`.
6. `logout` clears session and resets auth state.

Hydration strategy:
- Route guards wait for Zustand persist hydration (`onHydrate`/`onFinishHydration`) to avoid incorrect redirects during startup.

## 7. API Integration Strategy
API access is centralized and typed.

### 7.1 TMDB Client
- `shared/lib/tmdb/tmdb-client.ts`
- Uses a single `tmdbClient.get` wrapper over `fetch`
- Sends bearer token and JSON headers
- Throws typed `TmdbApiError` for non-2xx responses

### 7.2 Domain API Layer
- `entities/movie/api/movie.api.ts`
- Exposes focused functions (`getDiscoveredMovies`, `getTrendingMovies`, `getMovieDetails`, `getMovieCredits`, `getMovieVideos`, etc.)
- Applies common params (`language`, filters, paging)

### 7.3 Typed Contracts
- `entities/movie/model/movie.types.ts`
- Request/response shapes are explicit (Movie, MovieDetails, MovieCredits, MovieVideos, paginated envelope)

## 8. Routing Architecture
Router is declared in `app/routes/router.tsx` with nested layouts and guards:

- Root layout: Query provider + global toaster + devtools
- Public branch:
  - `/` -> login page
- Protected branch (inside app shell):
  - `/descobrir`
  - `/em-alta`
  - `/populares`
  - `/filmes/:movieId`
  - `/minha-lista`
- Wildcard -> redirect to `/`

Layout composition:
- `RootLayout`: query context + theme application + toaster
- `AppLayout`: sidebar + header + scrollable content outlet
- `AuthLayout`: login shell for public route

## 9. Reusable Component Strategy
Reusable components are concentrated under `shared/ui` and entity-level reusable blocks under `entities/*/ui`.

### 9.1 Shared UI primitives
Examples:
- button, card, field, inputs, password input
- table-like pieces in pages when needed
- skeleton/loading placeholders
- toaster wrapper (`shared/ui/sonner.tsx`)

### 9.2 Reusable list building blocks
- `shared/ui/list/*`: common page title/description and filter container pieces
- Discovery/Trending/Popular widgets reuse card-grid and loading/error/empty patterns

### 9.3 Composition over monoliths
Pages compose:
- semantic page header
- one or more widgets
- domain actions (watchlist toggle, sorting, etc.)

## 10. Persistence Strategy
Persistence uses Zustand `persist` with `localStorage`.

Shared helper:
- `shared/store/base/create-persisted-store.ts`

Persisted slices:
- Auth store: session + isAuthenticated
- App store: theme (sidebar state intentionally not persisted as open)
- Watchlist store: full watchlist array

Rules:
- Use `partialize` where only subset should persist.
- Keep sensitive behavior local to challenge context (no real backend auth tokens).

## 11. Performance Decisions
Key choices to keep UI responsive and network efficient:

- TanStack Query caching and stale-time tuning to reduce redundant requests.
- Infinite scrolling for large lists (Discovery, Popular, Trending) using `useInfiniteQuery`.
- Movie deduplication across paginated pages via `Set` by movie id.
- `useMemo` for derived collections (mapped rows, filtered lists, genre labels).
- Skeleton placeholders for perceived performance.
- Lazy-loaded poster images (`loading="lazy"` in movie card).
- `refetchOnWindowFocus: false` to avoid noisy refetches while navigating.

## 12. Current Tradeoffs and Next Evolution
Tradeoffs:
- Auth is mocked and local-only.
- Some pages still include in-file table primitives that can be extracted to shared UI.

Potential next steps:
- Add centralized error boundary/reporting strategy.
- Add request cancellation strategy in heavy list views.
- Add contract tests for API layer and route-guard behavior.
- Introduce code-splitting by route for faster initial load.

## 13. Delivery Workflow Note
Project planning and execution were managed through GitHub Projects tasks (board-based tracking), with features delivered incrementally (Discovery refactor, Watchlist, Details enhancements, Trending/Popular pages, pagination, and navigation updates).
