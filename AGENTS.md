# AGENTS.md

## Project guidelines

This project was initially generated with `@raulmoracode/create`.

Treat the current repository state as the source of truth. Do not assume that the original scaffold configuration, dependencies, scripts, or architecture are still unchanged.

Before making changes, inspect the existing codebase and its configuration.

## Skills

How to work on this repository — inspect the codebase, choose the smallest change, validate it and report the result — lives in the shared @raulmoracode skills catalog:

https://raulmoracode.github.io/raulmoracode-skills/

`.opencode/opencode.json` loads that catalog for this project.

Start non-trivial work with the `raulmoracode-mode` skill and follow the specialists it points to:

- `test-before-finishing` / `verify-before-claiming` / `no-made-up-results` — validate with real commands before claiming anything.
- `security-first` — secrets, credentials and dependency safety.
- `clear-final-report` — what changed, which files, which validation ran, what is still open.

If the catalog is unavailable, these rules still hold:

- Use pnpm only, never npm or yarn.
- Pin exact dependency versions: no `^`, no `~`, no `latest`.
- Never claim a command was run, or that something works, when it was not verified.
- Never delete or overwrite the user's content.

## Dependencies and configuration

Always inspect the current `package.json` before using or adding a dependency.

Do not assume that a dependency is installed because it may have been included in the original scaffold.

Use pnpm exclusively and pin exact versions: no `^`, no `~`, no `latest`.

Treat the following files as sources of truth for the current project configuration:

- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `raulmoracode.json`
- `biome.json`
- `components.json`
- `.nvmrc`
- framework-specific configuration files

`raulmoracode.json` is the CLI manifest (framework, tech selection and managed-file hashes); treat it as the source of truth for upgrades.

## Project structure

```text
├── index.html               # HTML entry (head tags injected at build time)
├── .github/workflows/       # GitHub Actions workflows
├── .github/dependabot.yml   # Dependabot (weekly, exact versions, 7-day cooldown)
├── .opencode/opencode.json  # OpenCode skills catalog
├── src/
│   ├── main.tsx     # entry point
│   ├── App.tsx      # root component
│   ├── index.css    # Tailwind entry point
│   ├── App.css      # root styles
│   ├── components/  # shadcn components land here
│   ├── hooks/       # registry hooks land here
│   ├── lib/
│   │   └── utils.ts  # cn()
│   ├── config/
│   │   └── site.ts  # site identity
│   └── test/        # smoke test
├── components.json          # shadcn config (includes the @raulmoracode registry)
├── .husky/                  # Git hooks
├── commitlint.config.ts     # commit message validation
├── biome.json               # formatter + linter config
├── vitest.config.ts         # test config
├── .vscode/                 # VS Code settings + extensions
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # scripts and dependencies (exact versions)
├── pnpm-workspace.yaml      # minimumReleaseAge policy + excludes
├── raulmoracode.json        # CLI manifest (framework, selection, hashes)
├── LICENSE                  # project license
├── CHANGELOG.md             # project changelog
└── AGENTS.md                # guidelines for AI coding agents
```

## Project tooling

This project uses pnpm exclusively. Never use npm or yarn.

`raulmoracode.json` records the CLI version, framework, tech selection and managed-file hashes.

Available scripts (see `package.json` for the full list):

- `pnpm dev` — start the development server.
- `pnpm build` — create a production build.
- `pnpm typecheck` — run the TypeScript type checker.
- `pnpm check` — run the formatter and linter check.
- `pnpm format` — apply formatting.
- `pnpm lint` — run the linter.
- `pnpm test` — run the test suite in watch mode (use `CI=true pnpm test` for single run).

## Components and UI

UI components come from shadcn. Add new components with:

```bash
pnpm dlx shadcn@4.21.0 add @raulmoracode/<component>
```

Browse the catalogue at https://registry.raulmoracode.com.

Do not hand-write component files under the shadcn UI directory. Registry items write to `@components/*`, `@lib/*` and `@hooks/*`, declared in `components.json` and in the `tsconfig.json` paths.

## Validation

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

## Site identity

`src/config/site.ts` is the single source of truth for the site title, description, favicon and social preview.

Edit that file instead of `index.html` or `src/app/layout.tsx` when changing them.

On Vite the `siteHead()` plugin in `vite.config.ts` injects those values into `index.html`; on Next.js the `metadata` export in `src/app/layout.tsx` does. Both are always wired, whichever techs were selected.
