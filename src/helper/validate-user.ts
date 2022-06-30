import { NextFunction, Request, Response } from 'express'
import { signInSchema, signUpSchema, signOutSchema } from './user-validation-schema'
import { IUser } from '../interfaces/user'
import { User } from '../models/user'

export const signInValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value: Pick<IUser, 'email'|'password'> = await signInSchema.validateAsync(req.body)

        const {email} = value

        const user = await User.findOne({email})

        req.user = user
        req.value = value

        next()
    } catch (error) {
        next(error)
    }
}

export const signUpValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value: IUser = await signUpSchema.validateAsync(req.body)

        const {email} = value

        const user = await User.findOne({email})

        req.user = user
        req.value = value

        next()
    } catch (error) {
        next(error)
    }
}

export const signOutValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers['x-access-token']

        const user = await User.findOne({accessToken})

        req.user = user
        req.token = accessToken

        next()
    } catch (error) {
        next(error)
    }
}