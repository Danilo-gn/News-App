import { useThemeStore } from "@/store/themeStore";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

const categories = [
    { key: '', label: 'Todas' },
    { key: 'business', label: 'Negócios' },
    { key: 'entertainment', label: 'Entretenimento' },
    { key: 'general', label: 'Geral' },
    { key: 'health', label: 'Saúde' },
    { key: 'science', label: 'Ciência' },
    { key: 'sports', label: 'Esportes' },
    { key: 'technology', label: 'Tecnologia' },
]

type CategoryFilterProps = {
    selected: string;
    onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect}: CategoryFilterProps) {
    const {theme} = useThemeStore();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {categories.map(cat => (
                <TouchableOpacity
                    key={cat.key}
                    style={[
                        styles.button,
                        {backgroundColor: theme === 'dark' ? '#222' : '#ddd'},
                        selected === cat.key && styles.selected,
                    ]}
                    onPress={() => onSelect(cat.key)}
                >
                    <ThemedText style={[
                        styles.text,
                        selected === cat.key && styles.selectedText,
                    ]}>
                        {cat.label}
                    </ThemedText>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingTop: 4,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#1976d2',
  },
  text: {
    fontSize: 15,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});