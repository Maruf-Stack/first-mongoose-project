import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await academicDepartmentServices.craeteAcademicDeparment(
      req.body,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created succesfully',
      data: result,
    })
    return result
  },
)
const getAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAcademicDepartments()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departments are retrive succesfully',
    data: result,
  })
  return result
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result =
    await academicDepartmentServices.getSingleAcademicDepartment(departmentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is retrieved succesfully',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result = await academicDepartmentServices.updateAcademicDepartment(
    departmentId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated succesfully',
    data: result,
  })
})
export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
