# AI Interview Assistant
<img width="1306" height="648" alt="Screenshot from 2025-12-27 14-10-54" src="https://github.com/user-attachments/assets/a3d6459e-f12c-45a0-a32e-5d8b39de745d" />


## Overview

AI Interview Assistant is a web application built with Next.js that helps users prepare for job interviews. It allows switching between AI models (OpenAI's ChatGPT, Google's Gemini, and local LLMs via KoboldCPP) for flexible backend processing. API keys are configured via environment variables. Key features include analyzing a resume against a job description (JD), providing detailed feedback, match percentages across various fields (e.g., skills, experience), generating reports, and printing them. The app incorporates a personality prompt to make AI responses more human-like. Mock interview features are currently in development.

This app uses Chakra UI for a responsive and themeable interface, with support for light/dark modes.

## Features

- **Model Switching**: Seamlessly switch between OpenAI (ChatGPT), Google Gemini, and local LLMs (via KoboldCPP).
- **Resume-JD Analysis**: Upload or paste JD and resume to get:
  - Overall match percentage.
  - Field-specific match percentages (e.g., Skills, Experience, Education, Responsibilities).
  - Detailed feedback and improvement suggestions.
- **Report Generation & Printing**: Generate structured reports from analysis and print them directly.
- **Human-like Responses**: Integrated personality prompts (e.g., Mafuyu style) for more engaging interactions.
- **Mock Interview (In Development)**: Upcoming features for simulating interview questions and responses.
- **UI Enhancements**: Chakra UI components, loaders, tooltips, and a menu drawer for navigation.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Chakra UI, TypeScript.
- **Backend**: Next.js API routes for proxying AI calls.
- **AI Integrations**:
  - OpenAI SDK for ChatGPT.
  - Google Generative AI SDK for Gemini.
  - OpenAI-compatible endpoint for KoboldCPP local LLMs.
- **State Management**: Zustand stores (e.g., for JD/resume, models, messages, loading states).
- **Database**: Prisma ORM (compatible with PostgreSQL or others) – optional, depending on features.
- **Other**: Axios for HTTP requests, Base64 helpers, JSON sanitization, and custom prompts.

## Installation

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/ai-interview-assistant.git
   cd ai-interview-assistant
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GOOGLE_API_KEY=your_google_key_here
   KOBOLD_API_URL=http://127.0.0.1:5001/v1  # Default for KoboldCPP; adjust as needed
   GOOGLE_API_DEFAULT_MODEL_NAME=gemini-1.5-flash  # Default Gemini model
   OPEN_API_DEFAULT_MODEL_NAME=gpt-4o-mini  # Default OpenAI model
   GOOGLE_API_BASE_URL=https://generativelanguage.googleapis.com  # Base URL for Gemini API
   DATABASE_URL=your_database_connection_string_here  # e.g., for PostgreSQL (if using DB features)
   ENCRYPTION_KEY=your_secret_encryption_key_here  # For encrypting data if needed
   ```

   - Obtain API keys from [OpenAI](https://platform.openai.com/account/api-keys) and [Google AI Studio](https://aistudio.google.com/app/apikey).
   - For local LLMs, run KoboldCPP separately and provide its API URL.

4. **Set Up Database** (if applicable):
   ```
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**:
   ```
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Build for Production**:
   ```
   npm run build
   npm start
   ```

## Usage

1. **Select Model**: Choose between ChatGPT, Gemini, or Local in the dropdown.
2. **Resume-JD Analysis**:
   - Input JD and resume text (or upload files in future updates).
   - Click "Analyze" to get match percentages, feedback, and a report.
   - Use the print icon to export the report.
3. **General Prompting**: Use the chat interface for custom queries.
4. **REST API Testing**: Use the provided `.rest` files in the `REST` folder for API endpoints like health checks, model listings, and analysis.

### API Endpoints

- **GET /api/gethealth**: Health check with a personality-infused response.
- **GET /api/getmodels**: List available models for the selected type.
- **GET /api/getmodeltypes**: List supported model types (e.g., openai, gemini, kobold).
- **POST /api/analyze**: Analyze resume against JD (body: { jd, resume, model }).
- **POST /api/prompt**: General prompt handling (body: { prompt, model }).

## Project Structure

```
.
├─ README.md
├─ REST
│  ├─ GET_getHealth.rest
│  ├─ GET_getModelTypes.rest
│  ├─ GET_getmodels.rest
│  ├─ POST_analyze_resume.rest
│  └─ POST_prompt.rest
├─ app
│  ├─ api
│  │  ├─ analyze
│  │  │  └─ route.ts
│  │  ├─ gethealth
│  │  │  └─ route.ts
│  │  ├─ getmodels
│  │  │  └─ route.ts
│  │  ├─ getmodeltypes
│  │  │  └─ route.ts
│  │  └─ prompt
│  │     └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ circleProgress.tsx
│  ├─ icons
│  │  ├─ analysis.icon.tsx
│  │  ├─ cycle.icon.tsx
│  │  ├─ humberger.icon.tsx
│  │  └─ printer.icon.tsx
│  ├─ KnowledgeBaseInput.tsx
│  ├─ keywordBlock.tsx
│  ├─ loader.tsx
│  ├─ menuDrawer.tsx
│  ├─ messageView.tsx
│  ├─ modelSelector.tsx
│  ├─ navBar.tsx
│  ├─ resumeMatchResponse.tsx
│  ├─ tools.tsx
│  └─ ui
│     ├─ color-mode.tsx
│     ├─ provider.tsx
│     ├─ toaster.tsx
│     └─ tooltip.tsx
├─ eslint.config.mjs
├─ helpers
│  ├─ aiModel
│  │  ├─ aiModel.helper.ts
│  │  ├─ providers
│  │  │  ├─ gemini.provider.ts
│  │  │  ├─ kobold.provider.ts
│  │  │  └─ openAi.provider.ts
│  │  └─ types
│  │     └─ aiModel.types.ts
│  ├─ axios
│  │  └─ request.helper.ts
│  ├─ base64.helper.ts
│  ├─ date.helper.ts
│  ├─ json.helper.ts
│  ├─ message
│  │  ├─ message.helper.ts
│  │  ├─ providers
│  │  │  └─ message.provider.ts
│  │  └─ types
│  │     └─ message.type.ts
│  ├─ sanitize.helper.ts
│  └─ task
│     ├─ providers
│     │  └─ task.provider.ts
│     ├─ task.helper.ts
│     └─ types
│        └─ task.type.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prompts
│  ├─ health_check.prompt.ts
│  ├─ personalities
│  │  └─ mafuyu.prompt.ts
│  └─ resume_review.prompt.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ services
│  ├─ generateAnalysis.service.ts
│  └─ getAvailableModels.service.ts
├─ stores
│  ├─ useKnowledgeBaseStore.ts
│  ├─ useLoadingStore.ts
│  ├─ useMessageStore.ts
│  ├─ useModelStore.ts
│  └─ useResumeAnalysisStore.ts
├─ tsconfig.json
├─ types
│  ├─ healthCheck.type.ts
│  ├─ keyWordBlock.type.ts
│  ├─ model.type.ts
│  └─ resumeMatchResponse.type.ts
└─ utils
   └─ api
      ├─ analyseResume.ts
      └─ availableModels.ts
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


Built in December 2025. For questions, contact [zayarmoekaung0@gmail.com].

### Project Purpose

This project aims to provide an AI-powered interview assistant to help users prepare for interviews.
