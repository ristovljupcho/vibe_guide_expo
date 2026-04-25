import { Stack } from 'expo-router';

import { ProtectedRoute } from '@/features/auth/components/AuthRouteGate';

export default function PlaceLayout() {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false }} />
    </ProtectedRoute>
  );
}
