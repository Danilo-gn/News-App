import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_NEWS_KEY = 'recent_news';

export async function saveRecentNews(newsList: any[]) {
    try {
        const last10 = newsList.slice(0, 10);
        await AsyncStorage.setItem(RECENT_NEWS_KEY, JSON.stringify(last10));
    } catch (e) {
        console.error('Erro ao salvar notícias recentes:', e);
    }
}

export async function loadRecentNews() {
    try {
        const stored = await AsyncStorage.getItem(RECENT_NEWS_KEY);
        if (stored) return JSON.parse(stored);
        return [];
    } catch (e) {
        console.error('Erro ao carregar notícias recentes:', e);
        return [];
    }
}