import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BackgroundBlobs from '../components/BackgroundBlobs';
import Button from '../components/Button';
import ErrorBanner from '../components/ErrorBanner';
import Input from '../components/Input';
import { COLORS, SHADOW } from '../constants/theme';
import { useAuth } from '../context/AuthContext';
import { validateRegister } from '../utils/validation';

export default function RegisterScreen({ navigation }) {
  const { register, authLoading, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [confirmPassword, setConfirmPassword] = useState('pistol');
  const [errors, setErrors] = useState({});

  function updateField(setter) {
    return (value) => {
      setter(value);
      clearAuthError();
    };
  }

  async function handleRegister() {
    const nextErrors = validateRegister({ email, password, confirmPassword });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await register({ email: email.trim(), password });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <BackgroundBlobs />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandMark}>
            <Text style={styles.brandLetter}>+</Text>
          </View>
          <Text style={styles.kicker}>Join ReqRes</Text>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Use a valid email, at least 6 characters, and matching passwords.
          </Text>

          <View style={[styles.card, SHADOW]}>
            <Input
              label="Email"
              value={email}
              onChangeText={updateField(setEmail)}
              placeholder="you@email.com"
              keyboardType="email-address"
              error={errors.email}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={updateField(setPassword)}
              placeholder="Minimum 6 characters"
              secureTextEntry
              error={errors.password}
            />
            <Input
              label="Confirm password"
              value={confirmPassword}
              onChangeText={updateField(setConfirmPassword)}
              placeholder="Re-enter password"
              secureTextEntry
              error={errors.confirmPassword}
            />

            <ErrorBanner message={authError} />
            <Button
              title="Create account"
              onPress={handleRegister}
              loading={authLoading}
            />
          </View>

          <Pressable
            onPress={() => navigation.navigate('Login')}
            disabled={authLoading}
            style={styles.linkWrap}
          >
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.link}>Login</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  brandMark: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  brandLetter: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  kicker: {
    color: COLORS.accent,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 26,
    color: COLORS.muted,
    lineHeight: 22,
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
  },
  linkWrap: {
    marginTop: 22,
    alignItems: 'center',
  },
  linkText: {
    color: COLORS.muted,
    fontSize: 15,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
