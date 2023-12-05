import { NextFunction, Request, RequestHandler, Response } from 'express'

import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicFacultiesServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultiesServices.craeteAcademicFaculty(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created succesfully',
    data: result,
  })
  return result
})
const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultiesServices.getAcademicFaculties()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrive succesfully',
    data: result,
  })
  return result
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const result =
    await academicFacultiesServices.getSingleAcademicFaculty(facultyId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved succesfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params
  const result = await academicFacultiesServices.updateAcademicFaculty(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated succesfully',
    data: result,
  })
})
export const academicFaculyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
