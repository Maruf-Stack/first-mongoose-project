import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { Usermodel } from './user.model'

//generatesudent id

const findLastUser = async () => {
  const lastStudent = await Usermodel.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })

    .lean()
  // eslint-disable-next-line no-undefined
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString()
  const lastStudentId = await findLastUser()
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
  const lastStudentYear = lastStudentId?.substring(0, 4)
  const currentSemesterCode = payload.code
  const currentYear = payload.year
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }
  let increment = (Number(currentId) + 1).toString().padStart(4, '0')
  increment = `${payload.year}${payload.code}${increment}`
  return increment
}
