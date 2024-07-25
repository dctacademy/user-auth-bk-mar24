import express from 'express' 
import dotenv from 'dotenv'
import { checkSchema } from 'express-validator'
dotenv.config() 
import configureDB from './config/db.js'
import usersCltr from './app/controllers/users-cltr.js'
import { userRegisterSchema, userLoginSchema } from './app/validators/user-validation-schema.js'
const port = process.env.PORT || 3050
const app = express() 
configureDB() 

app.use(express.json())

app.post('/api/users/register', checkSchema(userRegisterSchema), usersCltr.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCltr.login)


// axios.post(url, formData, options)
// axios.get(url, options)
// axios.put(url, formData, options)
// axios.delete(url, options)

app.listen(port, () => {
    console.log('Server running on port', port )
})
