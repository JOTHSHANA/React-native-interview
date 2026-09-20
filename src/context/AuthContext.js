import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { getErrorMessage } from '../api/apiClient';
import LogoutModal from '../components/LogoutModal';
import { clearToken, getToken, saveToken } from '../storage/authStorage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [logoutVisible, setLogoutVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const storedToken = await getToken();
        if (isMounted) {
          setToken(storedToken);
        }
      } catch {
        if (isMounted) {
          setToken(null);
        }
      } finally {
        if (isMounted) {
          setBootstrapping(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAuthSuccess(nextToken) {
    await saveToken(nextToken);
    setToken(nextToken);
    setAuthError('');
  }

  async function login(credentials) {
    if (authLoading) return;

    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await loginUser(credentials);
      await handleAuthSuccess(response.data.token);
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(credentials) {
    if (authLoading) return;

    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await registerUser(credentials);
      await handleAuthSuccess(response.data.token);
    } catch (error) {
      setAuthError(getErrorMessage(error));
    } finally {
      setAuthLoading(false);
    }
  }

  async function logout() {
    setLogoutVisible(false);
    await clearToken();
    setToken(null);
    setAuthError('');
  }

  function requestLogout() {
    setLogoutVisible(true);
  }

  function cancelLogout() {
    setLogoutVisible(false);
  }

  function clearAuthError() {
    setAuthError('');
  }

  const value = useMemo(
    () => ({
      token,
      bootstrapping,
      authLoading,
      authError,
      login,
      register,
      logout,
      requestLogout,
      clearAuthError,
    }),
    [token, bootstrapping, authLoading, authError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LogoutModal
        visible={logoutVisible}
        onCancel={cancelLogout}
        onConfirm={logout}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
