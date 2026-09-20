import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function Loader({ fullScreen = false, label = 'Loading' }) {
  const content = (
    <>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {fullScreen ? <Text style={styles.label}>{label}</Text> : null}
    </>
  );

  if (fullScreen) {
    return <View style={styles.fullScreen}>{content}</View>;
  }

  return content;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  label: {
    marginTop: 12,
    color: COLORS.muted,
    fontWeight: '600',
  },
});
