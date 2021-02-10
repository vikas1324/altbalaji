const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    dob:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
})
module.exports=mongoose.model('users',userSchema)