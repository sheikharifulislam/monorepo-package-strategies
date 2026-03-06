# Monorepo Package Strategies

A hands-on reference monorepo that demonstrates the four most common package strategies used in JavaScript/TypeScript monorepos. Each strategy is implemented as a real working package and consumed by a Next.js app so you can see exactly how each approach behaves in practice.

## Purpose

When building a monorepo, one of the most consequential decisions you make is how each internal package exposes its code to consumers. Do you ship raw TypeScript source? Pre-compiled JavaScript? Both? The answer affects build speed, HMR performance, caching, type-checking, and publishability.

This repo answers that question by giving you four concrete, runnable examples — one per strategy — so you can compare them side by side and understand the real tradeoffs before making that decision in your own project.

## What Is Inside

```
monorepo-package-strategies/
├── apps/
│   └── web/                          # Next.js 16 consumer app
└── packages/
    ├── utils-jit/                    # Strategy 1: Just-in-Time
    ├── utils-compiled/               # Strategy 2: Compiled
    ├── utils-publishable/            # Strategy 3: Publishable
    ├── utils-jit-compiled-combine/   # Strategy 4: JIT + Compiled hybrid
    ├── lint-config/                  # Shared ESLint + other lint config
    └── typescript-config/            # Shared TypeScript config
```

**Tooling:** pnpm workspaces, Turborepo, Rslib, TypeScript 5.9, ESLint 9, Husky, Commitlint.

---

## The App (`apps/web`)

A Next.js 16 application that imports and uses all four utility packages. It serves as the live consumer that proves each strategy actually works.

### Home Page (`/`)

Renders four navigation links — one for each package strategy demo page. It is the entry point for exploring the examples.

### Strategy Pages

Each sub-page imports the `sum` function from its corresponding package, calls `sum(10, 11)`, and displays the result alongside an explanation of how that package strategy works under the hood.

| Route | Package consumed | What it shows |
|---|---|---|
| `/just-in-time-package` | `@my-workspace/utils-jit` | Package source is compiled by the consumer app at build time — no build step in the package itself |
| `/compiled-package` | `@my-workspace/utils-compiled` | Package ships pre-compiled `dist/index.js`; the consumer app never sees TypeScript |
| `/publishable-package` | `@my-workspace/utils-publishable` | Same as compiled, plus a `prepack` script and extra config needed to publish to npm |
| `/jit-compiled-combine-package` | `@my-workspace/utils-jit-compiled-combine` | Conditional exports: `src/index.ts` in development, `dist/index.js` in production |

---

## The Packages

### 1. `@my-workspace/utils-jit` — Just-in-Time

> [Detailed explanation](./packages/utils-jit/README.md)

No build step. The `exports` field in `package.json` points directly to `src/index.ts`. The consumer app's bundler compiles the TypeScript source as part of its own build — the package just hitchhikes along for the ride.

**Best for:** Internal-only packages where both sides use TypeScript and fast HMR matters.
**Avoid when:** You want build caching, the consumer doesn't handle TypeScript, or you plan to publish to npm.

---

### 2. `@my-workspace/utils-compiled` — Compiled

> [Detailed explanation](./packages/utils-compiled/README.md)

Has its own build step powered by **Rslib**. The `exports` field points to `dist/index.js`. The package compiles itself to JavaScript before the consumer ever touches it, so the consumer doesn't need to know or care what language the package was written in.

**Best for:** Cross-language setups (e.g. TypeScript package consumed by a JS app), TypeScript path aliases, build output caching.
**Avoid when:** Both sides use the same language and you want the simplest possible setup, or when fast HMR in dev is a priority.

---

### 3. `@my-workspace/utils-publishable` — Publishable

> [Detailed explanation](./packages/utils-publishable/README.md)

A compiled package with extra steps for public distribution. Adds a `prepack` script that validates the package before it is packed, and is configured for tools like **Changesets** to handle semantic versioning and changelog generation. Workspace references (`workspace:*`) must be replaced with real version numbers before publishing — Changesets handles this automatically.

**Best for:** Packages you intend to publish to npm or a private registry for external teams to consume.
**Avoid when:** The package is purely internal — the versioning overhead is not worth it.

---

### 4. `@my-workspace/utils-jit-compiled-combine` — JIT + Compiled Hybrid

> [Detailed explanation](./packages/utils-jit-compiled-combine/README.md)

Uses **conditional exports** to serve different entry points depending on the environment:

```json
"exports": {
  ".": {
    "development": "./src/index.ts",
    "default":     "./dist/index.js"
  }
}
```

The consumer app's `tsconfig.json` sets `customConditions: ["development"]`, which tells the TypeScript resolver to prefer the `development` condition during dev. In production builds the `default` condition kicks in and the compiled output is used instead.

**Best for:** Packages that are used internally during development (where you want JIT speed) but also need to be published or distributed in compiled form.
**Avoid when:** The added configuration complexity isn't justified — if you only need one mode, pick JIT or Compiled alone.

---

### Shared Infrastructure

| Package | Purpose |
|---|---|
| `@my-workspace/lint-config` | Shared ESLint (base, Next.js, React) and other configs |
| `@my-workspace/typescript-config` | Shared `tsconfig` presets (base, Next.js, React library) |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9

### Clone

```bash
git clone https://github.com/your-username/monorepo-package-strategies.git
cd monorepo-package-strategies
```

### Install dependencies

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

This starts the Next.js app at [http://localhost:3000](http://localhost:3000) via Turborepo. All packages that support a `dev` mode (watch mode compilation) will also start.

### Build

```bash
pnpm build
```

Turborepo builds all packages in the correct dependency order before building the app.

### Other commands

```bash
pnpm lint          # Lint all packages and the app
pnpm check-types   # Type-check everything
pnpm format        # Format all .ts, .tsx, .md files with Prettier
pnpm clean         # Remove all build artifacts and node_modules
```
