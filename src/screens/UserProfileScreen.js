import { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { getErrorMessage } from '../api/apiClient';
import { getUserDetails } from '../api/userApi';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { COLORS, SHADOW } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function UserProfileScreen() {
  const { requestLogout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getUserDetails();
      setUser(response.data.data);
    } catch (err) {
      setUser(null);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return <Loader fullScreen label="Loading profile" />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.errorIcon}>
            <Ionicons name="alert-circle" size={32} color={COLORS.danger} />
          </View>
          <Text style={styles.errorTitle}>Could not load profile</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={loadProfile} />
        </View>
      </SafeAreaView>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <SafeAreaView style={styles.topSafe} edges={['top']}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.blobOne} />
            <View style={styles.blobTwo} />
            <Text style={styles.heroLabel}>Your profile</Text>
            <Text style={styles.heroTitle}>Account details</Text>
          </View>

          <View style={styles.identity}>
            <View style={styles.avatarRing}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.onlineDot} />
            </View>
            <Text style={styles.name}>{fullName}</Text>
            <View style={styles.rolePill}>
              <Ionicons name="shield-checkmark" size={14} color={COLORS.primary} />
              <Text style={styles.roleText}>Verified ReqRes user</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, SHADOW]}>
              <Text style={styles.statValue}>#{user.id}</Text>
              <Text style={styles.statLabel}>User ID</Text>
            </View>
            <View style={[styles.statCard, SHADOW]}>
              <Text style={styles.statValue}>Active</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Personal info</Text>
          <View style={[styles.card, SHADOW]}>
            <InfoRow icon="mail-outline" label="Email" value={user.email} />
            <View style={styles.divider} />
            <InfoRow icon="person-outline" label="First name" value={user.first_name} />
            <View style={styles.divider} />
            <InfoRow
              icon="person-circle-outline"
              label="Last name"
              value={user.last_name}
            />
            <View style={styles.divider} />
            <InfoRow icon="key-outline" label="User ID" value={String(user.id)} last />
          </View>

          <View style={styles.logoutWrap}>
            <Button
              title="Logout"
              variant="danger"
              onPress={requestLogout}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, last = false }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topSafe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 72,
    overflow: 'hidden',
  },
  blobOne: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
    top: -50,
    right: -30,
  },
  blobTwo: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,122,89,0.35)',
    bottom: 20,
    left: -20,
  },
  heroLabel: {
    color: '#DDD8FF',
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  heroTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  identity: {
    alignItems: 'center',
    marginTop: -52,
    paddingHorizontal: 20,
  },
  avatarRing: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...SHADOW,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: COLORS.primarySoft,
  },
  onlineDot: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  rolePill: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  roleText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 22,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
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
    marginTop: 24,
    marginBottom: 10,
    marginHorizontal: 24,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  rowLast: {
    paddingBottom: 16,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowCopy: {
    flex: 1,
  },
  rowLabel: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  rowValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 62,
  },
  logoutWrap: {
    marginTop: 22,
    marginHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  errorIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.muted,
    marginBottom: 16,
    lineHeight: 20,
  },
});
