const mongoose = require('mongoose')

const schema = mongoose.Schema

const postSchema = new schema({
title:{type:String, required:true},
body:{type:String, required:true},
author:{type:String},
user_id:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
state:{type:String, enum:['draft', 'completed'], default:'draft'}, 
read_count:{type:Number, default:0},
tag:{type:[String]},
reading_time:{type:Date, default:Date.now},
createdAt:{type:Date, default:Date.now},
updatedAt:{type:Date, default:Date.now}
})


module.exports = mongoose.model('post', postSchema)