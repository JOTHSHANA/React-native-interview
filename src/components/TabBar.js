import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const TABS = {
  Home: { label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  Products: { label: 'Products', icon: 'grid', iconOutline: 'grid-outline' },
  Profile: { label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
  Logout: { label: 'Logout', icon: 'log-out-outline', iconOutline: 'log-out-outline' },
};

export default function TabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const { requestLogout } = useAuth();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        {state.routes.map((route, index) => {
          const meta = TABS[route.name] || TABS.Home;
          const focused = state.index === index && route.name !== 'Logout';
          const isLogout = route.name === 'Logout';
          const color = isLogout
            ? COLORS.danger
            : focused
              ? COLORS.primary
              : COLORS.muted;

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (isLogout) {
                  requestLogout();
                  return;
                }

                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={styles.item}
            >
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Ionicons
                  name={focused ? meta.icon : meta.iconOutline}
                  size={20}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
              <Text style={[styles.label, { color }]}>{meta.label}</Text>
            </Pressable>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
});
