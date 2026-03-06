### Publishable Packages

A publishable package is essentially a compiled package — **but with extra steps on top**. Think of it as a compiled package that's getting dressed up and prepared to meet the world outside your monorepo.

When a package only lives inside your monorepo, you have full control. But the moment you publish it to a registry like npm, everything changes. You don't know who will consume it, what framework they're using, what Node version they're running, or whether they're working in TypeScript or plain JavaScript. That uncertainty is exactly why publishable packages require more careful configuration than a typical internal compiled package.

### The Versioning Problem

Inside a monorepo, packages reference each other using workspace syntax:

```json
"@my-workspace/utils": "workspace:*"
```

That wildcard tells your package manager to use whatever local version is in the repo. But npm has no idea what your local workspace looks like — it expects a real, pinned version number like `"1.2.0"`. So before publishing, **every workspace reference must be replaced with an actual version**.

Doing this manually is painful and error-prone. This is where tooling becomes essential. **Changesets** is the most widely adopted solution for this in the JavaScript ecosystem. It handles the full publishing workflow: tracking which packages changed, bumping versions correctly, generating changelogs, and replacing workspace references with real version numbers before the package hits the registry.

In short — if a compiled package is the product, a publishable package is **that same product boxed, labeled, and ready to ship to anyone in the world**.

### When to Use Publishable Packages

- When you want to **share a package publicly** via npm or any other package registry
- When **external teams or open source users** will be consuming your package
- When you need **proper semantic versioning** and a public changelog

### When to Avoid Publishable Packages

- When the package is **only used internally** within your monorepo — the extra versioning and publishing overhead isn't worth it
- When your team isn't ready to commit to a **versioning discipline** — publishing without a proper release workflow leads to messy version histories and broken consumers