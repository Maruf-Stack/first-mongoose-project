export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TacademicSemesterName = 'Autumn' | 'Summer' | 'Fall'
export type TacademisSemisterCode = '01' | '02' | '03'

export type TacademicSemesterMapper = {
  [key: string]: string
}

export type TAcademicSemester = {
  name: TacademicSemesterName
  code: TacademisSemisterCode
  year: string
  startMonth: TMonth
  endMonth: TMonth
}
