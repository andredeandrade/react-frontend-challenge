# INSTRUCTIONS

## 1. Project Requirements

Minimum requirements to run the project locally:

- Node.js 22.x (recommended, same major used in Docker build)
- pnpm (via Corepack)
- TMDB API token (Bearer token)

Optional requirements:

- Docker + Docker Compose (for containerized build and runtime)

## 2. Project Setup

### 2.1 Clone and enter the repository

```bash
git clone <repository-url>
cd react-frontend-challenge
```

### 2.2 Enable Corepack and install dependencies

```bash
corepack enable
pnpm install
```

## 3. Environment Variables

The app reads TMDB settings from Vite environment variables in `src/shared/lib/tmdb/tmdb-config.ts`.

Required variable:

- `VITE_TMDB_TOKEN`: TMDB Bearer token used in API requests

Optional variables (defaults already exist in code):

- `VITE_TMDB_BASE_URL` (default: `https://api.themoviedb.org/3`)
- `VITE_TMDB_IMAGE_BASE_URL` (default: `https://image.tmdb.org/t/p`)

### 3.1 Create local environment file

Create a `.env` file in the project root:

```bash
VITE_TMDB_TOKEN=YOUR_TMDB_BEARER_TOKEN
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Notes:

- Vite only exposes variables prefixed with `VITE_` to the frontend.
- Never commit real tokens to version control.

## 4. Development Commands

### 4.1 Run development server

```bash
pnpm dev
```

Starts Vite dev server with HMR.

### 4.2 Lint

```bash
pnpm lint
```

Runs ESLint for the entire project.

### 4.3 Run tests

```bash
pnpm test
```

Runs Vitest in run mode.

### 4.4 Watch tests

```bash
pnpm test:watch
```

Runs Vitest in watch mode.

### 4.5 Preview production build

```bash
pnpm preview
```

Serves the already generated `dist` build locally.

### 4.6 Type check only (manual)

```bash
pnpm exec tsc --noEmit --pretty false
```

Useful for CI-like validation.

## 5. Build Process

Production build command:

```bash
pnpm build
```

Current build pipeline from `package.json`:

1. `tsc -b` compiles and type-checks TypeScript projects
2. `vite build` creates optimized frontend assets in `dist`

Build output:

- Static files generated under `dist/`

## 6. Testing Instructions

Testing stack:

- Vitest
- React Testing Library
- jsdom test environment

Current test configuration is in `vite.config.ts`:

- `globals: true`
- `environment: jsdom`
- `setupFiles: ./src/test/setup.ts`
- `css: true`

Test setup file `src/test/setup.ts`:

- Registers `@testing-library/jest-dom`
- Cleans up DOM after each test

Example test locations currently in repository:

- `src/features/auth/lib/auth-service.test.ts`
- `src/features/auth/model/auth.store.test.ts`
- `src/shared/lib/validation/login-schema.test.ts`

## 7. Docker Instructions

The repository includes a multi-stage Dockerfile and docker-compose.

### 7.1 Build and run with Docker Compose

```bash
docker compose up --build
```

Then open:

- http://localhost:8080

### 7.2 Stop containers

```bash
docker compose down
```

### 7.3 Docker architecture summary

- Builder stage: `node:22-alpine`
  - Enables Corepack
  - Installs deps with pnpm
  - Runs `pnpm build`
- Runner stage: `nginx:1.27-alpine`
  - Serves static files from `dist`
  - Uses SPA fallback config (`try_files ... /index.html`)

Important note for Docker builds:

- Build needs environment variables at build time (especially `VITE_TMDB_TOKEN`) because Vite injects env values during build.

If needed, pass build args or environment in your compose workflow before running build.

## 8. Available Scripts

Scripts from `package.json`:

- `dev`: starts Vite dev server
- `build`: runs TypeScript project build then Vite production build
- `lint`: runs ESLint
- `test`: runs Vitest once
- `test:watch`: runs Vitest in watch mode
- `preview`: serves production build locally

## 9. Project Setup and Execution Checklist

1. Install Node 22 and enable Corepack
2. Install dependencies with `pnpm install`
3. Configure `.env` with `VITE_TMDB_TOKEN`
4. Run `pnpm dev`
5. Validate quality with `pnpm lint`, `pnpm test`, and type-check command
6. Generate release build with `pnpm build`
7. (Optional) Run in Docker using `docker compose up --build`
