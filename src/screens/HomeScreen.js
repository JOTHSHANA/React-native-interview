import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getProducts } from '../api/productApi';
import { getUserDetails } from '../api/userApi';
import BackgroundBlobs from '../components/BackgroundBlobs';
import { COLORS, SHADOW } from '../constants/theme';

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [productTotal, setProductTotal] = useState(null);

  useEffect(() => {
    getUserDetails()
      .then((response) => setUser(response.data.data))
      .catch(() => {});

    getProducts(1)
      .then((response) => setProductTotal(response.data.total))
      .catch(() => {});
  }, []);

  const today = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }),
    []
  );

  const firstName = user?.first_name || 'there';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" />
      <BackgroundBlobs />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.greeting}>{greetingForNow()}</Text>
            <Text style={styles.hello}>{firstName}</Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>API live</Text>
          </View>
        </View>
        <Text style={styles.date}>{today}</Text>

        <View style={[styles.hero, SHADOW]}>
          <Text style={styles.heroKicker}>ReqRes Studio</Text>
          <Text style={styles.heroTitle}>Your workspace is ready</Text>
          <Text style={styles.heroCopy}>
            Browse the color catalog, open your profile, or sign out anytime from
            the bar below.
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Products')}
            style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}
          >
            <Text style={styles.heroButtonText}>Open catalog</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <StatCard value={productTotal ?? '—'} label="Products" />
          <StatCard value="2" label="Pages" />
          <StatCard value="1" label="Profile" />
        </View>

        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.exploreRow}>
          <ExploreCard
            emoji="🎨"
            title="Products"
            copy="Paginated colors with pull-to-refresh"
            onPress={() => navigation.navigate('Products')}
          />
          <ExploreCard
            emoji="👤"
            title="Profile"
            copy="Avatar, name, email, and user ID"
            tone="accent"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>

        <View style={[styles.tip, SHADOW]}>
          <Text style={styles.tipLabel}>Quick tip</Text>
          <Text style={styles.tipText}>
            On Products, pull down to refresh and keep scrolling to load page 2.
            Logout lives in the bottom bar and also on Profile.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ value, label }) {
  return (
    <View style={[styles.stat, SHADOW]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ExploreCard({ emoji, title, copy, onPress, tone = 'primary' }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.exploreCard,
        SHADOW,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.exploreIcon,
          tone === 'accent' ? styles.exploreIconAccent : styles.exploreIconPrimary,
        ]}
      >
        <Text style={styles.exploreEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.exploreTitle}>{title}</Text>
      <Text style={styles.exploreCopy}>{copy}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 14,
  },
  hello: {
    marginTop: 4,
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
  },
  date: {
    marginTop: 4,
    marginBottom: 22,
    color: COLORS.muted,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  liveText: {
    color: COLORS.success,
    fontWeight: '800',
    fontSize: 12,
  },
  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: 22,
    marginBottom: 16,
  },
  heroKicker: {
    color: '#DDD8FF',
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 8,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  heroCopy: {
    marginTop: 10,
    color: '#E4E0FF',
    lineHeight: 21,
    marginBottom: 18,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  heroButtonText: {
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  stat: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLabel: {
    marginTop: 4,
    color: COLORS.muted,
    fontWeight: '700',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  exploreRow: {
    flexDirection: 'row',
    gap: 10,
  },
  exploreCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 16,
  },
  exploreIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  exploreIconPrimary: {
    backgroundColor: COLORS.primarySoft,
  },
  exploreIconAccent: {
    backgroundColor: '#FFE8E1',
  },
  exploreEmoji: {
    fontSize: 22,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  exploreCopy: {
    marginTop: 6,
    color: COLORS.muted,
    lineHeight: 18,
    fontSize: 13,
  },
  tip: {
    marginTop: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
  },
  tipLabel: {
    color: COLORS.accent,
    fontWeight: '800',
    marginBottom: 6,
  },
  tipText: {
    color: COLORS.muted,
    lineHeight: 20,
  },
});
