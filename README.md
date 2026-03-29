# Vantix: Premium AI Creative Dashboard

Vantix is a high-performance, AI-powered media generation platform designed for creators who demand speed and precision. Built with a "Progressive Refinement" workflow, Vantix allows users to move from a raw idea to a polished masterwork in seconds.

## 🚀 Key Features

- **✨ Prompt Enhancement**: Transform simple text into professional, high-fidelity prompts using Groq's high-speed Llama models.
- **🖼️ State-of-the-Art Generation**: Generate stunning visuals using **FLUX.1-schnell** with an automatic fallback system to **Stable Diffusion XL**.
- **🔍 AI Vision Remixing**: Upload any image to analyze its composition and style using **Llama 4 Scout**, then generate a unique variation based on the AI's description.
- **💎 Premium UI**: A glassmorphic, vibrant dashboard experience powered by **Framer Motion** and a custom design system.

---

## 🛠️ Tech Stack

### Frontend

- **Core**: React 19 + Vite
- **Routing**: React Router 7
- **Animations**: Framer Motion (for smooth transitions and logic-based UI feedback)
- **Icons**: Lucide React
- **Styling**: Modular CSS and Tailwind-like utility patterns for glassmorphism.

### Backend

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Media Handling**: Multer (for multipart/form-data image processing)
- **Security**: CORS & Environment Variable masking.

---

## 🤖 AI Models & Rationale

| Task                  | Model                                       | Reason for Choice                                                                                                                                         |
| :-------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt Refinement** | `llama-3.3-70b-versatile`                   | Chosen for **lightning-fast inference** on Groq, providing near-instant professional prompt engineering.                                                  |
| **Image Generation**  | `FLUX.1-schnell`                            | Top-tier image quality with a "schnell" (fast) preset for rapid creative iteration.                                                                       |
| **Vision Analysis**   | `meta-llama/llama-4-scout-17b-16e-instruct` | Switched to Llama 4 Scout as the **natively multimodal successor** to the decommissioned 3.2 preview models, offering superior OCR and descriptive depth. |

---

## 🏗️ Architecture & Approach

This project focuses on a modular, clean-architecture approach to provide a robust creative workflow:

1.  **Rapid Prototyping**: Developed with a focus on high-fidelity UI layout and design language, ensuring a premium "Creation Canvas" experience.
2.  **Full-Stack Modularization**: The project was architected for scalability, moving from a rapid-prototype shell to an industry-standard component hierarchy. Implementation highlights include:
    - Constructing a modular Node.js/Express backend.
    - Integrating high-performance Groq and Hugging Face APIs.
    - Implementing robust error handling and "Smart Fallback" logic for uninterrupted media generation.

---

## 📂 Entry Points

### Server

- `server/index.js`: The API gateway.
- `server/routes/index.js`: Route registration for image, text, and analysis modules.
- `server/controllers/`: Independent logic for each AI task.

### Client

- `client/src/App.jsx`: The application router.
- `client/src/components/home/Home.jsx`: The functional orchestrator and state engine.
- `client/src/components/item/item.jsx`: Props-driven component for rendering the creative feed.
- `client/src/components/input/inputSection.jsx`: The fixed interaction bar.

---

## 🚦 Getting Started

1.  **Clone the repo**
2.  **Configure `.env`** in `/server`:
    ```env
    GROQ_TOKEN=your_token_here
    HF_TOKEN=your_token_here
    PORT=5000
    ```
3.  **Start the Backend**: `cd server && npm install && npm start`
4.  **Start the Frontend**: `cd client && npm install && npm run dev`

---

_Built with passion, speed, and advanced AI agents._
