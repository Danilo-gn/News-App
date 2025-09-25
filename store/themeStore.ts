import { create } from 'zustand';

type ThemeOption = 'light' | 'dark' | 'custom';

type ThemeStore = {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));