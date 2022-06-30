import Joi from 'joi'

const id = Joi.string().required()
const username = Joi.string().alphanum().min(5).max(20).required()
const email = Joi.string().email({minDomainSegments: 2, tlds: {allow: ["com", "net"]}}).required()
const password = Joi.string().min(5).max(30).required()
const passwordConfirmation = Joi.ref('password')
const jwtToken = [Joi.string(), Joi.number()]

export const signInSchema = Joi.object().keys({
    email,
    password
})

export const signUpSchema = Joi.object().keys({
    username,
    email,
    password,
    passwordConfirmation
})

export const signOutSchema = Joi.object().keys({
    jwtToken
})