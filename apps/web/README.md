# F88 Landing Page

Landing page duoc xay dung voi Next.js 16, React 19, TypeScript va Tailwind CSS 4.

## Yeu cau moi truong

- Node.js: `22.22.2`
- pnpm: `10.12.3`

Neu can linh hoat hon trong CI/CD, co the dung Node `>=22`.

## Cai dat

```bash
pnpm install
```

## Bien moi truong

Project dang dung cac bien moi truong sau:

- `SITE_NAME`
- `SITE_URL`

Cac file moi truong local hien co:

- `.env.local`
- `.env.sit`
- `.env.ida`
- `.env.production`

Vi du:

```env
SITE_NAME=F88 SIT
SITE_URL=https://sit.example.com
```

Local development co the dung:

```env
SITE_NAME=F88 Local
SITE_URL=http://localhost:3000
```

## Chay project

Chay local mac dinh:

```bash
pnpm dev
```

Chay theo moi truong:

```bash
pnpm dev:sit
pnpm dev:ida
pnpm dev:prod
```

App mac dinh chay tai `http://localhost:3000`.

`pnpm dev` se doc env mac dinh cua Next.js nhu `.env.local`, `.env.development`, `.env`.

## Build va start

Build:

```bash
pnpm build
pnpm build:sit
pnpm build:ida
pnpm build:prod
```

Start:

```bash
pnpm start
pnpm start:sit
pnpm start:ida
pnpm start:prod
```

## Lint va format

```bash
pnpm lint
pnpm format
pnpm format:check
```

## Ghi chu

- `metadataBase` duoc cau hinh trong `src/app/layout.tsx` tu `process.env.SITE_URL`.
- SEO helper trong `src/shared/utils/seo/index.ts` tra ve relative metadata path va de Next.js resolve qua `metadataBase`.
- `sit` va `ida` khong phai moi truong chuan duoc Next.js tu load, nen project dung `dotenv-cli` trong script de nap dung file `.env.*`.
