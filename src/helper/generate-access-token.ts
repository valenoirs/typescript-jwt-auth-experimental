import jwt from 'jsonwebtoken'

export const generateToken = async (email: string) => {
    const options = {
        expiresIn: '1d'
    }

    const payload = {email}
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY!, options)

    return token
}