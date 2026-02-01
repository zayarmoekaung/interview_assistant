# Copilot / AI Agent Instructions

## Quick summary
- This is a Next.js (App Router) TypeScript frontend + serverless API routes in `app/api/*` that proxies calls to 3 AI backends: OpenAI, Google Gemini, and local OpenAI-compatible LLMs (KoboldCPP).  
- Key responsibilities for AI agents: edit prompts, add/modify model providers, fix API contracts, and update client-side flows that call the APIs.

## How to run & common commands
- Install: `npm install`  
- Dev server: `npm run dev` (visit `http://localhost:3000`)  
- Build: `npm run build` / `npm start`  
- Lint: `npm run lint`  
- Use the `.rest` files under `REST/` to manual-test endpoints like `/api/analyze`, `/api/getmodels`, `/api/getmodeltypes`, `/api/gethealth`, `/api/prompt`.

## Important environment variables
- `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `KOBOLD_API_URL` (local LLM endpoint), `GOOGLE_API_DEFAULT_MODEL_NAME`, `OPEN_API_DEFAULT_MODEL_NAME`, `GOOGLE_API_BASE_URL`, `ELEVEN_LABS_API_KEY` (TTS).  
- DO NOT commit secrets; project README shows expected variables and examples.

## Big picture & code flow (concise)
1. Frontend components call helper services in `services/*` (e.g., `generateAnalysis.service.ts`, `getAvailableModels.service.ts`).
2. Services use `utils/api/*` which POST/GET to Next.js API routes in `app/api/*` (server-side).  
3. Server routes call the factory helpers in `factories/` (e.g., `createAiModelObject`) which return provider instances implementing a common interface (see `factories/aiModel/types/aiModel.types.ts`).
4. Providers (e.g., `factories/aiModel/providers/*`) talk to the real models (OpenAI SDK, Google Generative AI, or OpenAI-compatible local endpoint).
5. Responses are often expected to be JSON embedded in a code block; helpers like `decodeJsonFromMarkdown` extract it and `sanitizeForLLM` cleans text for local models.

## Project-specific conventions & gotchas (must-know)
- Prompt pattern: each feature uses a `SystemPrompt()` and a `UserPrompt(...)` pair (see `prompts/*.prompt.ts`). Keep this pattern when adding features.
- Output parsing: code expects model responses to be JSON — ideally in a triple-backtick JSON code block. See `helpers/json.helper.ts` (`decodeJsonFromMarkdown`).
- Encoding rule: `analyseResume()` will Base64-encode the JD/resume for *remote* models (OpenAI/Gemini) but send *plain sanitized text* for local models. That choice is enforced by `ModelType` (see `types/model.type.ts`).
- Health checks: providers use `healthCheckPrompt` and expect the model to return exactly `Healthy`. Tests and health gating rely on that literal string.
- Provider differences: OpenAI/Gemini/Kobold providers differ in how they send system/user prompts (OpenAI uses separate messages, Gemini concatenates), so behaviour can vary — inspect `factories/aiModel/providers/*` when debugging.
- Adding a provider: implement the `AiModel` interface (`factories/aiModel/types/aiModel.types.ts`), add provider under `factories/aiModel/providers/` and register it in `factories/aiModel/aiModel.factory.ts`.

## Key files to inspect for common tasks
- API routes: `app/api/analyze/route.ts`, `app/api/getmodels/route.ts`, `app/api/getmodeltypes/route.ts`, `app/api/gethealth/route.ts`  
- Model factory & providers: `factories/aiModel/*` (factory + `providers/{openAi,gemini,kobold}.provider.ts`)  
- Prompts & personalities: `prompts/*` (note JSON output requirements in `resume_review.prompt.ts`)  
- Client-side services: `services/generateAnalysis.service.ts`, `services/getAvailableModels.service.ts`, `services/generateTTSAudio.service.ts`  
- Helpers: `helpers/json.helper.ts`, `helpers/sanitize.helper.ts`, `helpers/axios/request.helper.ts`, `helpers/aiModel/aiModel.helper.ts`  
- Stores (Zustand): `stores/*` (used directly with `.getState()` in services)
- Manual API tests: `REST/*.rest`

## How to validate changes (practical checks)
- For prompt changes: update prompt, run `npm run dev`, call `/api/analyze` using `REST/POST_analyze_resume.rest`, and ensure `decodeJsonFromMarkdown` successfully parses JSON.  
- For provider changes: add unit-like smoke tests by calling `/api/getmodels` and `/api/gethealth` (use `.rest` files or curl). For local LLMs ensure `KOBOLD_API_URL` is set and `analyse` uses `plain` mode not base64.
- For UI changes: verify client-side stores (`useModelStore`, `useResumeAnalysisStore`) update and UI reflects the state (e.g., `ModelSelector`, analysis report components).

## Short examples to copy-paste
- Analyze call (client): `POST /api/analyze` with body `{ model: { name: 'gpt-4', type: 'openai' }, resume: '<b64 or plain>', jobDescription: '<b64 or plain>' }`  
- Parsing: `const decoded = decodeJsonFromMarkdown(response.response) // returns parsed JSON`  

## Safety / style rules for prompt edits
- Keep SystemPrompt focused and explicitly instruct to output JSON only (tests depend on it).  
- Avoid adding conversational preambles (the code strips/assumes only JSON content).  
- When adding or changing JSON schema, update the consuming type under `types/` and add an explicit parse/validation step (see `ResumeMatchResponseSchema`).

---
If anything above is unclear or you want more detail about a particular area (e.g., adding a new model provider, real examples of failing model outputs, or tests), tell me which section to expand and I’ll iterate. ✅