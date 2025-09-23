import { Image } from 'expo-image';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NewsCard } from '@/components/NewsCard';
import { useNewsStore } from '@/store/newsStore';
import { useEffect } from 'react';

export default function TabTwoScreen() {
  const { favorites, loadFavorites } = useNewsStore();

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Image
        source={require('@/assets/images/jornal.png')}
        style={styles.image}
      />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Favoritos</ThemedText>
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
          />
        )}
        ListEmptyComponent={
          <ThemedText style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>
            Nenhuma notícia favoritada.
          </ThemedText>
        }
        contentContainerStyle={{ width: '100%' }}
      />
    </View>
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
    width: '100%',
    height: 100,
    marginTop: 8,
    marginBottom: 8,
  },
});
