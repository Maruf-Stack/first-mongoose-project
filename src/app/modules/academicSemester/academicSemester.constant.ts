import {
  TMonth,
  TacademicSemesterMapper,
  TacademicSemesterName,
  TacademisSemisterCode,
} from './academicSemester.interface'

export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const academicSemesterName: TacademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const academicSemesterCode: TacademisSemisterCode[] = ['01', '02', '03']
export const academicSemesterNameandCodeMapper: TacademicSemesterMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
