import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

const craeteAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

const getAcademicFaculties = async () => {
  const result = AcademicFacultyModel.find()
  return result
}

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id)
  return result
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}
export const academicFacultiesServices = {
  craeteAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
