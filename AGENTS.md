# AGENTS.md

This guide provides instructions for AI agents working on PixelVerse Chat.

## Build, Lint & Test Commands

```bash
# Development
npm run dev          # Start dev server on port 3000

# Build
npm run build        # Production build
npm run preview      # Preview production build

# Testing
npm test             # Run all tests
npm run test:watch   # Watch mode for development
npm run test:coverage # Run with coverage report

# Single test file
npx vitest run test/validation.test.ts

# Single test case
npx vitest run -t "should return errors for empty required fields"

# Type checking
npx tsc --noEmit     # TypeScript check only
```

## Project Structure

```
Pixel-Client/
├── components/
│   ├── Chat/               # Main chat component
│   │   └── subcomponents/  # Extracted subcomponents
│   ├── PixelUI.tsx         # Shared UI components
│   ├── ModelManager.tsx    # Provider/model configuration
│   ├── Mascot.tsx          # Mascot animation component
│   └── ErrorBoundary.tsx   # Error boundary component
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand state management
├── services/               # API client & LLM services
├── utils/                  # Utility functions (validation.ts)
├── types.ts                # TypeScript interfaces
├── constants.ts            # Theme styles, translations
└── test/                   # Vitest tests
```

## Code Style Guidelines

### TypeScript
- Use TypeScript for all files (.ts, .tsx)
- Enable `strict: true` (implied by project standards)
- **Never** use `any`, `@ts-ignore`, or type assertions to suppress errors
- Define interfaces for all API responses and complex objects
- Use enums for fixed sets: `Theme`, `ModelType`

### Imports & Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports (alphabetical)
import { LucideReactIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// 3. Internal imports (relative paths, grouped)
import { Theme, Message } from '../types';
import { THEME_STYLES } from '../constants';
import { ApiClient } from '../services/apiClient';
import { PixelButton } from './PixelUI';
```

### Naming Conventions
| Type | Convention | Examples |
|------|------------|----------|
| Components | PascalCase | `Chat`, `ModelManager`, `PixelButton` |
| Hooks | camelCase + "use" prefix | `useTheme`, `useChat`, `useApiWithRetry` |
| Types/Interfaces | PascalCase | `ChatProps`, `LLMProvider`, `ApiResponse` |
| Enums | PascalCase | `Theme`, `ModelType` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |
| Files | kebab-case | `chat-component.tsx`, `use-api.ts` |

### React Patterns
- Use function components with hooks (no class components)
- Props interface must be explicit: `interface ChatProps { ... }`
- Use `React.FC<Props>` or explicit function types for components
- Destructure props with defaults: `variant = 'primary'`
- Use barrel exports (`index.ts`) for subdirectory modules

### Error Handling
- **Never** use empty catch blocks: `catch(e) {}`
- Use ErrorBoundary for component-level error catching
- API errors: show user-friendly messages, log details for debugging
- Validate form inputs with `utils/validation.ts` utilities
- Use `try/catch` with async/await for API calls

### Styling
- Use Tailwind CSS classes (configured in `tailwind.config.js`)
- Theme-aware styles via `THEME_STYLES[theme]` constant
- Pixel art themes use pixel shadows: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Modern themes use soft shadows: `shadow-lg`

### State Management
- Local state: `useState`, `useReducer`
- Global state: Zustand store (`stores/useStore.ts`)
- Selectors: Use memoized selectors to prevent unnecessary re-renders
- Persistence: Zustand `persist` middleware for localStorage

### Testing
- Place tests alongside source files: `test/validation.test.ts`
- Use Vitest + React Testing Library
- Follow AAA pattern: Arrange, Act, Assert
- Mock external dependencies (API, localStorage, etc.)

## Environment Variables

- Prefix with `VITE_` for client-side access: `VITE_API_KEY`
- Access in code: `import.meta.env.VITE_API_KEY`
- Template: `.env.example`
- Local overrides: `.env.local` (gitignored)

## Important Notes

- This project uses React 19 with Vite
- CSS is handled via Tailwind (no custom CSS files)
- API keys must NOT be hardcoded - use environment variables
- Always run `npx tsc --noEmit` before committing
- TypeScript errors in `node_modules/` are pre-existing (react-markdown)
