import { z } from 'zod'

export const createacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic semester must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academic faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
})
export const updateacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic faculty must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academic faculty must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
})
