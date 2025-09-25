import { Image } from 'expo-image';
import { FlatList, Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NewsCard } from '@/components/NewsCard';
import { useNewsStore } from '@/store/newsStore';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';

export default function TabTwoScreen() {
  const { favorites, loadFavorites } = useNewsStore();
  const router = useRouter();
  const { theme } = useThemeStore();

  let imagem = require('@/assets/images/jornal-light.png');
  if (theme === 'dark') {
    imagem = require('@/assets/images/jornal-dark.png');
  } else {
    imagem = require('@/assets/images/jornal-light.png');
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <ThemedView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000000ff' : '#ffffffff' }}>
      <Image
        source={imagem}
        style={styles.image}
      />
      <ThemedView style={[styles.titleContainer, {backgroundColor: theme === 'dark' ? '#000000ff' : '#ffffffff'}]}>
        <ThemedText type="title" style={{color: theme === 'dark' ? '#fff' : '#000'}}>Favoritos</ThemedText>
      </ThemedView>
      <FlatList
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
        ListEmptyComponent={
          <ThemedText style={{ color: theme === 'dark' ? '#fff' : '#000', textAlign: 'center', marginTop: 40 }}>
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
});
