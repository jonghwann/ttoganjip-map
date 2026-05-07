# 또간집 지도

또간집 선정 맛집을 지도에서 탐색하는 사이드 프로젝트입니다.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Biome
- pnpm

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm check
```

## Data Direction

Start with Supabase tables for episodes, restaurants, and restaurant candidates. The automation can later collect YouTube episode metadata, extract restaurant candidates, match them through a map API, and save pending candidates for approval.
