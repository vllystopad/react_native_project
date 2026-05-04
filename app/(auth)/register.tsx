import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormErrors = { email?: string; password?: string; confirmPassword?: string };

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [secure, setSecure] = useState(true);

  const handleSubmit = () => {
    const result = schema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // TODO: auth logic
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 32 }}>
        Create Account
      </Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!errors.email}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.email}>
        {errors.email}
      </HelperText>

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        error={!!errors.password}
        style={styles.input}
        right={
          <TextInput.Icon
            icon={secure ? 'eye' : 'eye-off'}
            onPress={() => setSecure(p => !p)}
          />
        }
      />
      <HelperText type="error" visible={!!errors.password}>
        {errors.password}
      </HelperText>

      <TextInput
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={secure}
        error={!!errors.confirmPassword}
        style={styles.input}
      />
      <HelperText type="error" visible={!!errors.confirmPassword}>
        {errors.confirmPassword}
      </HelperText>

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Register
      </Button>

      <Button mode="text" onPress={() => router.navigate('/login')}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  input: { marginBottom: 4 },
  button: { marginTop: 8, marginBottom: 8 },
});
