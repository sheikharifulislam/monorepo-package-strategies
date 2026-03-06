### Combining JIT and Compiled Packages

You now understand the JIT and compiled strategies individually. This fourth approach **combines both** — and in the right scenario, it's the most powerful of all.

The concept is simple: **use Just-in-Time in dev mode, and switch to the Compiled strategy at build or publish time.** Two strategies, one package, each doing its job at the right moment.

### Why Would You Need This?

Say your monorepo has one app and one package, both written in TypeScript. You want to use the package internally *and* publish it to npm for public use.

Your first instinct might be to use JIT — no build config, no compilation overhead, everything is simple. And for internal development, that's fine.

But here's the problem: **once you publish to npm, you lose control over who uses your package.** Someone might pull it into a plain JavaScript project, and since your package ships raw TypeScript, it simply won't work for them. So you need to compile it before publishing.

"Fine," you think, "I'll just use the Compiled strategy." But as you already know, that comes with a real dev cost — every code change triggers a recompile, your dev server slows down, and HMR becomes sluggish.

**So combine both.** In dev mode, treat the package as a JIT package — no compilation, instant feedback, fast HMR. When it's time to build or publish, switch to the Compiled strategy and produce clean JavaScript output that any project can consume.

**You get the best of both worlds: a smooth development experience *and* a production-ready package.**

The key is in the `exports` field: the `"development"` condition resolves to the raw TypeScript source, while the `"default"` condition resolves to the compiled output. Bundlers and runtimes that support conditional exports will automatically pick the right one depending on the environment.