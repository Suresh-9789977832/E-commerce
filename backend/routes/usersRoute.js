import express from 'express'
import usermodel from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import protectroute from '../Middlewares/middleware.js';

const router = express.Router();




// register user 
router.post('/register',async(req,res)=>{
    
    try {
        const {username,email,password} = req.body

    if(!username || !email || !password){
      return  res.status(400).send({
            "message":"please fill all the field"
        })
    }

    const userexists = await  usermodel.findOne({email})

    if(userexists){
     return   res.status(400).send({
            "message":"email already exists"
        })
    }

    const hashpassword = await bcrypt.hash(password,10)
    const user = await usermodel.create({username:username,email:email,password:hashpassword})
    const Token = generateToken(user._id)

   return res.status(201).send({
        "message":"User Register Successfully",
        "user":{
        "email":email,
        "username":username,
        "Token":Token
        }
    })
    } catch (error) {
        
         if (error.code === 11000) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }
  
      return   res.status(500).send({
      message: error.message
    });
    }

})

// login user
router.post('/login',async (req,res)=>{

    const {email,password} = req.body

    if(!email || !password){
       return res.status(400).send({
            "message":"please fill all the field"
        })
    }

    const userexists = await usermodel.findOne({email})

    if(!userexists){
      return  res.status(400).send({
            "message":"Invalid Credentials"
        })
    }

    const checkpass = await bcrypt.compare(password,userexists.password)

    if(!checkpass) {
       return res.status(400).send({
            "message":"Invalid Credentials"
        })
    }

    const Token = generateToken(userexists._id)

      return res.status(200).send({
           "message":"Login Successfully",
            "user":{
                 "email":email,
                 "username":userexists.username,
                "Token":Token
            }
    })

})





// get single user 
router.get('/profile/:id',protectroute,async(req,res)=>{
    const id = req.params.id;
    const user = await usermodel.findById(id)

  return  res.status(200).send({user})
})


const generateToken = (id) => {
    return  jwt.sign({id},process.env.JWT_SECRECT,{expiresIn:'7d'})
}


export default router