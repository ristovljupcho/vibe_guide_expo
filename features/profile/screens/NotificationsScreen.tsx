import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { SettingRow } from '@/shared/ui/SettingRow';
import { ToggleSwitch } from '@/shared/ui/ToggleSwitch';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function NotificationsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [newPlaces, setNewPlaces] = useState(true);
  const [events, setEvents] = useState(true);
  const [offers, setOffers] = useState(true);
  const [recommendations, setRecommendations] = useState(false);
  const [friendActivity, setFriendActivity] = useState(true);
  const [reviews, setReviews] = useState(true);
  const { colors } = useAppTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBackButton title="Notifications" />

        <View style={styles.content}>
          <Section title="Notification Channels">
            <SettingRow description="Receive notifications on your device" label="Push Notifications">
              <ToggleSwitch onChange={setPushEnabled} value={pushEnabled} />
            </SettingRow>
            <SettingRow description="Receive notifications via email" label="Email Notifications">
              <ToggleSwitch onChange={setEmailEnabled} value={emailEnabled} />
            </SettingRow>
          </Section>

          <Section title="Content Notifications">
            <SettingRow description="Get notified about new places near you" label="New Places">
              <ToggleSwitch onChange={setNewPlaces} value={newPlaces} />
            </SettingRow>
            <SettingRow description="Stay updated on upcoming events" label="Events">
              <ToggleSwitch onChange={setEvents} value={events} />
            </SettingRow>
            <SettingRow description="Never miss special offers and deals" label="Daily Offers">
              <ToggleSwitch onChange={setOffers} value={offers} />
            </SettingRow>
            <SettingRow
              description="Get suggestions based on your preferences"
              label="Personalized Recommendations">
              <ToggleSwitch onChange={setRecommendations} value={recommendations} />
            </SettingRow>
          </Section>

          <Section title="Social">
            <SettingRow description="See when friends save or visit places" label="Friend Activity">
              <ToggleSwitch onChange={setFriendActivity} value={friendActivity} />
            </SettingRow>
            <SettingRow description="Get notified about responses to your reviews" label="Reviews & Comments">
              <ToggleSwitch onChange={setReviews} value={reviews} />
            </SettingRow>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{title}</Text>
      <View style={styles.sectionRows}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  screen: {
    flex: 1,
  },
  section: {
    gap: 12,
  },
  sectionRows: {
    gap: 10,
  },
  sectionTitle: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
