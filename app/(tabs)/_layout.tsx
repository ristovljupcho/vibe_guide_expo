import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/shared/theme/colors';
import { useColorScheme } from '@/shared/theme/useColorScheme';

type TabIconName = keyof typeof Ionicons.glyphMap;

function TabIcon({
  color,
  focused,
  activeName,
  inactiveName,
}: {
  color: string;
  focused: boolean;
  activeName: TabIconName;
  inactiveName: TabIconName;
}) {
  return <Ionicons color={color} name={focused ? activeName : inactiveName} size={24} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const tabBarBottomPadding = Math.max(insets.bottom, 16);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.tabIconDefault,
        tabBarStyle: {
          backgroundColor: palette.card,
          borderTopColor: palette.border,
          height: 64 + tabBarBottomPadding,
          paddingTop: 8,
          paddingBottom: tabBarBottomPadding,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="home"
              color={color}
              focused={focused}
              inactiveName="home-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="compass"
              color={color}
              focused={focused}
              inactiveName="compass-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="bookmark"
              color={color}
              focused={focused}
              inactiveName="bookmark-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="calendar"
              color={color}
              focused={focused}
              inactiveName="calendar-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              activeName="person"
              color={color}
              focused={focused}
              inactiveName="person-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
}
