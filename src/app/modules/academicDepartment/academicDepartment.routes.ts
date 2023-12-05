import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { createacademicFacultyValidationSchema } from '../academicFaculty/academicFaculty.validation'
import { academicDepartmentController } from './academicDepartment.controller'
const router = express.Router()

router.post(
  '/create-academic-department',
  // validateRequest(createacademicFacultyValidationSchema),
  academicDepartmentController.createAcademicDepartment,
)
router.patch(
  '/:departmentId',
  academicDepartmentController.updateAcademicDepartment,
)

router.get('/', academicDepartmentController.getAcademicDepartments)
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
)

export const academicDepartmentroutes = router
