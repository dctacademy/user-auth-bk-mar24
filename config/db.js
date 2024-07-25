import mongoose from 'mongoose' 

const configureDB = async () => {
    const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/user-auth-mar24'
    try {
        const db = await mongoose.connect(dbUrl)
        console.log('connected to db', db.connections[0].name)
    } catch(err) {
        console.log(err)
    }
}

export default configureDB