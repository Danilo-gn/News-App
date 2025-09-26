import { View, type ViewProps } from 'react-native';

import { useThemeStore } from '@/store/themeStore';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { theme } = useThemeStore();

  const backgroundColor =
    theme === 'dark'
      ? darkColor ?? '#000'   
      : lightColor ?? '#fff'; 


  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
