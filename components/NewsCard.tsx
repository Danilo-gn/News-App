import { useNewsStore } from "@/store/newsStore";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, Platform } from "react-native";
import { ThemedText } from "./themed-text";
import { useThemeStore } from "@/store/themeStore";

type NewsCardProps = {
    id: string;
    title: string;
    description: string;
    image: any;
    name: string;
    date?: string;
    content: string;
    url: string;
    onPress?: () => void;
};

export function NewsCard({ id, title, description, name, date, image, content, url, onPress }: NewsCardProps) {
  const {favorites, addFavorite, removeFavorite} = useNewsStore();
  const isFavorite = favorites.some(fav => fav.id === id);
  const {theme} = useThemeStore();
  
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
        styles.card,
        {backgroundColor: theme === 'dark' ? '#000000ff' : '#fff'},
        {borderTopColor: theme === 'dark' ? '#ffffffff' : '#000000ff'},
        pressed && { opacity: 0.7 }
    ]}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultSemiBold">{name} {date ? `• ${new Date(date).toLocaleDateString()}` : ''}</ThemedText>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => isFavorite ? removeFavorite(id) : addFavorite({ id, title, description, image, content, url, source: name, publishedAt: date })}
          >
            <Text style={{ color: isFavorite ? 'gold' : '#888' }}>
              {isFavorite ? '★ Favorito' : '☆ Favoritar'}
            </Text>
          </TouchableOpacity>
        </View>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.description}>{description}</ThemedText>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    card: {
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: Platform.OS === 'web' ? '50%' : '100%',
    height: Platform.OS === 'web' ? 700 : 500,
    borderTopWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: Platform.OS === 'web' ? '80%' : '60%',
    borderRadius: Platform.OS === 'web' ? 12 : 0,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    padding: 6,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 8,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 14,
  },
});