# Homepage/Header Spacing Fix Design

## Goal

Repair Homepage and Header spacing so the landing page reads as a premium Industrial Luxury experience instead of a wireframe, with no horizontal edge-sticking or overflow.

## Scope

- Header container and responsive navigation spacing.
- Hero container, two-column layout, vertical rhythm, headline hierarchy, CTA styling, and layered background.
- Quote form glass card spacing and control sizing.
- Stats section spacing, container, grid, and glass cards.
- Shared layout tokens/components only where needed to support consistent spacing.

## Constraints

- Do not change business logic.
- Do not create backend code.
- Do not add heavy UI libraries.
- Prefer existing `packages/ui` primitives.
- Container desktop max-width is `1280px`.
- Container horizontal padding is `20px` mobile, `32px` tablet, `48px` desktop.
- Verification must include `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

## Design

The layout source of truth is `AppContainer`. It remains centered with `margin-inline: auto`, uses `max-width: 1280px`, and applies responsive horizontal padding through the shared spacing token.

Header stays full-width for the glass/background treatment. Header content sits inside `AppContainer`, with a `64px` mobile height and `80px` desktop height. Logo stays left, navigation and CTA are aligned on desktop, and the hamburger remains available on mobile.

Hero uses a full-width section only for background layers. All content is inside `AppContainer`. Desktop layout is two columns: text max-width `680px`, quote form `440px`, and `80px` gap. Mobile stacks text then form. Hero vertical padding is `80px` mobile and `120px` desktop, with content centered against `calc(100vh - header height)`.

Hero hierarchy uses explicit spacing: badge to headline `24px`, headline to description `24px`, description to CTA `40px`, and CTA button gap `16px`. Desktop headline size is `64px` to `80px`, tablet `48px` to `56px`, and mobile `40px` to `44px`, with `line-height: 1.05` and `font-weight: 800`.

Quote form is a `440px` desktop glass card with `32px` padding, `28px` radius, backdrop blur, subtle border, `48px` controls, `18px` field spacing, and a `52px` submit button.

Stats section is separated from hero with `56px` mobile and `80px` desktop vertical padding. Cards live inside `AppContainer`, use `1/2/4` responsive columns, `28px` padding, `24px` radius, and glass border styling.

## Testing

- Run `pnpm lint`.
- Run `pnpm typecheck`.
- Run `pnpm build`.
- Visual check for no content touching viewport edges on mobile, tablet, and desktop.
