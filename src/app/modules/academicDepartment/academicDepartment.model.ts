import { Schema, model } from 'mongoose'

import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'academicFaculties' },
  },

  { timestamps: true },
)

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartmentModel.findOne(query)
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "department dostn't exist")
  }
  next()
})
// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExist = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   })

//   if (isDepartmentExist) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       'This department is already existsss!',
//     )
//   }

//   next()
// })

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartments',
  academicDepartmentSchema,
)
