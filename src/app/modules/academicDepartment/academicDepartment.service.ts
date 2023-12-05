import { AcademicDepartmentModel } from './academicDepartment.model'
import { TAcademicDepartment } from './academicDepartment.interface'

const craeteAcademicDeparment = async (payload: TAcademicDepartment) => {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: payload.name,
  })
  // if (isDepartmentExist) {
  //   throw new Error('This department is already exist!')
  // }
  const result = await AcademicDepartmentModel.create(payload)
  return result
}

const getAcademicDepartments = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicfaculties')
  return result
}

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id)
  return result
}

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}
export const academicDepartmentServices = {
  craeteAcademicDeparment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
