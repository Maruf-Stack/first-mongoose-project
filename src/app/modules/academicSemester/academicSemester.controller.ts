import { NextFunction, Request, RequestHandler, Response } from 'express'

import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.craeteAcademicSemester(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created succesfully',
    data: result,
  })
  return result
})
const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAcademicSemester()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrive succesfully',
    data: result,
  })
  return result
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result =
    await academicSemesterServices.getSingleAcademicSemester(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await academicSemesterServices.updateAcademicSemester(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  })
})
export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
