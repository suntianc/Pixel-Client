import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Theme, Language, LLMProvider, LLMModel, Message, ChatSession } from '../types';

interface AppState {
  // Theme & Language
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;

  // Providers & Models
  providers: LLMProvider[];
  models: LLMModel[];
  activeModelId: string | null;
  setProviders: (providers: LLMProvider[]) => void;
  setModels: (models: LLMModel[]) => void;
  setActiveModelId: (id: string | null) => void;

  // Sessions
  sessions: ChatSession[];
  activeSessionId: string | null;
  messages: Record<string, Message[]>;
  setSessions: (sessions: ChatSession[]) => void;
  setActiveSessionId: (id: string | null) => void;
  setMessages: (sessionId: string, messages: Message[]) => void;
  addSession: (session: ChatSession) => void;
  updateSession: (id: string, updates: Partial<ChatSession>) => void;
  removeSession: (id: string) => void;

  // Mascot
  mascotEnabled: boolean;
  mascotSystemPrompt: string;
  setMascotEnabled: (enabled: boolean) => void;
  setMascotSystemPrompt: (prompt: string) => void;

  // UI State
  sidebarOpen: boolean;
  isModelManagerOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setIsModelManagerOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Theme & Language
        theme: Theme.MODERN_DARK,
        language: 'zh',
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),

        // Providers & Models
        providers: [],
        models: [],
        activeModelId: null,
        setProviders: (providers) => set({ providers }),
        setModels: (models) => set({ models }),
        setActiveModelId: (activeModelId) => set({ activeModelId }),

        // Sessions
        sessions: [],
        activeSessionId: null,
        messages: {},
        setSessions: (sessions) => set({ sessions }),
        setActiveSessionId: (activeSessionId) => set({ activeSessionId }),
        setMessages: (sessionId, messages) => 
          set((state) => ({ 
            messages: { ...state.messages, [sessionId]: messages } 
          })),
        addSession: (session) => 
          set((state) => ({ 
            sessions: [session, ...state.sessions] 
          })),
        updateSession: (id, updates) =>
          set((state) => ({
            sessions: state.sessions.map((s) => 
              s.id === id ? { ...s, ...updates } : s
            )
          })),
        removeSession: (id) =>
          set((state) => ({
            sessions: state.sessions.filter((s) => s.id !== id)
          })),

        // Mascot
        mascotEnabled: true,
        mascotSystemPrompt: '',
        setMascotEnabled: (mascotEnabled) => set({ mascotEnabled }),
        setMascotSystemPrompt: (mascotSystemPrompt) => set({ mascotSystemPrompt }),

        // UI State
        sidebarOpen: true,
        isModelManagerOpen: false,
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        setIsModelManagerOpen: (isModelManagerOpen) => set({ isModelManagerOpen }),
      }),
      { name: 'pixel-verse-storage' }
    )
  )
);

// Selectors for optimized re-renders
export const useTheme = () => useAppStore((state) => state.theme);
export const useLanguage = () => useAppStore((state) => state.language);
export const useProviders = () => useAppStore((state) => state.providers);
export const useModels = () => useAppStore((state) => state.models);
export const useActiveModel = () => useAppStore((state) => ({
  model: state.models.find((m) => m.id === state.activeModelId) || null,
  provider: state.providers.find((p) => 
    p.id === state.models.find((m) => m.id === state.activeModelId)?.providerId
  ) || null
}));
export const useSessions = () => useAppStore((state) => state.sessions);
export const useActiveSession = () => useAppStore((state) => 
  state.sessions.find((s) => s.id === state.activeSessionId) || null
);
