import { useEffect, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth, useUser } from '@clerk/expo';
import { Redirect } from 'expo-router';

import { Colors } from '@/shared/theme/colors';

function AuthLoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator color={Colors.dark.primary} size="large" />
    </View>
  );
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log('Clerk user:', user);
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return <AuthLoadingScreen />;
  }

  if (!isSignedIn) {
    return <Redirect href="/login" />;
  }

  return children;
}

export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <AuthLoadingScreen />;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return children;
}

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
    flex: 1,
    justifyContent: 'center',
  },
});
