import { academicSemesterNameandCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemeseter } from './academicSemester.model'

const craeteAcademicSemester = async (payload: TAcademicSemester) => {
  if (academicSemesterNameandCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code')
  }
  const result = await AcademicSemeseter.create(payload)
  return result
}

const getAcademicSemester = async () => {
  const result = AcademicSemeseter.find()
  return result
}

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicSemeseter.findById(id)
  return result
}

const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameandCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemeseter.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}
export const academicSemesterServices = {
  craeteAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
