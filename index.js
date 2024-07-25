import express from 'express' 
import dotenv from 'dotenv'
dotenv.config() 
import configureDB from './config/db.js'
const port = process.env.PORT || 3050
const app = express() 
configureDB() 

app.listen(port, () => {
    console.log('Server running on port', port )
})