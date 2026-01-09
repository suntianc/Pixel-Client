<div align="center">
  <img width="100%" max-width="800" alt="PixelVerse Chat" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

  # PixelVerse Chat

  *Where nostalgia meets the future. A chat experience that feels like home, yet belongs to tomorrow.*

  [![Build Status](https://img.shields.io/github/actions/workflow/status/suntianc/Pixel-Client/ci.yml?branch=master&style=flat-square)](https://github.com/suntianc/Pixel-Client/actions)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)
  ![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)

</div>

---

## ✨ About PixelVerse

PixelVerse isn't just another chat app. It's a **love letter to the pixels that shaped us** — a space where the tactile satisfaction of retro gaming meets the limitless potential of modern AI.

We built PixelVerse because we believe **interacting with AI should feel personal, not sterile**. Every pixel, every glow, every transition — they're all intentional. They're all part of the story.

> *"The best technology disappears. It becomes invisible, like a good pair of glasses. PixelVerse is our attempt to make AI feel that natural."*

---

## 🎨 Six Themes, Six Moods

Choose the vibe that fits your moment:

| Theme | Personality | Best For |
|-------|-------------|----------|
| 🌗 **Pixel Dark** | High-contrast, bold borders, unapologetically retro | Deep work, late-night sessions |
| 🌤️ **Pixel Light** | Warm cream tones, softer edges, welcoming | Morning brainstorms, creative flow |
| 🌙 **Shadcn Dark** | Minimal, focused, with subtle purple whispers | Quiet contemplation, coding |
| ☀️ **Shadcn Light** | Clean lines, violet accents, clarity | Daytime productivity, reading |
| ⚡ **Cyber Neon** | Glowing cyan edges, sharp angles, electric | Night owls, cyberpunk fans |
| 🌅 **Sunset Glow** | Warm gradients, glassmorphism, smooth | Relaxed chats, creative discussions |

Each theme adapts not just colors, but **typography, border radii, shadows, and interactions**. Pixel themes use VT323 for that authentic 8-bit feel. Modern themes use Inter for clean readability.

---

## 🛠️ Built With Heart

```typescript
// The stack that powers your conversations
interface TechStack {
  frontend: 'React 19 + TypeScript';
  bundler: 'Vite 6';
  state: 'Zustand 5';
  styling: 'Tailwind CSS + Custom Pixel Utilities';
  testing: 'Vitest + React Testing Library';
  markdown: 'React Markdown + KateX + Syntax Highlighting';
  icons: 'Lucide React';
}
```

**Key Features:**
- 🗣️ **Multi-model support** — OpenAI, Anthropic, Google, DeepSeek, Qwen, Zhipu, Ollama, and more
- 🔌 **MCP Integration** — Model Context Protocol for extensible tool ecosystems
- 💾 **Persistent sessions** — Your conversations survive browser refreshes
- 🌐 **International** — English, 中文, 日本語 — your language, your home
- 🎯 **Deep Thinking Mode** — Toggle enhanced reasoning for complex problems
- 📱 **Responsive** — From desktop to tablet, PixelVerse adapts

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (we recommend the latest LTS)
- **npm** or **pnpm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/suntianc/Pixel-Client.git
cd Pixel-Client

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API keys to .env.local
# VITE_API_BASE_URL=your-api-endpoint
# VITE_API_KEY=your-api-key

# Start the development server
npm run dev
```

Visit `http://localhost:5173` and start chatting.

### Building for Production

```bash
npm run build      # Production build
npm run preview    # Preview production build locally
```

### Testing

```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode for TDD
npm run test:coverage  # Coverage report
```

---

## 📁 Project Structure

```
Pixel-Client/
├── components/           # React components
│   ├── Chat/            # Main chat interface
│   │   └── subcomponents/
│   ├── ModelManager.tsx # Provider/model configuration
│   ├── PixelUI.tsx      # Themed UI primitives
│   └── ErrorBoundary.tsx
├── hooks/               # Custom React hooks
│   ├── useTheme.ts      # Theme persistence & switching
│   ├── useChat.ts       # Chat message management
│   └── useApiWithRetry.ts
├── stores/              # Zustand state management
│   └── useStore.ts
├── services/            # API client & LLM services
│   └── apiClient.ts
├── utils/               # Utilities
│   └── validation.ts
├── test/                # Vitest tests
├── types.ts             # TypeScript interfaces
├── constants.ts         # Theme styles & translations
├── AGENTS.md            # AI agent guidelines
└── index.html
```

---

## 🤝 Contributing

PixelVerse is a living project. Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

All contributions are welcome — from bug fixes to new themes to documentation improvements.

---

## 📝 License

PixelVerse is open source under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Tailwind CSS** — for the utility-first foundation
- **Lucide** — for beautiful, consistent icons
- **Vite team** — for the fastest tooling experience
- **The open-source AI community** — for making this all possible

---

<div align="center">

**Made with ❤️ by developers who believe in the magic of pixels**

*Star us on GitHub if PixelVerse makes your day a little brighter.*

</div>
