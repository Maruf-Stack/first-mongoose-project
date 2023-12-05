import { z } from 'zod'

const userValidationSchema = z.object({
  firstname: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  lastname: z.string({
    required_error: 'last name is required',
    invalid_type_error: 'Name must be a string',
  }),
})

const guardianValidationSchema = z.object({
  father: z.string({
    required_error: 'Father name is required',
    invalid_type_error: 'Name must be a string',
  }),
  mother: z.string({
    required_error: 'Mother name is required',
    invalid_type_error: 'Name must be a string',
  }),
  fatherContact: z.string(),
  motherOccupation: z.string(),
  fatherOccupation: z.string(),
})

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userValidationSchema,
      gender: z
        .enum(['male', 'female'])
        .refine((value) => typeof value === 'string', {
          message: 'Gender must be either "male" or "female"',
        }),
      dateofbirth: z.string().optional(),
      contactNumber: z.string({
        required_error: 'Contact no is required',
        invalid_type_error: 'Contact must be a string',
      }),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      email: z.string().email({ message: 'Invalid email format' }),
      avatar: z.string(),
      presentAddress: z.string({
        required_error: 'present address is required',
        invalid_type_error: 'Name must be a string',
      }),
      permenentAddress: z.string({
        required_error: 'permenent address is required',
        invalid_type_error: 'Name must be a string',
      }),
      guardian: guardianValidationSchema,
      localguardian: z.object({
        name: z.string({
          required_error: 'Local guardian is required',
          invalid_type_error: 'Name must be a string',
        }),
        contact: z.string(),
      }),
      profileImg: z.string(),
      admissionSemester: z.string(),
    }),
  }),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userValidationSchema,
      gender: z.enum(['male', 'female']).optional(),
      dateofbirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNumber: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permenentAddress: z.string().optional(),
      guardian: guardianValidationSchema.optional(),
      localguardian: z
        .object({
          name: z.string({
            required_error: 'Local guardian is required',
            invalid_type_error: 'Name must be a string',
          }),
          contact: z.string(),
        })
        .optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
})

export const studentValidations = {
  studentValidationSchema: createStudentValidationSchema,
}
