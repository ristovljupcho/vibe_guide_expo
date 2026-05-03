import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ClerkLoaded, ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

import { ColorSchemeProvider, useAppColorScheme } from '@/shared/theme/ColorSchemeProvider';
import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function RootNavigator() {
  const { colorScheme } = useAppColorScheme();
  const palette = Colors[colorScheme];
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...theme,
        colors: {
          ...theme.colors,
          background: palette.background,
          card: palette.card,
          border: palette.border,
          primary: palette.primary,
          text: palette.text,
          notification: palette.accent,
        },
      }}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: palette.background } }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="place" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

function MissingClerkKeyScreen() {
  return (
    <View style={styles.missingKeyScreen}>
      <Text style={styles.missingKeyTitle}>Clerk key missing</Text>
      <Text style={styles.missingKeyText}>
        Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment before starting the app.
      </Text>
    </View>
  );
}

function decodeBase64Url(value: string) {
  if (typeof atob !== 'function') {
    return '';
  }
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
}

function getClerkDomainFromPublishableKey(publishableKey: string) {
  const encodedPayload = publishableKey.split('_').slice(2).join('_');
  if (!encodedPayload) {
    return undefined;
  }

  try {
    const decoded = decodeBase64Url(encodedPayload);
    // Newer Clerk keys may include extra metadata segments separated by "$".
    // We only need the hostname part for web script loading.
    const domain = decoded.split('$').find((segment) => segment.includes('.'));
    return domain || undefined;
  } catch {
    return undefined;
  }
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkDomain = publishableKey ? getClerkDomainFromPublishableKey(publishableKey) : undefined;

  if (!publishableKey) {
    return <MissingClerkKeyScreen />;
  }

  return (
    <ClerkProvider domain={clerkDomain} publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeProvider>
            <RootNavigator />
          </ColorSchemeProvider>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  missingKeyScreen: {
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  missingKeyText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 340,
    textAlign: 'center',
  },
  missingKeyTitle: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 24,
    fontWeight: '800',
  },
});
