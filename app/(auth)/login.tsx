import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema, zodResolver, type LoginFormData } from '@/common/validationSchemas';

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const { login, isPending, error } = useLogin();
  const [secure, setSecure] = useState(true);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 32 }}>
        Sign In
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Password"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secure}
              error={!!errors.password}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={secure ? 'eye' : 'eye-off'}
                  onPress={() => setSecure((p) => !p)}
                />
              }
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>
          </>
        )}
      />

      {error && (
        <HelperText type="error" visible>
          {(error as Error).message}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit((data) => login(data))}
        loading={isPending}
        disabled={isPending}
        style={styles.button}
      >
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
