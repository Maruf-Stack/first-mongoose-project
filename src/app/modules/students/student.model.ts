import { Schema, model } from 'mongoose'
import {
  StudentModel,
  TGuardian,
  TStudent,
  Username,
} from './student.interface'
import validator from 'validator'
import { strictObject, string } from 'zod'

const userSchema = new Schema<Username>({
  firstname: { type: String, required: true },
  lastname: {
    type: String,
    required: true,
  },
})
const guardianSchema = new Schema<TGuardian>({
  father: { type: String, required: true },
  mother: { type: String, required: true },
  fatherContact: { type: String },
  motherOccupation: { type: String },
  fatherOccupation: { type: String },
})
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id  is required'],
      unique: true,
      ref: 'Users',
    },

    name: {
      type: userSchema,
      required: true,
      maxlength: [20, 'name cannot be more than 20 charecters'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not valid. Gender field can only be male or female',
      },
      required: true,
    },
    dateofbirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE is not a valid email}',
      },
    },
    avatar: { type: String },
    presentAddress: { type: String, required: true },
    permenentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: [true, 'Name is required'],
    },
    localguardian: {
      name: { type: String, required: true },
      contact: { type: String },
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
)

//query middleware
studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//virtual

studentSchema.virtual('fullname').get(function () {
  return `${this?.name?.firstname} ${this?.name?.lastname}`
})
//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })

  return existingUser
}
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
