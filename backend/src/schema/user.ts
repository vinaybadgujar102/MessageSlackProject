import bcrypt from 'bcrypt'
import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please use a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [3, 'Username must be at least 3 characters long']
    },
    avatar: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiry: {
      type: Date
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const SALT = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(this.password, SALT)
    this.password = hashedPassword
    this.avatar = `https://robohash.org/${this.username}.png`
    this.verificationToken = uuidv4().substring(0, 10).toUpperCase()
    this.verificationTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
  }
  next()
})

const User = model('User', userSchema)

export default User
