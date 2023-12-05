import { Router } from 'express'
import { userRoutes } from '../app/modules/user/user.route'
import { Studentroute } from '../app/modules/students/student.route'
import { academicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route'
import { academicFacultyroutes } from '../app/modules/academicFaculty/academicFaculty.routes'
import { academicDepartmentroutes } from '../app/modules/academicDepartment/academicDepartment.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: Studentroute,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyroutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentroutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
