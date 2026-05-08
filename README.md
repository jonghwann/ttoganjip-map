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
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=
YOUTUBE_API_KEY=
KAKAO_REST_API_KEY=
OPENAI_API_KEY=
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm check
pnpm collect:candidates
```

## Data Direction

Start with Supabase tables for episodes, restaurants, and restaurant candidates. The automation can later collect YouTube episode metadata, extract restaurant candidates, match them through a map API, and save pending candidates for approval.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor, then run `supabase/seed.sql` for demo rows.
The seed data is intentionally marked as `needs_verification`; replace it with verified source data before treating it as real 또간집 information.

## Routes

- `/`: restaurant search, filters, list, map markers, selected restaurant detail
- `/admin/candidates`: pending candidate review surface
