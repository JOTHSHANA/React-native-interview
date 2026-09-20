import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SHADOW } from '../constants/theme';

export default function ProductCard({ product }) {
  return (
    <View style={[styles.card, SHADOW]}>
      <View style={[styles.panel, { backgroundColor: product.color }]}>
        <View style={styles.hexPill}>
          <Text style={styles.hex}>{product.color}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.pantone}>Pantone {product.pantone_value}</Text>
        <View style={styles.yearChip}>
          <Text style={styles.yearText}>{product.year}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    overflow: 'hidden',
  },
  panel: {
    height: 108,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
  },
  hexPill: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  hex: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
  },
  body: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  pantone: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  yearChip: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  yearText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    fontWeight: '800',
  },
});
