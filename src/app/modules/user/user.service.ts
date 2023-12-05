import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemeseter } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'

import { Usermodel } from './user.model'
import { generateStudentId } from './user.utils'
import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'

const craeteStudent = async (studentData: TStudent, password: string) => {
  const userData: Partial<TUser> = {}
  //if password is not given
  if (!password) {
    userData.password = config.default_password as string
  } else {
    userData.password = password
  }
  //set student role
  userData.role = 'student'

  //find academic semester info
  const admissionSemester = await AcademicSemeseter.findById(
    studentData.admissionSemester,
  )
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (!admissionSemester) throw new Error('admissionSemester not found')
    // ser manuallyid
    userData.id = await generateStudentId(admissionSemester)
    //create a user   transaction 1
    const result = await Usermodel.create([userData], { session })
    //create a student
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
    }
    //set id and _id as user
    studentData.id = result[0].id
    studentData.user = result[0]._id
    //create student transaction 2
    const newStudent = await Student.create([studentData], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}
export const userServices = {
  craeteStudent,
}
