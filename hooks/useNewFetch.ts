import NetInfo from "@react-native-community/netinfo";
import { useNewsStore } from "@/store/newsStore";
import { useEffect } from "react";

type UseNewsFetchProps = {
    search: string;
    category: string;
    page: number;
    setHasMore: (hasMore: boolean) => void;
};

export function useNewsFetch({ search, category, page, setHasMore }: UseNewsFetchProps) {
    const { setNewsList, loading, setLoading, newsList, setError, setIsOffline } = useNewsStore();

    useEffect(() => {
        const fetchNews = async () => {
          setLoading(true);
          setError(null);

          const netState = await NetInfo.fetch();
          if (!netState.isConnected) {
            setIsOffline(true);
            setError('Você está offline. Por favor, verifique sua conexão com a internet.');
            setLoading(false);
            return;
          } else {
            setIsOffline(false);
          }

          let url = '';
          if (search) {
            url = `https://newsapi.org/v2/everything?q=${search}&apiKey=5f35e064f65644f9a22e4420cd672e46`;
            if (category) url += `&category=${category}`;
          } else {
            url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5f35e064f65644f9a22e4420cd672e46`;
            if (category) url += `&category=${category}`;
          }
          try {
            const res = await fetch(url);
            if (!res.ok) {
                setError('Erro ao buscar notícias. Por favor, tente novamente mais tarde.');
                setNewsList([]);
                setHasMore(false);
                return;
            }
            const data = await res.json();
            if (data.status !== 'ok') {
                setError('Erro na resposta da API. Por favor, tente novamente mais tarde.');
                setNewsList([]);
                setHasMore(false);
                return;
            }
            const filtered = data.articles
              .filter((item: any) => item.title && item.description && item.urlToImage)
              .map((item: any, idx: number) => ({
                id: `${item.url}-page${page}-idx${idx}`,
                title: item.title,
                description: item.description,
                image: item.urlToImage ? { uri: item.urlToImage } : { uri: 'https://reactnative.dev/img/tiny_logo.png' },
                content: item.content || item.description || 'No content available',
                url: item.url,
                source: item.source?.name || 'desconhecida',
                publishedAt: item.publishedAt,
              }));
            setNewsList(page === 1 ? filtered : [...newsList, ...filtered]);
            setHasMore(filtered.length > 0);
          } catch (e) {
            setError('Erro de conexão ou resposta inválida.');
            setNewsList([]);
            setHasMore(false);
          } finally {
            setLoading(false);
          }
        };
        fetchNews();
      }, [search, category, page]);
}