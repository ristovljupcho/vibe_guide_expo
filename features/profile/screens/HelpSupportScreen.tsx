import { useEffect, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  getHelpSupportContent,
  type ContactOption,
  type FaqItem,
} from '@/api';
import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { SearchField } from '@/shared/ui/SearchField';
import {
  bodyFontFamily,
  screenPadding,
} from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function HelpSupportScreen() {
  const { colors } = useAppTheme();
  const [query, setQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [contactOptions, setContactOptions] = useState<ContactOption[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [quickLinks, setQuickLinks] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    getHelpSupportContent().then((payload) => {
      if (!mounted) {
        return;
      }

      setContactOptions(payload.contactOptions);
      setFaqItems(payload.faqItems);
      setQuickLinks(payload.quickLinks);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredFaqs = faqItems.filter((item) => {
    if (!query) {
      return true;
    }

    const normalized = query.toLowerCase();

    return (
      item.question.toLowerCase().includes(normalized) ||
      item.answer.toLowerCase().includes(normalized)
    );
  });

  if (contactOptions.length === 0) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBackButton title="Help & Support" />

        <View style={styles.content}>
          <SearchField
            onChangeText={setQuery}
            placeholder="Search help articles..."
            value={query}
          />

          <SupportSection title="Contact Us">
            {contactOptions.map((option) => (
              <Pressable
                key={option.label}
                disabled={!option.available}
                style={({ pressed }) => [
                  styles.contactCard,
                  {
                    backgroundColor: colors.card,
                    opacity: option.available ? (pressed ? 0.88 : 1) : 0.5,
                  },
                ]}>
                <View style={[styles.contactIconWrap, { backgroundColor: `${colors.primary}1F` }]}>
                  <Ionicons color={colors.primary} name={option.icon} size={20} />
                </View>
                <View style={styles.contactCopy}>
                  <Text style={[styles.contactLabel, { color: colors.text }]}>{option.label}</Text>
                  <Text style={[styles.contactDescription, { color: colors.mutedForeground }]}>
                    {option.description}
                  </Text>
                </View>
                {option.available ? (
                  <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
                ) : null}
              </Pressable>
            ))}
          </SupportSection>

          <SupportSection title="Frequently Asked Questions">
            {filteredFaqs.map((item) => {
              const expanded = expandedFaq === item.id;

              return (
                <View key={item.id} style={[styles.faqCard, { backgroundColor: colors.card }]}>
                  <Pressable
                    onPress={() =>
                      setExpandedFaq((current) => (current === item.id ? null : item.id))
                    }
                    style={styles.faqButton}>
                    <Text style={[styles.faqQuestion, { color: colors.text }]}>{item.question}</Text>
                    <Ionicons
                      color={colors.mutedForeground}
                      name={expanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                    />
                  </Pressable>
                  {expanded ? (
                    <Text style={[styles.faqAnswer, { color: colors.mutedForeground }]}>
                      {item.answer}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </SupportSection>

          <SupportSection title="Quick Links">
            {quickLinks.map((link) => (
              <Pressable
                key={link}
                style={({ pressed }) => [
                  styles.quickLink,
                  {
                    backgroundColor: colors.card,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}>
                <Text style={[styles.quickLinkLabel, { color: colors.text }]}>{link}</Text>
                <Ionicons color={colors.mutedForeground} name="chevron-forward" size={18} />
              </Pressable>
            ))}
          </SupportSection>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>VibeGuide v1.0.0</Text>
            <Text style={[styles.footerText, { color: colors.mutedForeground }]}>
              Copyright 2026 VibeGuide. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SupportSection({
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

const styles = StyleSheet.create({
  contactCard: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  contactCopy: {
    flex: 1,
  },
  contactDescription: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    marginTop: 4,
  },
  contactIconWrap: {
    alignItems: 'center',
    borderRadius: 999,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  contactLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    gap: 22,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  faqAnswer: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    lineHeight: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  faqButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  faqCard: {
    borderRadius: 18,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  footerText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  quickLink: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: 16,
  },
  quickLinkLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
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
