### Compiled Packages

Suppose you're a coffee-lover software engineer — like me. Without coffee, you simply can't focus or write good code. So naturally, being the coffee enthusiast you are, you decide to write a new monorepo package in CoffeeScript. But there's a problem: your consumer app is built with JavaScript. The app is just like your Beloved girlfriend; you have to give her what she wants. so without javascript the app doesn't accept anything.

So what's the solution?

Don't jump straight to the technical answer yet. Think about it as a real-life problem first. Imagine your girlfriend wants ice cream, but you want coffee — and there's only one choice on the table. Also, keep in mind she's *very* particular about what she wants. What do you do?

I think you will give her what she wants. Obviously.

The moment you do that, all the tension disappears. Now apply that same thinking to the technical problem. You are the package, and your consumer app is the girlfriend. So instead of handing her raw CoffeeScript she can't work with, you **convert it into something she actually accepts — JavaScript.** Use a compiler or transpiler to transform your source code into clean output before it ever reaches the consumer app. Think of it like proposing with a diamond ring - need extra effort, time, and cost, for exactly the way she wants to.

That's the core idea behind the **Compiled Package** strategy: instead of exporting raw source code, you export the *compiled or transpiled output*. The package takes responsibility for its own build step, so the consumer app doesn't have to deal with any of it.

### When to Use Compiled Packages

- When the package and the consumer app use **different languages** (e.g., a TypeScript package consumed by a JavaScript app)
- When you want to export **compiled output** rather than raw source
- When you need TypeScript **path aliases** via `compilerOptions.paths`
- When you plan to **publish the package to npm**
- When you want to **cache the package's build output** to speed up future builds

### When to Avoid Compiled Packages

- When the package and the consumer app use **the same language** — if both are JavaScript, compiling adds overhead without real benefit
- When the package is **purely for internal use,** and you have no plans to publish it
- When fast **HMR in dev mode** is a priority — every code change triggers a recompile of the package, which slows down the dev server and increases memory and CPU usage