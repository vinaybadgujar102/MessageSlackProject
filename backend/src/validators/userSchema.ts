import { z } from 'zod'

export const userSignUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
})

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
