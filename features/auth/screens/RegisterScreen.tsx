import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/expo/legacy';
import { Link, useRouter } from 'expo-router';

import { AuthButton } from '@/features/auth/components/AuthButton';
import { AuthScaffold } from '@/features/auth/components/AuthScaffold';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors';
import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily } from '@/shared/ui/tokens';

export default function RegisterScreen() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');

  const isFormReady =
    email.trim() && username.trim() && firstName.trim() && lastName.trim() && password.length >= 8;

  const handleNext = async () => {
    if (!isLoaded || !isFormReady) {
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signUp.create({
        emailAddress: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password,
        username: username.trim(),
      });

      if (!result.createdSessionId) {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      }

      router.push({
        pathname: '/register-step2',
        params: { dateOfBirth: dateOfBirth.trim() },
      });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to create your account.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthScaffold
      eyebrow="Step 1 of 2"
      subtitle="Let's get started with the basics"
      title="Create Account"
      topAction={
        <Link asChild href="/login">
          <Pressable style={styles.backLink}>
            <Ionicons color={Colors.dark.primary} name="chevron-back" size={18} />
            <Text style={styles.linkText}>Back to Login</Text>
          </Pressable>
        </Link>
      }>
      <View style={styles.form}>
        <AuthTextField
          autoComplete="email"
          icon="mail-outline"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          textContentType="emailAddress"
          value={email}
        />
        <AuthTextField
          autoComplete="username"
          icon="at-outline"
          label="Username"
          onChangeText={setUsername}
          placeholder="vibehunter"
          value={username}
        />
        <View style={styles.nameGrid}>
          <AuthTextField
            autoComplete="given-name"
            icon="person-outline"
            label="First Name"
            onChangeText={setFirstName}
            placeholder="Risto"
            textContentType="givenName"
            value={firstName}
          />
          <AuthTextField
            autoComplete="family-name"
            icon="person-outline"
            label="Last Name"
            onChangeText={setLastName}
            placeholder="Petrov"
            textContentType="familyName"
            value={lastName}
          />
        </View>
        <AuthTextField
          icon="calendar-outline"
          keyboardType="numbers-and-punctuation"
          label="Date of Birth"
          onChangeText={setDateOfBirth}
          placeholder="DD/MM/YYYY"
          value={dateOfBirth}
        />
        <AuthTextField
          autoComplete="new-password"
          icon="lock-closed-outline"
          label="Password"
          onChangeText={setPassword}
          onToggleSecure={() => setShowPassword((value) => !value)}
          placeholder="At least 8 characters"
          secureTextEntry={!showPassword}
          secureVisible={showPassword}
          textContentType="newPassword"
          value={password}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AuthButton
          disabled={!isFormReady}
          label="Next"
          loading={isSubmitting}
          onPress={handleNext}
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Link href="/login" style={styles.linkText}>
          Log In
        </Link>
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
  footerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  footerText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 14,
  },
  form: {
    gap: 16,
  },
  linkText: {
    color: Colors.dark.primary,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '800',
  },
  nameGrid: {
    gap: 14,
  },
});
