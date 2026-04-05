import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/shared/theme/colors';
import { useColorScheme } from '@/shared/theme/useColorScheme';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>This screen does not exist.</Text>
        <Link href="/" style={[styles.link, { color: colors.primary }]}>
          Go to home screen
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
