## Gemini NestJS API (TypeScript)

NestJS API exposing a simple endpoint to call Google's Gemini models via the official SDK.

### Requirements
- Node.js 18+
- Google Generative AI API key

### Setup
1) Install dependencies
```bash
npm install
```

2) Create `.env` in `server/`
```bash
PORT=4000
GEMINI_API_KEY=your_google_generative_ai_api_key
```

### Run
- Dev
```bash
npm run start:dev
```

- Build & Start
```bash
npm run build
npm start
```

### API
- POST `/api/llm/generate`
  - Request body example
  ```json
  {
    "prompt": "Write a haiku about the sea",
    "systemInstruction": "You are a helpful assistant.",
    "model": "gemini-1.5-flash",
    "temperature": 0.7,
    "maxOutputTokens": 256
  }
  ```
  - Response example
  ```json
  { "model": "gemini-1.5-flash", "output": "..." }
  ```

Notes: Global prefix is `api`, validation is enabled, errors normalized.


