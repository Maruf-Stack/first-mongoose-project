import { Model, Types } from 'mongoose'

export interface TGuardian {
  father: string
  mother: string
  fatherContact: string
  fatherOccupation: string
  motherOccupation: string
}
export interface Username {
  firstname: string
  lastname: string
}
export interface TStudent {
  id: string
  user: Types.ObjectId
  name: Username
  gender: 'male' | 'female'
  dateofbirth?: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  avatar?: string
  presentAddress: string
  permenentAddress: string
  guardian: TGuardian
  localguardian: {
    name: string
    contact: string
  }
  profileImg?: string
  admissionSemester: Types.ObjectId
  isDeleted: boolean
}

//static method

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}
