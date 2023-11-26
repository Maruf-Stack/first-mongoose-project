import { z } from 'zod'

const userSchema = z.object({
  firstname: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  lastname: z.string({
    required_error: 'last name is required',
    invalid_type_error: 'Name must be a string',
  }),
})

const guardianSchema = z.object({
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

export const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userSchema,
  gender: z
    .enum(['male', 'female'])
    .refine((value) => typeof value === 'string', {
      message: 'Gender must be either "male" or "female"',
    }),
  dateofbirth: z.string(),
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
  guardian: guardianSchema,
  localguardian: z.object({
    name: z.string({
      required_error: 'Local guardian is required',
      invalid_type_error: 'Name must be a string',
    }),
    contact: z.string(),
  }),
  profileImg: z.string(),
  isActive: z.enum(['active', 'block']).default('active'),
  isDeleted: z.boolean(),
})
