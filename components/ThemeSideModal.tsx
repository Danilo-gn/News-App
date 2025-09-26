import { Modal, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";

type ThemeOption = 'light' | 'dark' | 'custom';

type ThemeSideModalProps = {
    visible: boolean;
    onClose: () => void;
    selected: ThemeOption;
    onSelect: (theme: ThemeOption) => void;
};

export function ThemeSideModal({ visible, onClose, selected, onSelect }: ThemeSideModalProps) {
  return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <ThemedView style={styles.sideModal} >
                    <ThemedText style={styles.title}>Escolha o tema</ThemedText>
                    <TouchableOpacity
                    style={[styles.option, selected === 'light' && styles.selected]}
                    onPress={() => onSelect('light')}
                    >
                        <ThemedText style={styles.optionText}>Light</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.option, selected === 'dark' && styles.selected]}
                    onPress={() => onSelect('dark')}
                    >
                        <ThemedText style={styles.optionText}>Dark</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#222222a4',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sideModal: {
    width: Platform.OS === 'web' ? 320 : 200,
    padding: 24,
    paddingTop: 48,
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 24,
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  selected: {
    backgroundColor: '#1976d2',
    borderRadius: 6,
  },
  optionText: {
    paddingLeft: 8,
    fontSize: 16,
  },
});