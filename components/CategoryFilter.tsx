import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from "react-native";

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
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
            {categories.map(cat => (
                <TouchableOpacity
                    key={cat.key}
                    style={[
                        styles.button,
                        selected === cat.key && styles.selected,
                    ]}
                    onPress={() => onSelect(cat.key)}
                >
                    <Text style={[
                        styles.text,
                        selected === cat.key && styles.selectedText,
                    ]}>
                        {cat.label}
                    </Text>
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
    backgroundColor: '#222',
    marginRight: 8,
  },
  selected: {
    backgroundColor: '#1976d2',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});