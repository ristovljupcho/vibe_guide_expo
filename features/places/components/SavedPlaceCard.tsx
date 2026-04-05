import type { ComponentProps } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import type { SavedCollectionType, VibePlace } from '@/api';
import { useAppTheme } from '@/shared/theme/useAppTheme';
import {
  bodyFontFamily,
  displayFontFamily,
  surfaceShadow,
} from '@/shared/ui/tokens';

type SavedPlaceCardProps = {
  place: VibePlace;
  type: SavedCollectionType;
  onRemove?: (placeId: string, collectionType: SavedCollectionType) => void;
  onUpdateNote?: (
    placeId: string,
    collectionType: SavedCollectionType,
    nextNote: string,
  ) => void;
  onViewProfile?: (place: VibePlace) => void;
};

function getActionIconName(
  type: SavedCollectionType,
): ComponentProps<typeof MaterialCommunityIcons>['name'] {
  switch (type) {
    case 'favorites':
      return 'heart';
    case 'wishlist':
      return 'bookmark-plus';
    case 'visited':
      return 'map-marker-check-outline';
  }
}

function getActionColors(type: SavedCollectionType) {
  switch (type) {
    case 'favorites':
      return {
        solid: '#EF4444',
        soft: 'rgba(239, 68, 68, 0.12)',
        shadow: 'rgba(239, 68, 68, 0.3)',
      };
    case 'wishlist':
      return {
        solid: '#3B82F6',
        soft: 'rgba(59, 130, 246, 0.12)',
        shadow: 'rgba(59, 130, 246, 0.3)',
      };
    case 'visited':
      return {
        solid: '#16A34A',
        soft: 'rgba(22, 163, 74, 0.12)',
        shadow: 'rgba(22, 163, 74, 0.3)',
      };
  }
}

function getRemoveLabel(type: SavedCollectionType) {
  switch (type) {
    case 'favorites':
      return 'Remove from Favorites';
    case 'wishlist':
      return 'Remove from Wishlist';
    case 'visited':
      return 'Remove from Visited';
  }
}

function withAlpha(hexColor: string, alphaHex: string) {
  return `${hexColor}${alphaHex}`;
}

export function SavedPlaceCard({
  place,
  type,
  onRemove,
  onUpdateNote,
  onViewProfile,
}: SavedPlaceCardProps) {
  const { colors, colorScheme } = useAppTheme();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState(place.userNote ?? '');
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const actionColors = getActionColors(type);

  useEffect(() => {
    setNoteDraft(place.userNote ?? '');
  }, [place.userNote]);

  function closeDetailModal() {
    setShowDetailModal(false);
    setShowRemoveConfirm(false);
    setIsEditingNote(false);
    setNoteDraft(place.userNote ?? '');
  }

  function saveNote() {
    onUpdateNote?.(place.id, type, noteDraft);
    setIsEditingNote(false);
  }

  function cancelEditingNote() {
    setNoteDraft(place.userNote ?? '');
    setIsEditingNote(false);
  }

  function confirmRemove() {
    setShowRemoveConfirm(false);
    setShowDetailModal(false);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove?.(place.id, type);
    });
  }

  function handleViewFullProfile() {
    setShowDetailModal(false);
    onViewProfile?.(place);
  }

  return (
    <>
      <Animated.View
        style={[
          styles.animatedCard,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}>
        <Pressable
          onPress={() => setShowDetailModal(true)}
          style={({ pressed }) => [
            styles.card,
            surfaceShadow,
            {
              backgroundColor: colors.card,
              opacity: pressed ? 0.96 : 1,
            },
          ]}>
          <View style={styles.imageRail}>
            <Image
              contentFit="cover"
              source={{ uri: place.image }}
              style={styles.image}
            />
          </View>

          <View style={styles.content}>
            <View>
              <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
                {place.name}
              </Text>

              <View style={styles.metaRow}>
                <Ionicons
                  color={colors.mutedForeground}
                  name="location-outline"
                  size={13}
                />
                <Text numberOfLines={1} style={[styles.metaText, { color: colors.mutedForeground }]}>
                  {place.location}
                  {place.distance ? ` • ${place.distance}` : ''}
                </Text>
              </View>

              <View style={styles.ratingRow}>
                <View style={styles.ratingGroup}>
                  <Ionicons color={colors.primary} name="star" size={14} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>
                    {place.rating ?? 4.5}
                  </Text>
                </View>
                <Text style={[styles.ratingDivider, { color: colors.mutedForeground }]}>
                  /
                </Text>
                <View style={styles.ratingGroup}>
                  <Ionicons color={colors.accent} name="star" size={14} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>
                    {place.userRating ?? '—'}
                  </Text>
                </View>
              </View>

              <View style={styles.tagsWrap}>
                {place.traits.slice(0, 2).map((trait) => (
                  <View
                    key={trait}
                    style={[
                      styles.tag,
                      { backgroundColor: withAlpha(colors.accent, '24') },
                    ]}>
                    <Text style={[styles.tagText, { color: colors.accent }]}>{trait}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Pressable>
      </Animated.View>

      <Modal
        animationType="fade"
        onRequestClose={closeDetailModal}
        transparent
        visible={showDetailModal}>
        <View style={styles.modalOverlay}>
          <Pressable onPress={closeDetailModal} style={styles.modalBackdrop} />
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.card,
                shadowColor: colors.shadow,
              },
            ]}>
            <View style={styles.modalImageWrap}>
              <Image
                contentFit="cover"
                source={{ uri: place.image }}
                style={styles.modalImage}
              />
              <LinearGradient
                colors={[
                  'rgba(0,0,0,0.82)',
                  'rgba(0,0,0,0.42)',
                  'rgba(0,0,0,0.06)',
                ]}
                locations={[0, 0.48, 1]}
                style={StyleSheet.absoluteFill}
              />

              <View style={styles.modalHeaderRow}>
                <Text
                  numberOfLines={2}
                  style={[styles.modalTitle, { color: '#FFFFFF' }]}>
                  {place.name}
                </Text>

                <View style={styles.overlayActions}>
                  <Pressable
                    onPress={() => setShowRemoveConfirm(true)}
                    style={({ pressed }) => [
                      styles.overlayIconButton,
                      { opacity: pressed ? 0.8 : 1 },
                    ]}>
                    <MaterialCommunityIcons
                      color="#FFFFFF"
                      name={getActionIconName(type)}
                      size={22}
                      style={styles.overlayIcon}
                    />
                  </Pressable>
                  <Pressable
                    onPress={closeDetailModal}
                    style={({ pressed }) => [
                      styles.overlayIconButton,
                      { opacity: pressed ? 0.8 : 1 },
                    ]}>
                    <MaterialCommunityIcons
                      color="#FFFFFF"
                      name="close"
                      size={22}
                      style={styles.overlayIcon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              contentContainerStyle={styles.modalContent}
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.locationRow}>
                <Ionicons
                  color={colors.mutedForeground}
                  name="location-outline"
                  size={16}
                />
                <Text style={[styles.locationText, { color: colors.mutedForeground }]}>
                  {place.location}
                  {place.distance ? ` • ${place.distance}` : ''}
                </Text>
              </View>

              <View style={styles.modalRatingRow}>
                <View style={styles.modalRatingGroup}>
                  <Ionicons color={colors.primary} name="star" size={16} />
                  <Text style={[styles.modalRatingValue, { color: colors.text }]}>
                    {place.rating ?? 4.5}
                  </Text>
                  <Text
                    style={[styles.modalRatingLabel, { color: colors.mutedForeground }]}>
                    Overall
                  </Text>
                </View>

                {place.userRating ? (
                  <>
                    <Text
                      style={[styles.modalRatingBullet, { color: colors.mutedForeground }]}>
                      •
                    </Text>
                    <View style={styles.modalRatingGroup}>
                      <Ionicons color={colors.accent} name="star" size={16} />
                      <Text style={[styles.modalRatingValue, { color: colors.text }]}>
                        {place.userRating}
                      </Text>
                      <Text
                        style={[
                          styles.modalRatingLabel,
                          { color: colors.mutedForeground },
                        ]}>
                        Your Rating
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>

              <View style={styles.modalTagsWrap}>
                {place.traits.map((trait) => (
                  <View
                    key={trait}
                    style={[
                      styles.modalTag,
                      { backgroundColor: withAlpha(colors.accent, '24') },
                    ]}>
                    <Text style={[styles.modalTagText, { color: colors.accent }]}>
                      {trait}
                    </Text>
                  </View>
                ))}
              </View>

              {place.dateVisited ? (
                <Text style={[styles.visitDate, { color: colors.mutedForeground }]}>
                  Visited on {place.dateVisited}
                </Text>
              ) : null}

              <View
                style={[
                  styles.notesCard,
                  {
                    backgroundColor:
                      colorScheme === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : 'rgba(17,24,39,0.04)',
                  },
                ]}>
                <View style={styles.notesHeader}>
                  <Text style={[styles.notesTitle, { color: colors.text }]}>My Note</Text>

                  {!isEditingNote ? (
                    <Pressable
                      onPress={() => setIsEditingNote(true)}
                      style={({ pressed }) => [
                        styles.editButton,
                        {
                          backgroundColor: withAlpha(colors.primary, '1A'),
                          opacity: pressed ? 0.85 : 1,
                        },
                      ]}>
                      <MaterialCommunityIcons
                        color={colors.primary}
                        name="pencil"
                        size={16}
                      />
                    </Pressable>
                  ) : null}
                </View>

                {isEditingNote ? (
                  <View style={styles.editingWrap}>
                    <TextInput
                      multiline
                      onChangeText={setNoteDraft}
                      placeholder="Add your note here..."
                      placeholderTextColor={colors.mutedForeground}
                      style={[
                        styles.noteInput,
                        {
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                          color: colors.text,
                        },
                      ]}
                      textAlignVertical="top"
                      value={noteDraft}
                    />
                    <View style={styles.noteActionRow}>
                      <Pressable
                        onPress={saveNote}
                        style={({ pressed }) => [
                          styles.noteActionButton,
                          {
                            backgroundColor: colors.primary,
                            opacity: pressed ? 0.88 : 1,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.noteActionText,
                            { color: colors.primaryForeground },
                          ]}>
                          Save
                        </Text>
                      </Pressable>
                      <Pressable
                        onPress={cancelEditingNote}
                        style={({ pressed }) => [
                          styles.noteActionButton,
                          {
                            backgroundColor: colors.secondary,
                            opacity: pressed ? 0.88 : 1,
                          },
                        ]}>
                        <Text style={[styles.noteActionText, { color: colors.text }]}>
                          Cancel
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                ) : (
                  <Text style={[styles.noteText, { color: colors.text }]}>
                    {place.userNote || 'No note yet. Click the pencil icon to add one.'}
                  </Text>
                )}
              </View>
            </ScrollView>

            <View
              style={[
                styles.modalFooter,
                { borderTopColor: colors.border, backgroundColor: colors.card },
              ]}>
              <Pressable
                onPress={handleViewFullProfile}
                style={({ pressed }) => [
                  styles.profileButtonWrap,
                  { opacity: pressed ? 0.92 : 1 },
                ]}>
                <LinearGradient
                  colors={[colors.primary, colors.accent]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[
                    styles.profileButton,
                    {
                      shadowColor: colors.primary,
                    },
                  ]}>
                  <Text style={styles.profileButtonText}>View Full Profile</Text>
                </LinearGradient>
              </Pressable>
            </View>

            {showRemoveConfirm ? (
              <Pressable
                onPress={() => setShowRemoveConfirm(false)}
                style={styles.confirmOverlay}>
                <Pressable
                  onPress={(event) => event.stopPropagation()}
                  style={[
                    styles.confirmCard,
                    {
                      backgroundColor: colors.card,
                      shadowColor: colors.shadow,
                    },
                  ]}>
                  <View
                    style={[
                      styles.confirmIconWrap,
                      { backgroundColor: actionColors.soft },
                    ]}>
                    <MaterialCommunityIcons
                      color={actionColors.solid}
                      name={getActionIconName(type)}
                      size={26}
                    />
                  </View>

                  <Text style={[styles.confirmTitle, { color: colors.text }]}>
                    {getRemoveLabel(type)}?
                  </Text>
                  <Text style={[styles.confirmText, { color: colors.mutedForeground }]}>
                    {place.name} will be removed from your {type} list.
                  </Text>

                  <View style={styles.confirmActions}>
                    <Pressable
                      onPress={() => setShowRemoveConfirm(false)}
                      style={({ pressed }) => [
                        styles.confirmButton,
                        {
                          backgroundColor: colors.secondary,
                          opacity: pressed ? 0.9 : 1,
                        },
                      ]}>
                      <Text style={[styles.confirmButtonText, { color: colors.text }]}>
                        Cancel
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={confirmRemove}
                      style={({ pressed }) => [
                        styles.confirmButton,
                        {
                          backgroundColor: actionColors.solid,
                          opacity: pressed ? 0.9 : 1,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.confirmButtonText,
                          { color: '#FFFFFF' },
                        ]}>
                        Remove
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  animatedCard: {
    transform: [{ scale: 1 }],
  },
  card: {
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  confirmButton: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  confirmButtonText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmCard: {
    alignItems: 'center',
    borderRadius: 18,
    maxWidth: 332,
    paddingHorizontal: 24,
    paddingVertical: 24,
    width: '100%',
  },
  confirmIconWrap: {
    alignItems: 'center',
    borderRadius: 999,
    height: 56,
    justifyContent: 'center',
    marginBottom: 16,
    width: 56,
  },
  confirmOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 24,
    justifyContent: 'center',
    padding: 24,
  },
  confirmText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmTitle: {
    fontFamily: displayFontFamily,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    minWidth: 0,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 8,
    paddingTop: 12,
  },
  editButton: {
    alignItems: 'center',
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  editingWrap: {
    gap: 10,
  },
  image: {
    height: 144,
    width: '100%',
  },
  imageRail: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 160,
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  locationText: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 14,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 8,
  },
  metaText: {
    flex: 1,
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  modalCard: {
    borderRadius: 24,
    elevation: 12,
    flexShrink: 1,
    maxHeight: '90%',
    maxWidth: 380,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    width: '100%',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    gap: 16,
    padding: 16,
  },
  modalFooter: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  modalImage: {
    height: '100%',
    width: '100%',
  },
  modalImageWrap: {
    height: 256,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalScroll: {
    flexGrow: 0,
  },
  modalRatingBullet: {
    fontSize: 16,
  },
  modalRatingGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  modalRatingLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  modalRatingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modalRatingValue: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  modalTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalTagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modalTagText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '600',
  },
  modalTitle: {
    flex: 1,
    fontFamily: displayFontFamily,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    paddingRight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 10,
  },
  noteActionButton: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  noteActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  noteActionText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  noteInput: {
    borderRadius: 12,
    borderWidth: 1,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  noteText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    lineHeight: 22,
  },
  notesCard: {
    borderRadius: 16,
    padding: 16,
  },
  notesHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  notesTitle: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
  },
  overlayActions: {
    flexDirection: 'row',
    gap: 8,
  },
  overlayIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },
  overlayIconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  profileButton: {
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 52,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 18,
  },
  profileButtonText: {
    color: '#FFFFFF',
    fontFamily: bodyFontFamily,
    fontSize: 16,
    fontWeight: '700',
  },
  profileButtonWrap: {
    width: '100%',
  },
  ratingDivider: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
  },
  ratingGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  ratingText: {
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '500',
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagText: {
    fontFamily: bodyFontFamily,
    fontSize: 11,
    fontWeight: '500',
  },
  title: {
    fontFamily: displayFontFamily,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  visitDate: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
  },
});
