import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    username:{
      type:String,
      required:true,
      unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
        required:true
    }

})

const usermodel = mongoose.model('users',userschema)

export default usermodel