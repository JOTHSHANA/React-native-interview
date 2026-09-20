import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: COLORS.dangerSoft,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  title: {
    color: COLORS.danger,
    fontWeight: '800',
    marginBottom: 4,
  },
  message: {
    color: COLORS.danger,
    lineHeight: 18,
  },
});
