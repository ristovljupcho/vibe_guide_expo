import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSignIn } from '@clerk/expo/legacy';
import { useSSO } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { AuthButton } from '@/features/auth/components/AuthButton';
import { AuthScaffold } from '@/features/auth/components/AuthScaffold';
import { AuthTextField } from '@/features/auth/components/AuthTextField';
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors';
import { Colors } from '@/shared/theme/colors';
import { bodyFontFamily, displayFontFamily } from '@/shared/ui/tokens';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!isLoaded) {
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
        return;
      }

      setError('We need one more verification step before signing you in.');
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to log in. Please check your details.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsGoogleLoading(true);

    try {
      const { createdSessionId, setActive: activateSsoSession } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (createdSessionId && activateSsoSession) {
        await activateSsoSession({ session: createdSessionId });
        router.replace('/');
        return;
      }

      setError('Google sign in was not completed. Please try again.');
    } catch (authError) {
      setError(getAuthErrorMessage(authError, 'Unable to continue with Google.'));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthScaffold
      subtitle="Discover your next favorite spot"
      title="Welcome to VibeGuide">
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
          autoComplete="password"
          icon="lock-closed-outline"
          label="Password"
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          onToggleSecure={() => setShowPassword((value) => !value)}
          placeholder="Your password"
          secureTextEntry={!showPassword}
          secureVisible={showPassword}
          textContentType="password"
          value={password}
        />

        <Link asChild href="/forgot-password">
          <Pressable style={styles.forgotLink}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </Pressable>
        </Link>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AuthButton
          disabled={!email || !password}
          label="Log In"
          loading={isSubmitting}
          onPress={handleLogin}
        />
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.altActions}>
        <Pressable
          disabled={isGoogleLoading}
          onPress={handleGoogleLogin}
          style={({ pressed }) => [
            styles.socialButton,
            { opacity: pressed || isGoogleLoading ? 0.72 : 1 },
          ]}>
          <Ionicons color={Colors.dark.text} name="logo-google" size={20} />
          <Text style={styles.socialText}>
            {isGoogleLoading ? 'Opening Google...' : 'Continue with Google'}
          </Text>
        </Pressable>
        <AuthButton
          label="Continue as Guest"
          onPress={() => setError('Guest mode is not available while Clerk auth is enabled.')}
          variant="secondary"
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{"Don't have an account?"}</Text>
        <Link href="/register" style={styles.linkText}>
          Sign Up
        </Link>
      </View>
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  altActions: {
    gap: 12,
  },
  divider: {
    backgroundColor: Colors.dark.border,
    flex: 1,
    height: 1,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  dividerText: {
    color: Colors.dark.mutedForeground,
    fontFamily: bodyFontFamily,
    fontSize: 12,
    fontWeight: '800',
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
  forgotLink: {
    alignSelf: 'flex-end',
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
  socialButton: {
    alignItems: 'center',
    backgroundColor: Colors.dark.secondary,
    borderColor: Colors.dark.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    minHeight: 54,
    paddingHorizontal: 16,
  },
  socialText: {
    color: Colors.dark.text,
    fontFamily: displayFontFamily,
    fontSize: 15,
    fontWeight: '700',
  },
});
