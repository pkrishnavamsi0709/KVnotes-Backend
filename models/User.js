const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phoneno:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    

},{
    collection:"userdetails"
});

mongoose.exports = mongoose.model("user",userSchema);