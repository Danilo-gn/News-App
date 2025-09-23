import { View, TextInput, StyleSheet } from "react-native";

type SearchBarProps = {
    value: string;
    onChange: (text: string) => void;
    onSubmit: () => void;
};

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar notícias..."
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
                returnKeyType="search"
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: '#ffffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  input: {
    color: '#fff',
    backgroundColor: '#000000ff',
    padding: 12,
    fontSize: 16,
  },
});