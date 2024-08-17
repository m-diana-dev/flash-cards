import { z } from 'zod'

export const passwordSchema = z.string().min(3).max(30)
export const emailSchema = z.string().email()
export const rememberMeSchema = z.boolean()
export const nameUserSchema = z.string().min(3).max(30)
export const nameDeckSchema = z.string().min(3).max(30)
export const privatePackSchema = z.boolean().optional()
export const gradeCardSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])
