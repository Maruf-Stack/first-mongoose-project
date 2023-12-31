export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'block'
  isDelete: boolean
  isactive: string
}
