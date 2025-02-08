import { Router } from 'express'

import { signIn, signUp } from '../../controllers/userController'
import { userSignInSchema, userSignUpSchema } from '../../validators/userSchema'
import { validate } from '../../validators/zodValidator'

const router = Router()

router.post('/signup', validate(userSignUpSchema), signUp)
router.post('/signin', validate(userSignInSchema), signIn)

export default router
