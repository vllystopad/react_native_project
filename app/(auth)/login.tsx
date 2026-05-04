import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormErrors = { email?: string; password?: string };

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [secure, setSecure] = useState(true);

  const handleSubmit = () => {
    const result = schema.safeParse({ email, password });
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
        Sign In
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

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Login
      </Button>

      <Button mode="text" onPress={() => router.navigate('/register')}>
        Don't have an account? Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  input: { marginBottom: 4 },
  button: { marginTop: 8, marginBottom: 8 },
});
