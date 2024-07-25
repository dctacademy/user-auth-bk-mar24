import User from '../models/user-model.js' 
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    try {
        const user = new User(body) 
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(user.password, salt)
        user.password = hash 
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "something went wrong"})
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {   
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(404).json({ error: 'invalid email / password '})
        }
        const isValid  = await bcryptjs.compare(password, user.password)
        if(!isValid) {
            return res.status(404).json({ error: 'invalid email / password '})
        }
        const tokenData = { userId: user._id }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET , { expiresIn: '7d'})
        return res.json({ token })
    } catch(err) {
        console.log(err) 
        res.status(500).json({ error: "something went wrong"})
    }
}

export default usersCltr