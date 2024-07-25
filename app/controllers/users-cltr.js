import User from '../models/user-model.js' 
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
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

export default usersCltr