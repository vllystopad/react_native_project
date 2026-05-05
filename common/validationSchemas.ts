import { z } from 'zod';
import { type Resolver } from 'react-hook-form';

const nameSchema = z
  .string()
  .min(1, 'This field is required')
  .min(2, 'Must be between 2 and 25 characters')
  .max(25, 'Must be between 2 and 25 characters')
  // eslint-disable-next-line no-useless-escape
  .regex(/^[\p{L}\p{M} \-]+$/u, 'Only letters, spaces and hyphens allowed');

const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(7, 'Password must be between 7 and 30 characters')
  .max(30, 'Password must be between 7 and 30 characters')
  .regex(/^[a-zA-Z0-9]+$/, 'Only letters and numbers allowed (a-z, A-Z, 0-9)');

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('That is not a valid email'),
  password: passwordSchema,
});

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: z.string().min(1, 'Email is required').email('That is not a valid email'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Inline zodResolver — replaces @hookform/resolvers/zod
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function zodResolver<T extends Record<string, any>>(schema: z.ZodType<T>): Resolver<T> {
  // @ts-ignore — RHF resolver type is overly strict; runtime behaviour is correct
  return async (data: T) => {
    const result = schema.safeParse(data);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: Record<string, any> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) {
        errors[key] = { type: 'validation', message: issue.message };
      }
    }
    return { values: {} as T, errors };
  };
}
