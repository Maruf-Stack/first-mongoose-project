import express from 'express'
import { academicSemesterController } from './academicSemester.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { academicSemesterValidations } from './academicSemester.validation'

const router = express.Router()
router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
)
router.get('/', academicSemesterController.getAcademicSemester)
router.get('/:semesterId', academicSemesterController.getSingleAcademicSemester)

router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemester,
)
// router.get('/', studentController.getAllStudents)
// router.delete('/:id', studentController.deleteStudent)
export const academicSemesterRoutes = router
