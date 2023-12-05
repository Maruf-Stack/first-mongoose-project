import mongoose from 'mongoose'
import { Student } from './student.model'
import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'
import { Usermodel } from '../user/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../Builder/QueryBuilder'
import { studentSearchableFields } from './student.constant'

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .searchMethod(studentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields()
  const result = await studentQuery.modelQuery
  return result
}
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete')
    }
    const deletedUser = await Usermodel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return deletedUser
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
  }
}
const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localguardian, ...remainingStudentData } = payload
  const modifiedData: Record<string, unknown> = { ...remainingStudentData }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`$.${key}`] = value
    }
  }
  if (localguardian && Object.keys(localguardian).length) {
    for (const [key, value] of Object.entries(localguardian)) {
      modifiedData[`guardian.${key}`] = value
    }
  }
  const result = await Student.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const studentServices = {
  getAllStudentsFromDb,
  deleteStudentFromDb,
  updateStudent,
}
