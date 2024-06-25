import { z } from 'zod'

export const passwordSchema = z.string().min(3)
export const emailSchema = z.string().email()
export const rememberMeSchema = z.boolean().optional().default(false)
export const nameUserSchema = z.string().min(2)
