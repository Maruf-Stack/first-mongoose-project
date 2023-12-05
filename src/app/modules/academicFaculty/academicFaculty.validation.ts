import { z } from 'zod'

export const createacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic faculty must be string',
    }),
  }),
})
export const updateacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic faculty must be string',
    }),
  }),
})
