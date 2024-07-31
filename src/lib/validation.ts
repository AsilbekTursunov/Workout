import z from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password is need to be at least 8 characters')
    .max(32, `Password isn't need to be more than 32 characters`),
})

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password is need to be at least 8 characters')
      .max(32, `Password isn't need to be more than 32 characters`),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const taskScheme = z.object({
  title: z.string().min(5, 'Task title is need to be at least 5 characters'),
})
