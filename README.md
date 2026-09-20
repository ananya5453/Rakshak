# 🛡️ Rakshak — “Is this a scam?”
### AI-Powered Cyber Scam Detection & Awareness Platform for Indian Citizens & Seniors

> **National Cyber Helpline: 1930 | Cybercrime Portal: [cybercrime.gov.in](https://cybercrime.gov.in)**

---

## 📌 Executive Summary
**Rakshak** is an AI-powered scam detection and awareness platform designed specifically for Indian users, including elderly and non-tech-savvy citizens. It analyzes suspicious **WhatsApp messages, SMS texts, screenshot images, URLs, and phone call transcripts** across 8 Indian languages (Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Bengali, and English).

Rather than just displaying a blunt verdict, Rakshak provides an intuitive, four-layer breakdown:
1. **Verdicts & Transparent Risk Scoring**: `SAFE`, `SUSPICIOUS`, or `SCAM` with confidence ratings and factor scores (0–100) — avoiding claims of 100% certainty.
2. **Highlighted Red Flags**: Highlighting exact suspicious phrases (e.g., `"BLOCKED TODAY"` → urgency; `"complete KYC"` → credential theft; unauthorized `.xyz` links).
3. **"What is the Scammer Trying to Do?" & "What Could Happen?"**: A plain-English breakdown of their goal and a 4-step consequence flowchart.
4. **"What Should I Do?" (Actionable Do's & Don'ts)**: Clear, bulleted steps, emergency freezing guidance, and 1-click text-to-speech for seniors.

---

## ✨ Key Features
- **👵 Elderly / Simple Mode**: Large text, extra-large touch buttons, high-contrast visual indicators, simplified vocabulary without technical jargon, and full voice read-aloud via Web Speech API.
- **🖼️ Multimodal Screenshot OCR**: Direct screenshot inspection (PNG, JPG, WebP) with side-by-side comparison of the original screenshot and detected text.
- **🔗 Indian Domain & URL Inspector**: Verifies bank domains (SBI, HDFC, ICICI, Axis, PNB), India Post, utility discoms (BESCOM, Mahavitaran, UPPCL), and detects brand-domain mismatches, IP URLs, shortened links, and dangerous `.apk` downloads.
- **🎤 Voice Input ("Speak Instead")**: Describe a suspicious phone call verbally in plain language.
- **🎬 Interactive Demo Mode**: 8 curated, realistic simulated Indian scam scenarios ready to analyze with 1 click.
- **🔒 Privacy First & Auto-Redaction**: Client-side storage for check history, zero mandatory login, and automatic redaction of 16-digit card numbers, 12-digit Aadhaar, 10-character PAN, and OTPs.
- **🚨 Emergency Action Protocol**: Instant steps if money was already transferred, connecting users to the **1930 Cyber Fraud Helpline**.

---

## 🛠️ Tech Stack & Architecture

### Full-Stack Setup (Node / Express + Vite + React 19 + TypeScript)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (animations), Lucide Icons.
- **Backend**: Express.js with Vite middleware, running on Port 3000.
- **AI Engine**: `@google/genai` using model `gemini-3.8-flash` (server-side with telemetry and fallback heuristic cybersecurity engine).
- **Secondary Python Backend**: FastAPI with Pydantic schemas in `/backend/` directory for Python/Uvicorn deployment.

---

## 🚀 Running the Application

### 1. Development (Express + Vite Full-Stack)
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```
Open https://rakshak-scamshield.ai.studio/ in your browser.

### 2. Running Python FastAPI Backend (Optional)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🔑 Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```
*Note: If no API key is set, Rakshak automatically falls back to its built-in heuristic cyber intelligence engine, ensuring the full demo is functional offline without paid APIs.*
