import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';

export default function NewsDetailScreen() {
  const { title, image, content, url } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {image ? (
        <Image source={{ uri: image as string }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {url ? (
        <TouchableOpacity onPress={() => Linking.openURL(url as string)} style={styles.linkButton}>
          <Text style={styles.linkText}>Acessar matéria original</Text>
        </TouchableOpacity>
      ) : null}
      <Button title="Fechar" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 45,
    color: '#fff',
    backgroundColor: '#000000ff',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#ffffffc0',
    marginBottom: 24,
  },
  linkButton: {
    backgroundColor: '#ffffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#000000ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});