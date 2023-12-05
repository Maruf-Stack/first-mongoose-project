import express from 'express'
import { academicFaculyController } from './academicFaculty.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { createacademicFacultyValidationSchema } from './academicFaculty.validation'
const router = express.Router()

router.post(
  '/create-academic-faculty',
  validateRequest(createacademicFacultyValidationSchema),
  academicFaculyController.createAcademicFaculty,
)
router.patch('/:facultyId', academicFaculyController.updateAcademicFaculty)

router.get('/', academicFaculyController.getAcademicFaculties)
router.get('/:facultyId', academicFaculyController.getSingleAcademicFaculty)

export const academicFacultyroutes = router
