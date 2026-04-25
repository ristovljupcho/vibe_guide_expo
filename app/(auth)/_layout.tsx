import { Stack } from 'expo-router';

import { PublicOnlyRoute } from '@/features/auth/components/AuthRouteGate';

export default function AuthLayout() {
  return (
    <PublicOnlyRoute>
      <Stack screenOptions={{ headerShown: false }} />
    </PublicOnlyRoute>
  );
}
