
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import usermodel from '../models/usersModel.js'
dotenv.config()

const protectroute = async(req,res,next) =>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            const token = req.headers.authorization.split(' ')[1]
            
            const decode = JWT.verify(token,process.env.JWT_SECRECT)

            req.user = await usermodel.findById(decode.id).select('-password')

            next();


        }else{
            res.status(400).send({
                "message":"No Token"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}


export default protectroute