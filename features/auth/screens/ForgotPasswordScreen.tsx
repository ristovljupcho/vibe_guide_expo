import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignIn } from '@clerk/expo/legacy';
import { Link, useRouter } from 'expo-router';

import { AuthButton } from '@/features/auth/components/AuthButton';
import { AuthScaffold } from '@/features/auth/components/AuthScaffold';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors';
import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendRecovery = async () => {
    if (!isLoaded || !email.trim()) {
      return;
    }

    setError('');
    setIsSending(true);

    try {
      await signIn.create({
        identifier: email.trim(),
        strategy: 'reset_password_email_code',
      });
      setSubmitted(true);
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to send recovery email.'));
    } finally {
      setIsSending(false);
    }
  };

  const handleResetPassword = async () => {
    if (!isLoaded || !code.trim() || !newPassword) {
      return;
    }

    setError('');
    setIsResetting(true);

    try {
      const result = await signIn.attemptFirstFactor({
        code: code.trim(),
        password: newPassword,
        strategy: 'reset_password_email_code',
      });

      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
        return;
      }

      setError('Password reset needs one more step. Please check the code and try again.');
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to reset your password.'));
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <AuthScaffold
      subtitle={
        submitted
          ? `We sent a recovery code to ${email.trim()}`
          : 'Enter your email and we will send a recovery code'
      }
      title={submitted ? 'Check Your Email' : 'Forgot Password?'}
      topAction={
        <Link asChild href="/login">
          <Pressable style={styles.backLink}>
            <Ionicons color={Colors.dark.primary} name="chevron-back" size={18} />
            <Text style={styles.linkText}>Back to Login</Text>
          </Pressable>
        </Link>
      }>
      <View style={styles.iconWrap}>
        <Ionicons
          color={submitted ? Colors.dark.success : Colors.dark.primary}
          name={submitted ? 'checkmark-circle-outline' : 'mail-outline'}
          size={44}
        />
      </View>

      <View style={styles.form}>
        {!submitted ? (
          <>
            <AuthTextField
              autoComplete="email"
              icon="mail-outline"
              keyboardType="email-address"
              label="Recovery Email"
              onChangeText={setEmail}
              placeholder="you@example.com"
              textContentType="emailAddress"
              value={email}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <AuthButton
              disabled={!email.trim()}
              label="Send Recovery Email"
              loading={isSending}
              onPress={handleSendRecovery}
            />
          </>
        ) : (
          <>
            <View style={styles.noticeCard}>
              <Text style={styles.noticeTitle}>Recovery code sent</Text>
              <Text style={styles.noticeText}>
                Clerk sent a one-time code to your email. Add the code and choose a new password.
              </Text>
            </View>
            <AuthTextField
              icon="shield-checkmark-outline"
              keyboardType="number-pad"
              label="Recovery Code"
              onChangeText={setCode}
              placeholder="123456"
              value={code}
            />
            <AuthTextField
              autoComplete="new-password"
              icon="lock-closed-outline"
              label="New Password"
              onChangeText={setNewPassword}
              onToggleSecure={() => setShowNewPassword((value) => !value)}
              placeholder="At least 8 characters"
              secureTextEntry={!showNewPassword}
              secureVisible={showNewPassword}
              textContentType="newPassword"
              value={newPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <AuthButton
              disabled={!code.trim() || newPassword.length < 8}
              label="Reset Password"
              loading={isResetting}
              onPress={handleResetPassword}
            />
            <AuthButton
              label="Try a different email"
              onPress={() => {
                setCode('');
                setError('');
                setNewPassword('');
                setSubmitted(false);
              }}
              variant="ghost"
            />
          </>
        )}
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
    gap: 16,
  },
  iconWrap: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 92,
    justifyContent: 'center',
    width: 92,
  },
  linkText: {
    color: Colors.dark.primary,
    fontFamily: bodyFontFamily,
    fontSize: 14,
    fontWeight: '800',
  },
  noticeCard: {
    backgroundColor: Colors.dark.card,
    borderColor: Colors.dark.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    padding: 16,
  },
  noticeText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 13,
    lineHeight: 19,
  },
  noticeTitle: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: '800',
  },
});
