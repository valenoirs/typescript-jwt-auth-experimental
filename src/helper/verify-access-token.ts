import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.token

        jwt.verify(token, process.env.JWT_SECRET_KEY!, (error: any, decoded: any) => {
            if(error) {
                console.error('[server]: jwt-error', error)
                return res.status(401).send({
                    error: true,
                    message: 'Failed to authorize user, please try again.'
                })
            }

            req.email = decoded.email
            next()
        })
    } catch (error) {
        console.error('[server]: jwt-error', error)
        return res.status(401).send({
            error: true,
            message: 'Failed to authorize user, please try again.'
        })
    }
}