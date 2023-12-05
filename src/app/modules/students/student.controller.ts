import { NextFunction, Request, RequestHandler, Response } from 'express'
import { studentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDb(req.query)

  res.status(200).json({
    success: true,
    message: 'students are retrieved successfully',
    data: result,
  })
  return result
})
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await studentServices.deleteStudentFromDb(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const updateStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const student = req.body.student
      const result = await studentServices.updateStudent(id, student)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated succesfully',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  },
)

export const studentController = {
  getAllStudents,
  deleteStudent,
  updateStudent,
}
