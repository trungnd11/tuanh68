# Homepage Layout Chrome Refactor Design

## Goal
Move the shared Header and Footer out of `apps/web/src/features/home/index.tsx` and into the app layout so `HomePage` only owns homepage content sections.

## Scope
- Move navigation/footer data and JSX from the homepage feature entry into `apps/web/src/app/layout.tsx`.
- Keep `apps/web/src/app/page.tsx` unchanged.
- Keep all visual styling, copy, links, and business behavior unchanged.
- Preserve existing Header/Footer layout improvements from the premium spacing work.

## Design
`RootLayout` will render the global site chrome around `children`: `Navbar`, then `{children}`, then `Footer`. The homepage feature will return only `<main>` containing `HeroSection`, `StatisticsSection`, and the remaining homepage sections.

Because `Navbar` uses client-side state, `layout.tsx` can safely import it through the existing client component boundary. No new routes, APIs, or UI libraries are introduced.

## Verification
- Add or update a focused Vitest contract test that asserts `HomePage` no longer imports/renders `Navbar` or `Footer`, and `app/layout.tsx` does.
- Run `pnpm --filter @tuanh68/web test`.
- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Run `pnpm build`.
