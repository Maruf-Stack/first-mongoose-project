import express from 'express'
import { userController } from './user.controller'

import { studentValidations } from '../students/student.validation'
import { validateRequest } from '../../middlewares/validateRequest'
const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.studentValidationSchema),
  userController.createStudent,
)
export const userRoutes = router
