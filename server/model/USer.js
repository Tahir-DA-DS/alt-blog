const mongoose = require('mongoose')

const schema = mongoose.Schema

const UserSchema = new schema({
    email:{type:String, required:true, unique:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    password:{type:String, required:true}
})


module.exports = mongoose.model('User', UserSchema)