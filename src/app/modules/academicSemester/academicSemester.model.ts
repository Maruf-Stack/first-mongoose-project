import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: academicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
  },
  endMonth: {
    type: String,
    required: true,
  },
})

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemeseter.findOne({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExists) {
    throw new Error('Semester already exists')
  }
  next()
})

export const AcademicSemeseter = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
