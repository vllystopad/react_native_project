import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useRegister } from '@/hooks/useAuth';
import { registerSchema, zodResolver, type RegisterFormData } from '@/common/validationSchemas';

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter();
  const { register, isPending, error } = useRegister();
  const [secure, setSecure] = useState(true);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, marginBottom: 32 }}>
        Create Account
      </Text>

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput label="First Name" mode="outlined" value={value} onChangeText={onChange}
              error={!!errors.firstName} style={styles.input} />
            <HelperText type="error" visible={!!errors.firstName}>{errors.firstName?.message}</HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput label="Last Name" mode="outlined" value={value} onChangeText={onChange}
              error={!!errors.lastName} style={styles.input} />
            <HelperText type="error" visible={!!errors.lastName}>{errors.lastName?.message}</HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput label="Email" mode="outlined" value={value} onChangeText={onChange}
              keyboardType="email-address" autoCapitalize="none"
              error={!!errors.email} style={styles.input} />
            <HelperText type="error" visible={!!errors.email}>{errors.email?.message}</HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              label="Password" mode="outlined" value={value} onChangeText={onChange}
              secureTextEntry={secure} error={!!errors.password} style={styles.input}
              right={<TextInput.Icon icon={secure ? 'eye' : 'eye-off'} onPress={() => setSecure((p) => !p)} />}
            />
            <HelperText type="error" visible={!!errors.password}>{errors.password?.message}</HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput label="Confirm Password" mode="outlined" value={value} onChangeText={onChange}
              secureTextEntry={secure} error={!!errors.confirmPassword} style={styles.input} />
            <HelperText type="error" visible={!!errors.confirmPassword}>{errors.confirmPassword?.message}</HelperText>
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
        onPress={handleSubmit((data) => register(data))}
        loading={isPending}
        disabled={isPending}
        style={styles.button}
      >
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
