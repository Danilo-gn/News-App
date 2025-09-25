import { ThemedText } from '@/components/themed-text';
import { useThemeStore } from '@/store/themeStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Button, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';

export default function NewsDetailScreen() {
  const { title, image, content, url } = useLocalSearchParams();
  const router = useRouter();
  const {theme} = useThemeStore();

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: theme === 'dark' ? '#000000ff' : '#ffffffff'}]}>
      {image ? (
        <Image source={{ uri: image as string }} style={styles.image} />
      ) : null}
      <ThemedText style={[styles.title, {color: theme === 'dark' ? '#fff' : '#000'}]}>{title}</ThemedText>
      <ThemedText style={[styles.content, {color: theme === 'dark' ? '#fff' : '#000'}]}>{content}</ThemedText>
      {url ? (
        <TouchableOpacity onPress={() => Linking.openURL(url as string)} style={[styles.linkButton, {backgroundColor: theme === 'dark' ? '#ffffffff' : '#0c0c0cff'}]}>
          <ThemedText style={[styles.linkText, {color: theme === 'dark' ? '#000' : '#fff'}]}>Acessar matéria original</ThemedText>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={[styles.closeButton, {backgroundColor: theme === 'dark' ? '#000' : '#fff'}]}>
        <Button
        color={theme === 'dark' ? Platform.OS === 'web' ? '#000' : '#fff' : Platform.OS === 'web' ? '#000' : '#000'} 
        title="Fechar" 
        onPress={() => router.back()}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Platform.OS === 'web' ? '50%' : '100%',
    alignSelf: 'center',
    padding: 20,
    paddingTop: 45,
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: Platform.OS === 'web' ? 500 : 280,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
  },
  closeButton: {
    overflow: 'hidden',
    width: Platform.OS === 'web' ? '60%' : '100%',
    borderRadius: 6,
    alignSelf: 'center',
  },
  linkButton: {
    padding: 12,
    width: Platform.OS === 'web' ? '60%' : '100%',
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});