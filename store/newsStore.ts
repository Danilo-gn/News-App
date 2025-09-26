import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type News = {
  id: string;
  title: string;
  description: string;
  image: { uri: string };
  content: string;
  url: string;
  source: string;
  publishedAt?: string;
};

type NewsStore = {
  newsList: News[];
  setNewsList: (news: News[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  favorites: News[];
  addFavorite: (news: News) => void;
  removeFavorite: (id: string) => void;
  loadFavorites: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
  isOffline: boolean;
  setIsOffline: (isOffline: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
};

export const useNewsStore = create<NewsStore>((set, get) => ({
  newsList: [],
  setNewsList: (news) => set({ newsList: news }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  search: '',
  setSearch: (search) => set({ search }),
  favorites: [],
  addFavorite: async (news) => {
    const { favorites } = get();
    if (!favorites.find(fav => fav.id === news.id)) {
      const updated = [...favorites, news];
      set({ favorites: updated });
      await AsyncStorage.setItem('favorites', JSON.stringify(updated))
    }
  },
  removeFavorite: async (id) => {
    const updated = get().favorites.filter(fav => fav.id !== id);
    set({ favorites: get().favorites.filter(fav => fav.id !== id) });
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
  },
  loadFavorites: async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) set({ favorites: JSON.parse(stored) });
  },
  error: null,
  setError: (error) => set({ error }),
  isOffline: false,
  setIsOffline: (offline) => set({ isOffline: offline }),
  category: '',
  setCategory: (category) => set({ category }),
}));