import { Router } from 'express'
import { signUp } from '../../controllers/userController'
import { validate } from '../../validators/zodValidator'
import { userSignUpSchema } from '../../validators/userSchema'

const router = Router()

router.post('/signup', validate(userSignUpSchema), signUp)

export default router
