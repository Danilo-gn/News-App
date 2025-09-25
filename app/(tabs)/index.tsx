import { Image } from 'expo-image';
import { Platform, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

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
import { ThemeSideModal } from '@/components/ThemeSideModal';
import { useThemeStore } from '@/store/themeStore';

export default function HomeScreen() {
  const router = useRouter();
  const { newsList, loading, search, setSearch, loadFavorites, error, isOffline } = useNewsStore();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState('');
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const { theme, setTheme } = useThemeStore();

  let imagem = require('@/assets/images/jornal-light.png');
  if (theme === 'dark') {
    imagem = require('@/assets/images/jornal-dark.png');
  } else {
    imagem = require('@/assets/images/jornal-light.png');
  }

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
        backgroundColor: theme === 'dark' ? '#000000ff' : '#ffffffff',
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
        <ThemedView style={[styles.headerContainer, {backgroundColor: theme === 'dark' ? '#000000ff' : '#fff'}]}>
          <Image
            source={imagem}
            style={styles.image}
          />
          <ThemedView style={[styles.titleContainer, {backgroundColor: theme === 'dark' ? '#000' : '#fff'}]}>
            <ThemedText type="title" style={{color: theme === 'dark' ? '#fff' : '#000'}}>News App</ThemedText>
            <TouchableOpacity
              style={[styles.themeButton, {backgroundColor: theme === 'dark' ? '#222' : '#ddd'}]}
              onPress={() => setThemeModalVisible(true)}
            >
              <ThemedText type="default" style={{color: theme === 'dark' ? '#fff' : '#000'}}>Temas</ThemedText>
            </TouchableOpacity>
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
        </ThemedView>
      }
      ListFooterComponent={loading ? <ActivityIndicator size="large" style={{ margin: 24 }} /> : null}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
    <ThemeSideModal
      visible={themeModalVisible}
      onClose={() => setThemeModalVisible(false)}
      selected={theme}
      onSelect={t => {
        setTheme(t);
        setThemeModalVisible(false);
      }}
    />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
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
  },
  themeButton: {
    position: 'absolute', 
    top: 16, 
    right: 2, 
    zIndex: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: Platform.OS === 'web' ? 8 : 6,
  }
});
