import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';

type AuthScaffoldProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  topAction?: ReactNode;
};

export function AuthScaffold({ children, eyebrow, title, subtitle, topAction }: AuthScaffoldProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: insets.bottom + 32,
            paddingTop: insets.top + 40,
          },
        ]}>
        <View style={styles.container}>
          {topAction ? <View style={styles.topAction}>{topAction}</View> : null}
          <View style={styles.header}>
            {eyebrow ? (
              <View style={styles.eyebrowPill}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
              </View>
            ) : null}
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    gap: 28,
    maxWidth: 430,
    width: '100%',
  },
  eyebrowPill: {
    alignSelf: 'center',
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  eyebrowText: {
    color: Colors.dark.primary,
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  screen: {
    backgroundColor: Colors.dark.background,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  subtitle: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  title: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  topAction: {
    alignItems: 'flex-start',
    width: '100%',
  },
});
