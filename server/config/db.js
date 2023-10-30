const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGODB_URI
const connectDB = async ()=>{
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(URI, {useNewUrlParser: true,
            useUnifiedTopology: true,})
        console.log(`DATABASE CONNECTED...`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB