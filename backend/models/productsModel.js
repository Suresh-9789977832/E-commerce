import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    product_price:{
         type:Number,
        required:true
    },
    overall_total:{
         type:Number,
        required:true
    },
    image:{
         type:String,
        required:true
    },
    quantity:{
         type:Number,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})

const productmodel = mongoose.model('addtocart_products',productschema)

export default productmodel