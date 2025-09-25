import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useThemeStore } from '@/store/themeStore';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { theme } = useThemeStore();

  return (
    <ThemeProvider value={
      theme === 'dark'
        ? DarkTheme
        : theme === 'light'
        ? DefaultTheme
        : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: '#222', text: '#ff0' } }
    }>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
