import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';
import Button from './Button';

export default function LogoutModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={[styles.card, SHADOW]} onPress={() => {}}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.copy}>
            Do you want to sign out of this device?
          </Text>
          <Button title="Logout" variant="danger" onPress={onConfirm} />
          <View style={styles.gap} />
          <Button title="Cancel" variant="secondary" onPress={onCancel} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 21, 48, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  copy: {
    color: COLORS.muted,
    lineHeight: 22,
    marginBottom: 20,
  },
  gap: {
    height: 10,
  },
});
