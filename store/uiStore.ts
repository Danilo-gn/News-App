import { create } from 'zustand';

type UiState = {
  themeModalVisible: boolean;
  setThemeModalVisible: (value: boolean) => void;
};

export const useUiStore = create<UiState>(set => ({
  themeModalVisible: false,
  setThemeModalVisible: (value) => set({ themeModalVisible: value }),
}));
