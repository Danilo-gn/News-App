import { Image } from 'expo-image';
import { Animated, FlatList, Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NewsCard } from '@/components/NewsCard';
import { useNewsStore } from '@/store/newsStore';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import { useImageScale } from '@/hooks/useImageScale';

export default function TabTwoScreen() {
  const { favorites, loadFavorites } = useNewsStore();
  const router = useRouter();
  const { theme } = useThemeStore();
  const { scrollY, imageScale } = useImageScale();

  let imagem = theme === 'dark'
      ? require('@/assets/images/jornal-dark.png')
      : require('@/assets/images/jornal-light.png');

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NewsCard
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            name={item.source}
            date={item.publishedAt}
            content={item.content}
            url={item.url}
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
        onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
        ListHeaderComponent={
          <ThemedView style={styles.headerContainer}>
            <Animated.Image
              source={imagem}
              style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Favoritos</ThemedText>
            </ThemedView>
          </ThemedView>
        }
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center', marginTop: 40 }}>
            Nenhuma notícia favoritada.
          </ThemedText>
        }
        contentContainerStyle={{ width: '100%' }}
      />
    </ThemedView>
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
});
