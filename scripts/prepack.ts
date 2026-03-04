/**
 * prepack.ts
 *
 * Runs automatically before `npm publish` or `changeset publish`.
 *
 * Gates (ALL must pass or publish is BLOCKED):
 *
 *  Gate 1 — publint
 *    Checks your package.json exports/main/types fields are
 *    correctly configured for ESM consumers (Vite, Webpack, Node ESM, etc).
 *    Catches silent misconfigs that break consumers but not you locally.
 *
 */

import fs from 'node:fs';
import path from 'node:path';
import { publint } from 'publint';
import { formatMessage } from 'publint/utils';

// ─── Config ──────────────────────────────────────────────────────────────────

// Use process.cwd() — always points to the package root
// when scripts are run via `pnpm run prepack` from the package directory
const root = process.cwd();
const pkgPath = path.join(root, 'package.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

const log = (msg: string) => console.log(`\n[prepack] ${msg}`);

const error = (msg: string): never => {
  console.error(`\n[prepack] ❌  ${msg}`);
  process.exit(1);
};

const divider = () => console.log('\n' + '─'.repeat(60));

// ─── Gate 1: publint ─────────────────────────────────────────────────────────
//
// publint checks that your package.json exports, main, and types
// fields are correctly configured for ESM-only consumption.
//
// Since this package ships ESM only ("type": "module"), publint
// validates that:
//   - "exports" entry points exist on disk and use .js extensions
//   - "types" condition appears before "default" in the exports map
//     (TypeScript resolves conditions in order — if "default" comes first,
//      TypeScript never sees your types)
//   - No "main" or "module" fields pointing to CJS output
//     (ESM-only packages should rely solely on "exports")
//   - File extensions are consistent with "type": "module"
//     (.js files are treated as ESM, no .cjs files needed)
//
// These mistakes are invisible locally because your own tooling
// resolves from source. They silently break in a consumer's project.

async function runPublint(): Promise<void> {
  divider();
  log('Gate 1: publint — checking package.json exports config...');

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const { messages } = await publint({ pkgDir: root, level: 'suggestion' });

  const errors = messages.filter((m) => m.type === 'error');
  const warnings = messages.filter((m) => m.type === 'warning');
  const suggestions = messages.filter((m) => m.type === 'suggestion');

  // Print all messages using publint's own formatter
  for (const message of messages) {
    console.log(formatMessage(message, pkg));
  }

  if (errors.length > 0) {
    error(
      `publint found ${errors.length} error(s) — fix them before publishing.\n` +
        `These issues will break your package in consumer projects.`
    );
  }

  if (warnings.length > 0) {
    log(
      `⚠️  publint found ${warnings.length} warning(s). Review them above.\n` +
        `   Warnings won't block publish but may cause issues for some consumers.`
    );
  }

  log(
    `✅ publint passed` +
      (suggestions.length > 0
        ? ` (${suggestions.length} suggestion(s) — see above)`
        : ` with no issues`)
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  console.log('\n');
  console.log('═'.repeat(60));
  console.log(`  📦 prepack — ${pkg.name}@${pkg.version}`);
  console.log('═'.repeat(60));

  await runPublint(); // Gate 1: package.json exports valid?

  divider();
  console.log('\n');
  console.log('═'.repeat(60));
  console.log(`  ✅ All gates passed — ${pkg.name}@${pkg.version} is ready to publish`);
  console.log('═'.repeat(60));
  console.log('\n');
}

main().catch((err) => {
  console.error('\n[prepack] Unexpected error:', err);
  process.exit(1);
});
