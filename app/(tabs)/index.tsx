import { Image } from 'expo-image';
import { Platform, StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { NewsCard } from '@/components/NewsCard';
import { useEffect, useState } from 'react';
import { useNewsStore } from '@/store/newsStore';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useNewsFetch } from '@/hooks/useNewFetch';
import { useToastOnErrorOrOffline } from '@/hooks/useToastOnErrorOrOffline';

export default function HomeScreen() {
  const router = useRouter();
  const { newsList, loading, search, setSearch, loadFavorites, error, isOffline } = useNewsStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadFavorites();
  }, []);

  useNewsFetch({ search, category, page, setHasMore });

  useToastOnErrorOrOffline(error, isOffline);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <>
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
            onSelect={cat => {
              setCategory(cat);
              setPage(1);
            }}
          />
        </View>
      }
      ListFooterComponent={loading ? <ActivityIndicator size="large" style={{ margin: 24 }} /> : null}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
    </>
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
    paddingBottom: 8,
    paddingTop: Platform.OS === 'web' ? 0 : 8,
    backgroundColor: '#000000ff',
  }
});
