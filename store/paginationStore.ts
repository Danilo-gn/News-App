import { create } from 'zustand';

type PaginationState = {
  page: number;
  hasMore: boolean;
  setPage: (page: number) => void;
  setHasMore: (value: boolean) => void;
  nextPage: () => void;
  reset: () => void;
};

export const usePaginationStore = create<PaginationState>(set => ({
  page: 1,
  hasMore: true,
  setPage: (page) => set({ page }),
  setHasMore: (value) => set({ hasMore: value }),
  nextPage: () => set(state => ({ page: state.page + 1 })),
  reset: () => set({ page: 1, hasMore: true }),
}));