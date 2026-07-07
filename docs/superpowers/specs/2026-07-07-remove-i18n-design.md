# Remove i18n (next-intl) from Web App

## Motivation

Make the web app single-language (Vietnamese) by removing all internationalization infrastructure, locale-based routing, and language switching UI.

## Scope

- Remove `next-intl` dependency and all i18n configuration
- Flatten locale-based routing (`[locale]` → root)
- Replace all translation hooks (`useTranslations`, `getTranslations`) with static Vietnamese text
- Remove the language switcher button from header
- Clean up locale-related types (`AppLocale`) and data structures

## Non-goals

- No UI redesign beyond removing the language button
- No changes to the investor documents metadata (documents for both VN and ENG remain in the metadata; only locale-based filtering is removed)

## Files to Delete

| File                          | Reason                                      |
| ----------------------------- | ------------------------------------------- |
| `src/i18n/routing.ts`         | Core routing config for locales             |
| `src/i18n/navigation.ts`      | Locale-aware navigation primitives          |
| `src/i18n/request.ts`         | Server-side request config for next-intl    |
| `src/proxy.ts`                | Middleware for locale detection             |
| `src/app/[locale]/layout.tsx` | Locale layout (merged into root)            |
| `src/app/[locale]/page.tsx`   | Locale page (moved to root)                 |
| `src/app/[locale]/documents/` | Locale-based document routes (move to root) |

## Files to Modify

### Infrastructure

| File             | Change                                |
| ---------------- | ------------------------------------- |
| `next.config.ts` | Remove `createNextIntlPlugin` wrapper |
| `package.json`   | Remove `next-intl` dependency         |

### Routing

| File                 | Change                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| `src/app/layout.tsx` | Merge [locale]/layout content, hardcode `lang="vi"`, remove `getLocale()` |
| `src/app/page.tsx`   | Replace redirect with actual page content from [locale]/page              |

### Client Components (~50 files using `useTranslations`)

| Namespace                        | Files affected                                             |
| -------------------------------- | ---------------------------------------------------------- |
| `HomePage.banner.*`              | 4 files (heading, badge, countdown, actions)               |
| `HomePage.offeringInfo.*`        | 2 files (heading, stats)                                   |
| `HomePage.f88Overview.*`         | 3 files (index, text-description, image-description)       |
| `HomePage.f88BreakthroughGrowth` | 5 files (index, heading, table, summary-cards, chart-card) |
| `HomePage.f88Journey.*`          | 2 files (heading, timeline)                                |
| `HomePage.f88MarketLeader`       | 4 files (heading, highlights, details, ecosystem)          |
| `HomePage.f88StrategicDirection` | 3 files (heading, values, pillars)                         |
| `HomePage.ipoRoadmap.*`          | 4 files (heading, timeline, timeline-content, cta)         |
| `HomePage.investorMaterials`     | 3 files (heading, document-grid + server index)            |
| `HomePage.investorFaq`           | 2 files (heading, accordion)                               |
| `HomePage.newsSection`           | 4 files (heading, grid, card, more-link)                   |
| `HomePage.purchaseGuide`         | 10 files (various sub-components)                          |
| `HomePage.header.*`              | 3 files (menu, mobileMenu, actions)                        |
| `HomePage.footer.*`              | 1 file (menu, addresses, meta)                             |

Each: Replace `const t = useTranslations("X")` + `{t("key")}` with static Vietnamese text.

### Server Component

| File                           | Change                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `investor-materials/index.tsx` | Replace `getTranslations` + `getLocale` with static text and hardcoded `"VN"` locale                    |
| `investor-materials/data.ts`   | Remove `t` parameter, replace with static strings; simplify `getDocumentLocale` to always return `"VN"` |

### Types & Config

| File                                            | Change                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `section-config.ts`                             | Remove `AppLocale` type, remove `en` section from `appSectionTitles` |
| `app-section-navigator/types.ts`                | Remove `locale` prop, remove `AppLocale` import                      |
| `app-section-navigator/AppSectionNavigator.tsx` | Update to remove locale usage                                        |
| `shared/utils/seo/index.ts`                     | Already hardcoded to `vi_VN` — no change needed                      |

### Header (Language button removal)

| File                           | Change                                                          |
| ------------------------------ | --------------------------------------------------------------- |
| `header-actions/index.tsx`     | Remove `HeaderLanguageButton` component, remove related imports |
| `header-mobile-menu/index.tsx` | Remove `<HeaderLanguageButton mobile />`                        |

## Approach

1. **Infrastructure first**: Delete i18n files, update configs
2. **Routing**: Flatten [locale] → root directory
3. **Translations**: Replace hooks with static text section by section
4. **Cleanup**: Remove locale types, language button
5. **Verify**: `npm run dev` and check no i18n-related build errors

Since `messages/vi.json` does not exist on disk, Vietnamese text will be inferred from component context (e.g., banner heading title will be derived from the section's purpose and the company context).
