# Tuấn Anh 68

Base monorepo cho website Tuấn Anh 68, gồm frontend Next.js và backend NestJS.

## Yêu cầu

- Node.js 20+
- pnpm 9+

Cài pnpm nếu máy chưa có:

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

## Cài dependencies

```bash
pnpm install
```

## Chạy development

Chạy cả web và api:

```bash
pnpm dev
```

Chỉ chạy web:

```bash
pnpm --filter @tuanh68/web dev
```

Chỉ chạy api:

```bash
pnpm --filter @tuanh68/api dev
```

## Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```

## Typecheck

```bash
pnpm typecheck
```

## Git hooks

Repo dùng Husky, lint-staged và commitlint:

- `pre-commit`: chạy `pnpm lint-staged` để format/lint staged files.
- `commit-msg`: kiểm tra commit message theo Conventional Commits.

Ví dụ commit hợp lệ:

```bash
git commit -m "feat: add landing page"
```

## Cấu trúc chính

- `apps/web`: Next.js App Router, TailwindCSS, landing page/frontend.
- `apps/api`: NestJS API, prefix `/api`, sẵn folder cho modules/config/database.
- `packages/types`: type dùng chung.
- `packages/schemas`: schema Zod dùng chung.
- `packages/utils`: helper dùng chung.
- `packages/tsconfig`: TypeScript config dùng chung.
- `packages/eslint-config`: ESLint config dùng chung.
