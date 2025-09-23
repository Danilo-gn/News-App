import { useNewsStore } from "@/store/newsStore";
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";

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
  
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.7 }
    ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.source}>{name} {date ? `• ${new Date(date).toLocaleDateString()}` : ''}</Text>
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: '#000000ff',
    overflow: 'hidden',
    elevation: 2,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 500,
    borderTopColor: '#ffffffff',
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
    height: "60%",
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
  source: {
    color: '#ffffffff',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 8,
    fontSize: 15,
    marginBottom: 2,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 14,
  },
});