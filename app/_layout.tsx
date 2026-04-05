import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ColorSchemeProvider, useAppColorScheme } from '@/shared/theme/ColorSchemeProvider';
import { Colors } from '@/shared/theme/colors';

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="place" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <RootNavigator />
    </ColorSchemeProvider>
  );
}
