import type { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightActions?: ReactNode;
};

export function ScreenHeader({
  title,
  subtitle,
  showBackButton = false,
  rightActions,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const useSplitBackLayout = showBackButton && !subtitle && !rightActions;

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          paddingTop: insets.top + 12,
        },
      ]}>
      {useSplitBackLayout ? (
        <View style={styles.splitRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              {
                backgroundColor: colors.secondary,
                opacity: pressed ? 0.82 : 1,
              },
            ]}>
            <Ionicons color={colors.text} name="chevron-back" size={20} />
          </Pressable>

          <Text style={[styles.splitTitle, { color: colors.text }]}>{title}</Text>
        </View>
      ) : (
        <View style={styles.titleRow}>
          {showBackButton ? (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                {
                  backgroundColor: colors.secondary,
                  opacity: pressed ? 0.82 : 1,
                },
              ]}>
              <Ionicons color={colors.text} name="chevron-back" size={20} />
            </Pressable>
          ) : null}

          <View style={styles.titleWrap}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            {subtitle ? (
              <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
            ) : null}
          </View>
        </View>
      )}

      {rightActions ? <View style={styles.actions}>{rightActions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  backButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  splitRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitTitle: {
    fontFamily: displayFontFamily,
    fontSize: 28,
    fontWeight: '600',
  },
  title: {
    fontFamily: displayFontFamily,
    fontSize: 28,
    fontWeight: '600',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  titleWrap: {
    flex: 1,
  },
});
