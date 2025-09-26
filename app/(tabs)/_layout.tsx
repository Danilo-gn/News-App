import { Tabs } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeStore } from '@/store/themeStore';
import { useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const {theme} = useThemeStore();
  const horizontalPadding = width > 1024 ? 240 : width > 768 ? 120 : 16;  

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { borderTopStartRadius: 8, borderTopEndRadius: 8, paddingHorizontal: horizontalPadding },
          tabBarActiveTintColor: theme === 'dark' ? '#ffffff' : '#000000',
          tabBarInactiveTintColor: theme === 'dark' ? '#ffffff80' : '#00000080',
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Noticias',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="mail.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="favoritos"
          options={{
            title: 'Favoritos',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
