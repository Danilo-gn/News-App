import { TextInput, StyleSheet } from "react-native";
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
        <ThemedView style={[styles.container, {backgroundColor: theme === 'dark' ? '#22222288' : '#d6d6d6ff'}]}>
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
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
});