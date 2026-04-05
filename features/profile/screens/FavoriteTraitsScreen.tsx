import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getTraitCategories, type FilterCategory } from '@/api';
import { FilterChip } from '@/shared/ui/FilterChip';
import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import { bodyFontFamily, screenPadding } from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

const defaultTraits = ['Cozy', 'Cocktails', 'Live Music', 'Rooftop', 'Romantic'];

export default function FavoriteTraitsScreen() {
  const { colors } = useAppTheme();
  const [categories, setCategories] = useState<FilterCategory[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>(defaultTraits);

  useEffect(() => {
    let mounted = true;

    getTraitCategories().then((payload) => {
      if (mounted) {
        setCategories(payload);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (categories.length === 0) {
    return (
      <View style={[styles.loadingWrap, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader showBackButton title="Favorite Traits" />

        <View style={styles.content}>
          <Text style={[styles.intro, { color: colors.mutedForeground }]}>
            Select your favorite traits to get better recommendations. You&apos;ve selected {selectedTraits.length} traits.
          </Text>

          {categories.map((category) => (
            <View key={category.name} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{category.name}</Text>
              <View style={styles.chipWrap}>
                {category.options.map((trait) => (
                  <FilterChip
                    key={trait}
                    label={trait}
                    onPress={() =>
                      setSelectedTraits((current) =>
                        current.includes(trait)
                          ? current.filter((item) => item !== trait)
                          : [...current, trait]
                      )
                    }
                    selected={selectedTraits.includes(trait)}
                  />
                ))}
              </View>
            </View>
          ))}

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}>
            <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
              Save Preferences
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  content: {
    gap: 22,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  intro: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
  loadingWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 52,
  },
  saveButtonText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  screen: {
    flex: 1,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
});
