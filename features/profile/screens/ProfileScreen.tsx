import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getProfileData, type ProfileData } from '@/api';
import { ActionIconButton } from '@/shared/ui/ActionIconButton';
import { useAppColorScheme } from '@/shared/theme/ColorSchemeProvider';
import { bodyFontFamily, displayFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

const menuItems = [
  { label: 'Edit Profile', href: '/profile/edit' },
  { label: 'Favorite Traits', href: '/profile/favorite-traits' },
  { label: 'Settings', href: '/profile/settings' },
  { label: 'Notifications', href: '/profile/notifications' },
  { label: 'Privacy', href: '/profile/privacy' },
  { label: 'Help & Support', href: '/profile/help-support' },
] as const;

const iconMap = {
  heart: 'heart-outline',
  location: 'location-outline',
  calendar: 'calendar-outline',
  ribbon: 'ribbon-outline',
} as const;

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleColorScheme } = useAppColorScheme();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    let mounted = true;

    getProfileData().then((payload) => {
      if (mounted) {
        setProfile(payload);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!profile) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingTop: insets.top + 18 }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>
                {profile.initials}
              </Text>
            </View>
            <View style={styles.profileTextWrap}>
              <Text style={[styles.profileName, { color: colors.text }]}>{profile.fullName}</Text>
              <Text style={[styles.profileUsername, { color: colors.mutedForeground }]}>
                {profile.username}
              </Text>
              <View style={styles.locationRow}>
                <Ionicons color={colors.mutedForeground} name="location-outline" size={14} />
                <Text style={[styles.locationText, { color: colors.mutedForeground }]}>
                  {profile.location}
                </Text>
              </View>
            </View>
            <ActionIconButton
              icon="settings-outline"
              onPress={() => router.push('/profile/settings' as Href)}
            />
          </View>

          <View style={styles.statsRow}>
            {profile.stats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <View style={[styles.statIconWrap, { backgroundColor: colors.secondary }]}>
                  <Ionicons color={colors.primary} name={iconMap[stat.icon]} size={18} />
                </View>
                <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.themeCard, { backgroundColor: colors.card }]}>
            <View style={styles.themeLabelRow}>
              <Ionicons
                color={colors.text}
                name={colorScheme === 'dark' ? 'moon-outline' : 'sunny-outline'}
                size={20}
              />
              <Text style={[styles.themeLabel, { color: colors.text }]}>Theme</Text>
            </View>
            <Pressable
              onPress={toggleColorScheme}
              style={({ pressed }) => [
                styles.themeButton,
                {
                  backgroundColor: colors.secondary,
                  opacity: pressed ? 0.86 : 1,
                },
              ]}>
              <Text style={[styles.themeButtonText, { color: colors.text }]}>
                {colorScheme === 'dark' ? 'Dark' : 'Light'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => router.push(item.href as Href)}
                style={({ pressed }) => [
                  styles.menuItem,
                  {
                    backgroundColor: colors.card,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}>
                <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
                <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
              </Pressable>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              {
                backgroundColor: colors.destructive,
                opacity: pressed ? 0.9 : 1,
              },
            ]}>
            <Text style={[styles.logoutText, { color: colors.destructiveForeground }]}>
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: 999,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  avatarText: {
    fontFamily: displayFontFamily,
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    gap: 22,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
  },
  logoutButton: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 52,
  },
  logoutText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  menuItem: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  menuLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '600',
  },
  menuList: {
    gap: 10,
  },
  profileName: {
    fontFamily: displayFontFamily,
    fontSize: 24,
    fontWeight: '600',
  },
  profileRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  profileTextWrap: {
    flex: 1,
  },
  profileUsername: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    marginTop: 4,
  },
  screen: {
    flex: 1,
  },
  statIconWrap: {
    alignItems: 'center',
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  statLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  statValue: {
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 88,
    paddingHorizontal: 16,
  },
  themeButtonText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  themeCard: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingHorizontal: 16,
  },
  themeLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '600',
  },
  themeLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
