import express from 'express'
import { studentController } from './student.controller'
const router = express.Router()
router.get('/', studentController.getAllStudents)
router.delete('/:id', studentController.deleteStudent)
router.patch('/:id', studentController.updateStudent)
export const Studentroute = router
