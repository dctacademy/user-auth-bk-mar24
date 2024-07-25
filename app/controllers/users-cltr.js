import User from '../models/user-model.js' 
import { validationResult } from 'express-validator'
const usersCltr = {}

usersCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    try {
        const user = new User(body) 
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "something went wrong"})
    }
}

export default usersCltr