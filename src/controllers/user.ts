import { Request, Response } from "express";
import { userInfo } from "os";

import { generateToken } from "../helper/generate-access-token";

import { User } from '../models/user'

export const signIn = async (req: Request, res: Response) => {
    try{
        const user = req.user

        const token: string = await generateToken(user.email)

        user.accessToken = token;

        await user.save()

        console.log(`[server]: ${user.email} signed in!`)
        return res.status(300).send({
            success:true,
            error:false,
            token
        })
    }
    catch(error){
        console.error('sign-in-error', error)
        return res.status(500).send({
            error:true,
            message: error
        })
    }
}

export const signUp = async (req: Request, res: Response) => {
    try{
        await new User(req.value).save()

        console.log(`[server]: ${req.value.username} signed up!`)
        return res.status(300).send({
            success:true,
            error:false,
            message: 'User successfully signed up.'
        })
    }
    catch(error){
        console.error('sign-up-error', error)
        return res.status(500).send({
            error:true,
            message: error
        })
    }
}

export const signOut = async (req: Request, res: Response) => {
    try {
        const user = req.user

        user.accessToken = '';

        await user.save()

        console.log('[server]: User successfully signed out!')
        return res.status(300).send({
            success: true,
            error: false,
            message: 'User successfully signed out.'
        })
    } catch (error) {
        console.log('[server]: User sign out error!')
        return res.status(500).send({
            error: true,
            message: error
        })
    }
}