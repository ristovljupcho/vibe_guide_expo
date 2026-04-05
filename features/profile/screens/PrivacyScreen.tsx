import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { SettingRow } from '@/shared/ui/SettingRow';
import { ToggleSwitch } from '@/shared/ui/ToggleSwitch';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function PrivacyScreen() {
  const { colors } = useAppTheme();
  const [showActivity, setShowActivity] = useState(true);
  const [showSavedPlaces, setShowSavedPlaces] = useState(false);
  const [allowTagging, setAllowTagging] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBackButton title="Privacy" />

        <View style={styles.content}>
          <Section title="Profile Privacy">
            <SettingRow label="Profile Visibility">
              <AccessoryText value="Public" />
            </SettingRow>
            <SettingRow description="Let others see your visits and reviews" label="Show Activity">
              <ToggleSwitch onChange={setShowActivity} value={showActivity} />
            </SettingRow>
            <SettingRow description="Let others see your saved places" label="Show Saved Places">
              <ToggleSwitch onChange={setShowSavedPlaces} value={showSavedPlaces} />
            </SettingRow>
            <SettingRow description="Let friends tag you in their posts" label="Allow Tagging">
              <ToggleSwitch onChange={setAllowTagging} value={allowTagging} />
            </SettingRow>
          </Section>

          <Section title="Data & Privacy">
            <SettingRow description="Share usage data to improve the app" label="Data Sharing">
              <ToggleSwitch onChange={setDataSharing} value={dataSharing} />
            </SettingRow>
            <SettingRow label="Download My Data">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
            </SettingRow>
            <SettingRow danger label="Delete Account">
              <Ionicons color={colors.destructive} name="chevron-forward" size={18} />
            </SettingRow>
          </Section>

          <Section title="Legal">
            <SettingRow label="Privacy Policy">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
            </SettingRow>
            <SettingRow label="Terms of Service">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
            </SettingRow>
            <SettingRow label="Cookie Policy">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
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

function AccessoryText({ value }: { value: string }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.accessory}>
      <Text style={[styles.accessoryText, { color: colors.mutedForeground }]}>{value}</Text>
      <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
    </View>
  );
}

const styles = StyleSheet.create({
  accessory: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  accessoryText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
  },
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
