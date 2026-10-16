# ZeroWaste Chef — SDG 12.3 & SDG 13 Culinary Planning Engine

**ZeroWaste Chef** is a minimalist Next.js (App Router) web platform advancing **UN Sustainable Development Goal 12 (Target 12.3: Halving Per-Capita Household Food Waste)** and **SDG 13 (Climate Action)**.

Built around structured prompt engineering and Schema-First JSON generation via the **Google Gemini API**, ZeroWaste Chef provides two dedicated operational workspaces:
1. **Single Meal Rescue (`single`)**: Converts immediate expiring kitchen leftovers into a fast, balanced 4-step recipe plus a quick backup idea.
2. **Multi-Day Meal Plan (`multi_day`, 2 to 7 Days)**: Sequences available household groceries across a user-selected horizon of **2 to 7 days**, scheduling fragile perishables and cooked leftovers on earlier days and hardy root vegetables or dry staples on later days.

---

## Core Architectural Highlights

- **Minimalist Monochrome UI & Theme System**:
  - Clean Light mode default (`#F5F5F7` canvas / `#FFFFFF` surface / `#E5E5E7` hairline dividers) with a smooth CSS-transitioned Dark mode (`#121212` canvas / `#1E1E1E` surface / `#2C2C2E` hairline dividers) in the top header.
- **Instant Bilingual Localization (`EN | TR`)**:
  - Instant header switch translating all UI labels, form controls, scenario presets, and safety notices between **English** and **Turkish** without reloading the browser, while instructing the Gemini API to generate recipes and impact notes in the selected language.
- **Strict Prompt Hierarchy & Negative Constraints**:
  - Enforces `System Rules > User Request > Input Data` for prompt-injection resistance.
  - Flags spoiled, moldy, or hazardous items (`safety_alert: true`) and warns the user to discard them safely.
  - Respects user allergies/dietary restrictions, never hallucinates exotic specialty ingredients, and avoids unverified carbon statistics.
- **Standalone Prompt Documentation**:
  - Exact copies of the System Prompt and User Instruction Template are maintained in [`prompts/system_prompt.txt`](./prompts/system_prompt.txt) and [`prompts/user_prompt_template.txt`](./prompts/user_prompt_template.txt).

> **SDK & Model Note:** Because legacy `@google/generative-ai` and `gemini-1.5-flash` / `gemini-2.0-flash` models are deprecated upstream, this project uses the current official `@google/genai` SDK (`client.interactions.create`) with `gemini-3.8-flash`.

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts                 # Gemini API route supporting "single" & "multi_day" (2-7 days)
│   ├── components/
│   │   ├── Header.tsx                   # Brand identity, SDG badges, EN|TR switch & Light/Dark toggle
│   │   ├── SingleMealResults.tsx        # Single Meal Rescue card, safety banner & SDG impact note
│   │   └── MultiDayResults.tsx          # Sequential 2-7 day timeline cards & cumulative SDG assessment
│   ├── types/
│   │   └── index.ts                     # TypeScript interfaces & complete EN/TR translation dictionary
│   ├── globals.css                      # Minimalist monochrome CSS custom properties & dark mode tokens
│   ├── layout.tsx                       # Root layout & metadata
│   └── page.tsx                         # Dual-workspace state, segmented navigation & input forms
├── prompts/
│   ├── system_prompt.txt                # Synchronized System Prompt for hackathon submission
│   └── user_prompt_template.txt         # Synchronized User Instruction Template
├── .env.example
├── package.json
└── README.md
```

---

## Local Setup & Execution

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure `.env.local`

Create a `.env.local` file in the root directory and add your Google Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build Verification

```bash
npm run build
```
