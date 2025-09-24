import { Image } from 'expo-image';
import { Platform, StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { NewsCard } from '@/components/NewsCard';
import { use, useEffect, useState } from 'react';
import { useNewsStore } from '@/store/newsStore';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';

export default function HomeScreen() {
  const router = useRouter();
  const { newsList, setNewsList, loading, setLoading, search, setSearch, loadFavorites } = useNewsStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  const fetchNews = async (reset = false) => {
    setLoading(true);
    let url = '';
    if (search) {
      url = `https://newsapi.org/v2/everything?q=${search}&apiKey=c263e63109d243a5b55384ff52e4e3c7`;
      if (category) url += `&category=${category}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c263e63109d243a5b55384ff52e4e3c7`;
      if (category) url += `&category=${category}`;
    }
    try {
      const res = await fetch(url);
      const data = await res.json();
      const filtered = data.articles
        .filter((item: any) => item.title && item.description && item.urlToImage)
        .map((item: any, idx: number) => ({
          id: `${item.url}-page${reset ? 1 : page}-idx${idx}`,
          title: item.title,
          description: item.description,
          image: item.urlToImage ? { uri: item.urlToImage } : { uri: 'https://reactnative.dev/img/tiny_logo.png' },
          content: item.content || item.description || 'No content available',
          url: item.url,
          source: item.source?.name || 'desconhecida',
          publishedAt: item.publishedAt,
        }));
      if (reset) {
        setNewsList(filtered);
      } else {
        setNewsList([...newsList, ...filtered]);
      }
      setHasMore(filtered.length > 0);
    } catch {
      setNewsList([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchNews(true);
  }, [search, category]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews();
    }
  }, [page]);

  return (
    <FlatList
      style={{ 
        flex: 1, 
        backgroundColor: '#000000ff',
       }}
      data={newsList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <NewsCard
          id={item.id}
          content={item.content}
          url={item.url}
          title={item.title}
          description={item.description}
          image={item.image}
          name={item.source}
          date={item.publishedAt}
          onPress={() => router.push({
            pathname: '/news/[id]',
            params: {
              id: item.id,
              title: item.title,
              image: item.image.uri,
              name: item.source,
              date: item.publishedAt,
              content: item.content,
              url: item.url,
            }
          })}
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/jornal.png')}
            style={styles.image}
          />
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">News App</ThemedText>
          </ThemedView>
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={() => setSearch(search)}
          />
          <CategoryFilter
            selected={category}
            onSelect={cat => setCategory(cat)}
          />
        </View>
      }
      ListFooterComponent={loading ? <ActivityIndicator size="large" style={{ margin: 24 }} /> : null}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#000000ff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 8,
  },
  image: {
    width: Platform.OS === 'web' ? '25%' : '100%',
    height: Platform.OS === 'web' ? 120 : 100,
    marginBottom: 8,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    paddingBottom: Platform.OS === 'web' ? 16 : 16,
    paddingTop: Platform.OS === 'web' ? 0 : 8,
    backgroundColor: '#000000ff',
  }
});
