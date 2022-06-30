import { User } from "../models/user"

export const isExist = async (email: string) => {
    try {
        const user = await User.findOne({email})

        if(!user){
            return false
        }

        return true
    } catch (error) {
        throw error
    }
}

export const isAuthenticated = async () => {
    try {
                
    } catch (error) {
        throw error
    }
}