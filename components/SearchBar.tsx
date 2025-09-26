import { TextInput, StyleSheet, Platform } from "react-native";
import { ThemedView } from "./themed-view";
import { useThemeStore } from "@/store/themeStore";

type SearchBarProps = {
    value: string;
    onChange: (text: string) => void;
    onSubmit: () => void;
};

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
    const {theme} = useThemeStore();
    return (
        <ThemedView style={styles.container}>
            <TextInput
                style={[styles.input, {color: theme === 'dark' ? '#fff' : '#000'}]}
                placeholder="Buscar notícias..."
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#1818187e'}
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                returnKeyType="search"
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    filter: 'invert(12%)',
    width: Platform.OS === 'web' ? '50%' : '100%',
    alignSelf: 'center',
    borderRadius: Platform.OS === 'web' ? 12 : 0,
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
});