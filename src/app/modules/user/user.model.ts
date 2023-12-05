import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'block'] },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

//pre save middleware
userSchema.pre('save', async function (next) {
  //hashing the password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

//post save middleware
userSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const Usermodel = model<TUser>('Users', userSchema)
