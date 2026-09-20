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
import { validateLogin } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const { login, authLoading, authError, clearAuthError } = useAuth();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [errors, setErrors] = useState({});

  function updateEmail(value) {
    setEmail(value);
    clearAuthError();
  }

  function updatePassword(value) {
    setPassword(value);
    clearAuthError();
  }

  async function handleLogin() {
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await login({ email: email.trim(), password });
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
            <Text style={styles.brandLetter}>R</Text>
          </View>
          <Text style={styles.kicker}>ReqRes Studio</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to view your profile and browse the product catalog.
          </Text>

          <View style={[styles.card, SHADOW]}>
            <Input
              label="Email"
              value={email}
              onChangeText={updateEmail}
              placeholder="you@email.com"
              keyboardType="email-address"
              error={errors.email}
            />
            <Input
              label="Password"
              value={password}
              onChangeText={updatePassword}
              placeholder="Enter password"
              secureTextEntry
              error={errors.password}
            />

            <ErrorBanner message={authError} />
            <Button title="Continue" onPress={handleLogin} loading={authLoading} />
          </View>

          <Pressable
            onPress={() => navigation.navigate('Register')}
            disabled={authLoading}
            style={styles.linkWrap}
          >
            <Text style={styles.linkText}>
              New here? <Text style={styles.link}>Create an account</Text>
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  brandLetter: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  kicker: {
    color: COLORS.primary,
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
