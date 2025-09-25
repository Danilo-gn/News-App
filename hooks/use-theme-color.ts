import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeName = keyof typeof Colors;

export function useThemeColor(
  props: Partial<Record<ThemeName, string>>,
  colorName: string
) {
  const theme = (useColorScheme() as ThemeName) ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else if (Colors[theme] && colorName in Colors[theme]) {
    return Colors[theme][colorName as keyof typeof Colors[typeof theme]];
  } else {
    return Colors.light[colorName as keyof typeof Colors.light];
  }
}