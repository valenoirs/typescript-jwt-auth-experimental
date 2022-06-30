import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export const isExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if(!user) {
            console.log('[server]: email-not-registered')
            return res.status(401).send({
                error: true,
                message: 'Email not registered.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const isNotExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        if(user) {
            console.log('[server]: email-already-registered')
            return res.status(401).send({
                error: true,
                message: 'Email already registered.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        const {password} = req.value

        const authenticated = await user.comparePassword(password)

        if(!authenticated){
            console.log('[server]: Invalid user credential provided')
            return res.status(401).send({
                error: true,
                message: 'Invalid credential, please try again.'
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}