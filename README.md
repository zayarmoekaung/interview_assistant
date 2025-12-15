This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

interview_assistant
├─ .next
│  ├─ dev
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  └─ .rscinfo
│  │  ├─ fallback-build-manifest.json
│  │  ├─ lock
│  │  ├─ logs
│  │  │  └─ next-development.log
│  │  ├─ package.json
│  │  ├─ prerender-manifest.json
│  │  ├─ routes-manifest.json
│  │  ├─ server
│  │  │  ├─ app
│  │  │  │  └─ api
│  │  │  │     ├─ chat
│  │  │  │     │  ├─ route
│  │  │  │     │  │  ├─ app-paths-manifest.json
│  │  │  │     │  │  ├─ build-manifest.json
│  │  │  │     │  │  └─ server-reference-manifest.json
│  │  │  │     │  ├─ route.js
│  │  │  │     │  ├─ route.js.map
│  │  │  │     │  └─ route_client-reference-manifest.js
│  │  │  │     ├─ getmodels
│  │  │  │     │  ├─ route
│  │  │  │     │  │  ├─ app-paths-manifest.json
│  │  │  │     │  │  ├─ build-manifest.json
│  │  │  │     │  │  └─ server-reference-manifest.json
│  │  │  │     │  ├─ route.js
│  │  │  │     │  ├─ route.js.map
│  │  │  │     │  └─ route_client-reference-manifest.js
│  │  │  │     └─ prompt
│  │  │  │        ├─ route
│  │  │  │        │  ├─ app-paths-manifest.json
│  │  │  │        │  ├─ build-manifest.json
│  │  │  │        │  └─ server-reference-manifest.json
│  │  │  │        ├─ route.js
│  │  │  │        ├─ route.js.map
│  │  │  │        └─ route_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  ├─ [root-of-the-server]__017b874e._.js
│  │  │  │  ├─ [root-of-the-server]__017b874e._.js.map
│  │  │  │  ├─ [root-of-the-server]__29e3b4c5._.js
│  │  │  │  ├─ [root-of-the-server]__29e3b4c5._.js.map
│  │  │  │  ├─ [root-of-the-server]__4e4f28f0._.js
│  │  │  │  ├─ [root-of-the-server]__4e4f28f0._.js.map
│  │  │  │  ├─ [root-of-the-server]__5fc5d1c2._.js
│  │  │  │  ├─ [root-of-the-server]__5fc5d1c2._.js.map
│  │  │  │  ├─ [root-of-the-server]__cdace7b5._.js
│  │  │  │  ├─ [root-of-the-server]__cdace7b5._.js.map
│  │  │  │  ├─ [root-of-the-server]__e20816a2._.js
│  │  │  │  ├─ [root-of-the-server]__e20816a2._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  │  ├─ _next-internal_server_app_api_chat_route_actions_ac0c75e3.js
│  │  │  │  ├─ _next-internal_server_app_api_chat_route_actions_ac0c75e3.js.map
│  │  │  │  ├─ _next-internal_server_app_api_getmodels_route_actions_747ce989.js
│  │  │  │  ├─ _next-internal_server_app_api_getmodels_route_actions_747ce989.js.map
│  │  │  │  ├─ _next-internal_server_app_api_prompt_route_actions_9fe04ca4.js
│  │  │  │  └─ _next-internal_server_app_api_prompt_route_actions_9fe04ca4.js.map
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  └─ server-reference-manifest.json
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  └─ development
│  │  │     ├─ _buildManifest.js
│  │  │     ├─ _clientMiddlewareManifest.json
│  │  │     └─ _ssgManifest.js
│  │  ├─ trace
│  │  └─ types
│  │     ├─ cache-life.d.ts
│  │     ├─ routes.d.ts
│  │     └─ validator.ts
│  └─ types
│     ├─ cache-life.d.ts
│     ├─ routes.d.ts
│     └─ validator.ts
├─ README.md
├─ REST
│  ├─ GET_getmodels.rest
│  └─ POST_prompt.rest
├─ app
│  ├─ api
│  │  ├─ getmodels
│  │  │  └─ route.ts
│  │  └─ prompt
│  │     └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ eslint.config.mjs
├─ helper
│  ├─ aiModel
│  │  ├─ aiModel.helper.ts
│  │  ├─ class
│  │  │  ├─ gemini.class.ts
│  │  │  └─ openAi.class.ts
│  │  └─ interface
│  │     └─ aiModel.interface.ts
│  └─ axios
│     └─ request.helper.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ tsconfig.json
└─ types
   └─ model.type.ts

```