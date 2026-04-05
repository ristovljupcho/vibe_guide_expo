import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getProfileData, type ProfileData } from '@/api';
import { ScreenHeader } from '@/shared/ui/ScreenHeader';
import {
  bodyFontFamily,
  displayFontFamily,
  screenPadding,
} from '@/shared/ui/tokens';
import { useAppTheme } from '@/shared/theme/useAppTheme';

export default function EditProfileScreen() {
  const { colors } = useAppTheme();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    let mounted = true;

    getProfileData().then((payload) => {
      if (!mounted) {
        return;
      }

      setProfile(payload);
      setForm({
        fullName: payload.fullName,
        username: payload.username.replace('@', ''),
        email: payload.email,
        phone: payload.phone,
        location: payload.location,
        bio: payload.bio,
      });
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
        <ScreenHeader showBackButton title="Edit Profile" />

        <View style={styles.content}>
          <View style={styles.avatarWrap}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>
                {profile.initials}
              </Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.cameraButton,
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}>
              <Ionicons color={colors.primaryForeground} name="camera-outline" size={18} />
            </Pressable>
            <Text style={[styles.changePhoto, { color: colors.primary }]}>Change Photo</Text>
          </View>

          <Field
            label="Full Name"
            onChangeText={(value) => setForm((current) => ({ ...current, fullName: value }))}
            value={form.fullName}
          />
          <Field
            label="Username"
            onChangeText={(value) => setForm((current) => ({ ...current, username: value }))}
            value={form.username}
          />
          <Field
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => setForm((current) => ({ ...current, email: value }))}
            value={form.email}
          />
          <Field
            keyboardType="phone-pad"
            label="Phone Number"
            onChangeText={(value) => setForm((current) => ({ ...current, phone: value }))}
            value={form.phone}
          />
          <Field
            label="Location"
            onChangeText={(value) => setForm((current) => ({ ...current, location: value }))}
            value={form.location}
          />
          <Field
            label="Bio"
            multiline
            onChangeText={(value) => setForm((current) => ({ ...current, bio: value }))}
            value={form.bio}
          />

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
              },
            ]}>
            <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
              Save Changes
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
  multiline = false,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholderTextColor={colors.mutedForeground}
        style={[
          styles.fieldInput,
          {
            backgroundColor: colors.secondary,
            color: colors.text,
            minHeight: multiline ? 112 : 52,
            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderRadius: 999,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  avatarText: {
    fontFamily: displayFontFamily,
    fontSize: 34,
    fontWeight: '700',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cameraButton: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    marginLeft: 64,
    marginTop: -24,
    width: 36,
  },
  changePhoto: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12,
  },
  content: {
    gap: 16,
    paddingBottom: 28,
    paddingHorizontal: screenPadding,
    paddingTop: 18,
  },
  fieldInput: {
    borderRadius: 18,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldLabel: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  fieldWrap: {
    gap: 2,
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
    marginTop: 4,
  },
  saveButtonText: {
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '700',
  },
  screen: {
    flex: 1,
  },
});
