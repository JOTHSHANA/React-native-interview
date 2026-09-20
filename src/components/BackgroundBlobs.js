import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function BackgroundBlobs() {
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <View style={styles.blobOne} />
      <View style={styles.blobTwo} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blobOne: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: COLORS.primarySoft,
    top: -80,
    right: -60,
  },
  blobTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFE8E1',
    bottom: 80,
    left: -70,
  },
});
