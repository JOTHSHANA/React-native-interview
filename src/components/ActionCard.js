import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';

export default function ActionCard({ icon, title, subtitle, onPress, tone = 'primary' }) {
  const isAccent = tone === 'accent';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        SHADOW,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          isAccent ? styles.iconAccent : styles.iconPrimary,
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconPrimary: {
    backgroundColor: COLORS.primarySoft,
  },
  iconAccent: {
    backgroundColor: '#FFE8E1',
  },
  icon: {
    fontSize: 24,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    lineHeight: 18,
  },
  chevron: {
    fontSize: 28,
    color: COLORS.muted,
    marginLeft: 8,
    fontWeight: '300',
  },
});
