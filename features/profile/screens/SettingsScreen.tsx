import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { SettingRow } from '@/shared/ui/SettingRow';
import { ToggleSwitch } from '@/shared/ui/ToggleSwitch';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const [autoLocation, setAutoLocation] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBackButton title="Settings" />

        <View style={styles.content}>
          <Section title="General">
            <SettingRow label="Language">
              <AccessoryLabel value="English" />
            </SettingRow>
            <SettingRow label="Distance Unit">
              <AccessoryLabel value="Kilometers" />
            </SettingRow>
          </Section>

          <Section title="Location">
            <SettingRow label="Auto-detect Location">
              <ToggleSwitch onChange={setAutoLocation} value={autoLocation} />
            </SettingRow>
            <SettingRow label="Show Distance">
              <ToggleSwitch onChange={setShowDistance} value={showDistance} />
            </SettingRow>
          </Section>

          <Section title="Privacy">
            <SettingRow label="Save Search History">
              <ToggleSwitch onChange={setSaveHistory} value={saveHistory} />
            </SettingRow>
          </Section>

          <Section title="About">
            <SettingRow label="App Version">
              <Text style={[styles.infoText, { color: colors.mutedForeground }]}>1.0.0</Text>
            </SettingRow>
            <SettingRow label="Terms of Service">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
            </SettingRow>
            <SettingRow label="Privacy Policy">
              <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
            </SettingRow>
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{title}</Text>
      <View style={styles.sectionRows}>{children}</View>
    </View>
  );
}

function AccessoryLabel({ value }: { value: string }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.accessory}>
      <Text style={[styles.infoText, { color: colors.mutedForeground }]}>{value}</Text>
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
  content: {
    gap: 22,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  infoText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
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
