import User from '../models/user-model.js'
export const userRegisterSchema = {
    email: {
        exists: { 
            errorMessage: 'email field is required'
        }, 
        notEmpty:{
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be valid format'
        },
        trim: true, 
        normalizeEmail: true,
        custom: {
            options: async function(value){
                try {
                    const user = await User.findOne({ email: value })
                    if(user) {
                        throw new Error('Email already taken')
                    }
                } catch(err) {
                    throw new Error(err.message)
                }
                return true 
            }
        }     
    },
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be emtpy'
        }, 
        isStrongPassword: {
            options: {
                minLength: 8,
                maxLength: 128, 
                minLowerCase: 1,
                minUpperCase: 1, 
                minSymbol: 1,
                minNumber: 1
            },
            errorMessage: 'password should consists of atleast one lower case, one upper case, one symbol, one number and should be atleast 8 characters'
        },
        trim: true, 
    }
}

export const userLoginSchema = {}