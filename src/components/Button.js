import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';

const VARIANTS = {
  primary: {
    button: { backgroundColor: COLORS.primary },
    label: { color: '#FFFFFF' },
    spinner: '#FFFFFF',
  },
  secondary: {
    button: { backgroundColor: COLORS.primarySoft },
    label: { color: COLORS.primaryDark },
    spinner: COLORS.primary,
  },
  ghost: {
    button: { backgroundColor: 'transparent' },
    label: { color: COLORS.muted },
    spinner: COLORS.muted,
  },
  danger: {
    button: { backgroundColor: COLORS.dangerSoft },
    label: { color: COLORS.danger },
    spinner: COLORS.danger,
  },
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const isDisabled = disabled || loading;
  const palette = VARIANTS[variant] || VARIANTS.primary;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && SHADOW,
        palette.button,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.spinner} />
      ) : (
        <Text style={[styles.label, palette.label]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
