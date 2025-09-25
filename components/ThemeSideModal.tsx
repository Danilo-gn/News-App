import { useThemeStore } from "@/store/themeStore";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Platform } from "react-native";

type ThemeOption = 'light' | 'dark' | 'custom';

type ThemeSideModalProps = {
    visible: boolean;
    onClose: () => void;
    selected: ThemeOption;
    onSelect: (theme: ThemeOption) => void;
};

export function ThemeSideModal({ visible, onClose, selected, onSelect }: ThemeSideModalProps) {
    const {theme} = useThemeStore();

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <View style={[styles.sideModal, {backgroundColor: theme === 'dark' ? '#333' : '#d3d3d3ff'}]} >
                    <Text style={[styles.title, {color: theme === 'dark' ? '#fff' : '#000'}]}>Escolha o tema</Text>
                    <TouchableOpacity
                    style={[styles.option, selected === 'light' && styles.selected]}
                    onPress={() => onSelect('light')}
                    >
                        <Text style={[styles.optionText, {color: theme === 'dark' ? '#fff' : '#000'}]}>Light</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.option, selected === 'dark' && styles.selected]}
                    onPress={() => onSelect('dark')}
                    >
                        <Text style={[styles.optionText, {color: theme === 'dark' ? '#fff' : '#000'}]}>Dark</Text>
                    </TouchableOpacity>
                </View>
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
    color: '#fff',
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
    color: '#fff',
    fontSize: 16,
  },
});