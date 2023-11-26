import { TStudent } from './student.interface'
import { Student } from './student.model'

const craeteStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!')
  }
  const result = await Student.create(studentData)

  return result
}

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
  return result
}
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const studentServices = {
  craeteStudentIntoDb,
  getAllStudentsFromDb,
  deleteStudentFromDb,
}
