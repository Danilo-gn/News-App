import { Tabs } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeStore } from '@/store/themeStore';

export default function TabLayout() {
  const {theme} = useThemeStore();
  

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { width: '100%', alignSelf: 'center', paddingHorizontal: 240 },
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
