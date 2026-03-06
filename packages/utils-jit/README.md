### Just-in-Time Packages

A **Just-in-Time (JIT) package** is an internal monorepo package that has **no build step of its own**. Instead of being pre-compiled, it gets compiled by whichever app consumes it — that's the whole idea behind the name "just in time."

### Think of It Like a Well-Organized Folder — With a Superpower

In a regular project, you naturally split your code into folders to stay organized. You might have a `utils/` folder, a `hooks/` folder, a `components/` folder — and import between them using relative paths:

```jsx
// Regular folder-based import (relative path)
import { sum } from '../../utils'
```

A JIT package feels almost exactly like this. You're creating a well-organized home for your reusable code — no complex build pipeline, no `dist/` folder, no pre-compilation required. Just write your source files and export them directly.

The meaningful difference is **how you import it**. In a monorepo, instead of using fragile relative paths like `../../..`, you import it like a proper npm package:

```jsx
// Monorepo workspace package import
import { sum } from '@my-workspace/utils'
```

That `@my-workspace/utils` isn't an external library from npm — it's your own package living right inside the monorepo. The package manager (npm, yarn, or pnpm workspaces) symlinks it into `node_modules` automatically, so the import syntax looks and behaves exactly like any other third-party dependency.

### How Does This Actually Work?

The magic lives in the `package.json` of your JIT package. Instead of pointing to compiled output in a `dist/` folder, the `exports` field points directly to your TypeScript source files:

No `build` Script needed. When your app builds, its bundler (Vite, webpack, Turbopack — whatever you're using) picks up those source files and compiles them as part of the app's own build process. The package just hitches a ride.

### When to Use JIT

- When you want to skip the build and configuration overhead entirely
- When you're comfortable letting the consumer application handle all transpilation
- When fast **HMR (Hot Module Replacement)** in development is a priority

### When to Avoid JIT

- When you want to **cache the package's build output** to speed up future builds — JIT packages have no build step, so there's nothing for tools like Turborepo to cache
- When your package is written in TypeScript, but the consumer app **doesn't handle TypeScript transpilation** — the build will simply fail
- When you need `compilerOptions.paths` in TypeScript at the package level
- When you plan to **publish the package to npm** — JIT packages export raw TypeScript source, which isn't suitable for public distribution without a proper compile step