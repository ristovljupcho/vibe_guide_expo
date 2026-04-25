import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/expo/legacy';
import { Link, Redirect, useLocalSearchParams, useRouter } from 'expo-router';

import { AuthButton } from '@/features/auth/components/AuthButton';
import { AuthScaffold } from '@/features/auth/components/AuthScaffold';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors';
import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';

const preferenceTraits = [
  'Cozy',
  'Creative',
  'Lively',
  'Romantic',
  'Pet-friendly',
  'Outdoor',
  'Budget',
  'Hidden gems',
];

function getParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value ?? '';
}

export default function RegisterStep2Screen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ dateOfBirth?: string }>();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [bio, setBio] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((currentTraits) =>
      currentTraits.includes(trait)
        ? currentTraits.filter((item) => item !== trait)
        : [...currentTraits, trait]
    );
  };

  const finishWithoutVerification = async (createdSessionId: string | null) => {
    if (!createdSessionId) {
      setPendingVerification(true);
      return;
    }

    if (!setActive) {
      setError('Unable to activate your session. Please log in after verification.');
      return;
    }

    await setActive({ session: createdSessionId });
    router.replace('/');
  };

  const handleComplete = async () => {
    if (!isLoaded) {
      return;
    }

    setError('');
    setIsCompleting(true);

    try {
      const result = await signUp.update({
        unsafeMetadata: {
          bio: bio.trim(),
          dateOfBirth: getParamValue(params.dateOfBirth),
          preferredTraits: selectedTraits,
          profilePictureSelected: isPhotoSelected,
        },
      });

      await finishWithoutVerification(result.createdSessionId ?? signUp.createdSessionId);
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to complete your profile.'));
    } finally {
      setIsCompleting(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded || !code.trim()) {
      return;
    }

    setError('');
    setIsVerifying(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (result.status === 'complete' && result.createdSessionId) {
        if (!setActive) {
          setError('Unable to activate your session. Please log in with your new account.');
          return;
        }

        await setActive({ session: result.createdSessionId });
        router.replace('/');
        return;
      }

      setError('Verification is not complete yet. Please check the code and try again.');
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to verify your email.'));
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoaded && !signUp?.status) {
    return <Redirect href="/register" />;
  }

  return (
    <AuthScaffold
      eyebrow="Step 2 of 2"
      subtitle="Tell us about your preferences"
      title="Complete Your Profile">
      <View style={styles.topActions}>
        <Link asChild href="/register">
          <Pressable style={styles.backLink}>
            <Ionicons color={Colors.dark.primary} name="chevron-back" size={18} />
            <Text style={styles.linkText}>Back</Text>
          </Pressable>
        </Link>
        <Pressable onPress={handleComplete}>
          <Text style={styles.linkText}>Skip</Text>
        </Pressable>
      </View>

      <View style={styles.photoCard}>
        <Pressable
          onPress={() => setIsPhotoSelected((value) => !value)}
          style={({ pressed }) => [
            styles.photoCircle,
            {
              backgroundColor: isPhotoSelected ? Colors.dark.primary : Colors.dark.secondary,
              opacity: pressed ? 0.82 : 1,
            },
          ]}>
          <Ionicons
            color={isPhotoSelected ? Colors.dark.primaryForeground : Colors.dark.primary}
            name={isPhotoSelected ? 'checkmark' : 'camera-outline'}
            size={30}
          />
        </Pressable>
        <Text style={styles.photoTitle}>Profile Picture</Text>
        <Text style={styles.photoText}>
          {isPhotoSelected ? 'Photo placeholder selected' : 'Tap to add your profile photo later'}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.textAreaWrap}>
          <Text style={styles.label}>Bio / Description</Text>
          <TextInput
            multiline
            onChangeText={setBio}
            placeholder="Share what kind of places you like..."
            placeholderTextColor={Colors.dark.mutedForeground}
            selectionColor={Colors.dark.primary}
            style={styles.textArea}
            textAlignVertical="top"
            value={bio}
          />
        </View>

        <View style={styles.traitsBlock}>
          <Text style={styles.label}>Preferences & Traits</Text>
          <View style={styles.traitsGrid}>
            {preferenceTraits.map((trait) => {
              const selected = selectedTraits.includes(trait);

              return (
                <Pressable
                  key={trait}
                  onPress={() => toggleTrait(trait)}
                  style={({ pressed }) => [
                    styles.traitChip,
                    {
                      backgroundColor: selected ? Colors.dark.primary : Colors.dark.secondary,
                      borderColor: selected ? Colors.dark.primary : Colors.dark.border,
                      opacity: pressed ? 0.82 : 1,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.traitText,
                      { color: selected ? Colors.dark.primaryForeground : Colors.dark.text },
                    ]}>
                    {trait}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {pendingVerification ? (
          <View style={styles.verificationCard}>
            <Text style={styles.verificationTitle}>Check your email</Text>
            <Text style={styles.verificationText}>
              Enter the verification code from Clerk to finish creating your account.
            </Text>
            <AuthTextField
              icon="shield-checkmark-outline"
              keyboardType="number-pad"
              label="Verification Code"
              onChangeText={setCode}
              placeholder="123456"
              value={code}
            />
            <AuthButton
              disabled={!code.trim()}
              label="Verify Email"
              loading={isVerifying}
              onPress={handleVerify}
            />
          </View>
        ) : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {!pendingVerification ? (
          <AuthButton
            label="Complete Registration"
            loading={isCompleting}
            onPress={handleComplete}
          />
        ) : null}
      </View>
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  backLink: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  errorText: {
    color: Colors.dark.destructive,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  form: {
    gap: 18,
  },
  label: {
    color: Colors.dark.text,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  linkText: {
    color: Colors.dark.primary,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '800',
  },
  photoCard: {
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderColor: Colors.dark.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    padding: 22,
  },
  photoCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  photoText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    textAlign: 'center',
  },
  photoTitle: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '800',
  },
  textArea: {
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.border,
    borderRadius: 16,
    borderWidth: 1,
    color: Colors.dark.text,
    fontFamily: bodyFontFamily,
    fontSize: 15,
    minHeight: 112,
    padding: 16,
  },
  textAreaWrap: {
    gap: 8,
  },
  topActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  traitChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  traitText: {
    fontFamily: bodyFontFamily,
    fontSize: 13,
    fontWeight: '700',
  },
  traitsBlock: {
    gap: 10,
  },
  traitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  verificationCard: {
    backgroundColor: Colors.dark.card,
    borderColor: Colors.dark.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  verificationText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    lineHeight: 19,
  },
  verificationTitle: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '800',
  },
});
