import express from 'express'

import { signIn, signUp } from '../../controllers/userController'
import { userSignInSchema, userSignUpSchema } from '../../validators/userSchema'
import { validate } from '../../validators/zodValidator'

const router = express.Router()

router.post('/signup', validate(userSignUpSchema), signUp)
router.post('/signin', validate(userSignInSchema), signIn)

export default router
