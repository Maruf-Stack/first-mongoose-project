import { NextFunction, Request, RequestHandler, Response } from 'express'
import { userServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const student = req.body.student
  const password = req.body.password
  const result = await userServices.craeteStudent(student, password)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
  return result
})
export const userController = {
  createStudent,
}
