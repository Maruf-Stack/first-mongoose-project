import { Request, Response } from 'express'
import { studentServices } from './student.service'
import { studentValidationSchema } from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  //send response
  try {
    //creating a validation by zod

    const student = req.body.student

    const zodparseData = studentValidationSchema.parse(student)
    const result = await studentServices.craeteStudentIntoDb(zodparseData)
    res.status(200).json({
      success: true,
      message: 'student is created succesfully',
      data: result,
    })
    return result
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'student cannot create',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDb()

    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    })
    return result
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'student cannot create',
      error: err,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await studentServices.deleteStudentFromDb(id)
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'could not delete',
      error: err,
    })
  }
}
export const studentController = {
  createStudent,
  getAllStudents,
  deleteStudent,
}
