import { z } from 'zod'
const userSchemaValidation = z.object({
  password: z
    .string()
    .max(20, { message: 'password cannot be more than 20 characters' })
    .optional(),
})

export const uservalidation = {
  userSchemaValidation,
}
