import express from 'express'
import { signIn, signUp, signOut } from '../controllers/user'
import { verifyAccessToken } from '../helper/verify-access-token'
import { signInValidation, signUpValidation, signOutValidation } from '../helper/validate-user'
import * as verifyUser from '../helper/verify-user-middleware'

export const router = express.Router()

router.route('/signin').post(signInValidation, verifyUser.isExist, verifyUser.isAuthenticated, signIn)

router.route('/signup').post(signUpValidation, verifyUser.isNotExist, signUp)

router.route('/signout').get(signOutValidation, verifyUser.isExist, verifyAccessToken, signOut)