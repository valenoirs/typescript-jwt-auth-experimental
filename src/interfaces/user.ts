import { Model } from "mongoose"

export interface IUser {
    username: string,
    email: string,
    password: string,
    accessToken?: string
}

export interface IUserMethod {
    comparePassword(password: string): boolean
}

export type UserModel = Model<IUser, {}, IUserMethod>