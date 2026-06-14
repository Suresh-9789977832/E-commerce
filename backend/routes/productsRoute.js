import express from 'express'
import protectroute from '../Middlewares/middleware.js';
import productmodel from '../models/productsModel.js'

const router = express.Router();


// add to cart product 
router.post('/addtocart',protectroute, async(req,res)=>{
    try {
        const {description,product_price ,quantity,image} = req.body
    const totalamt = Number(product_price ) * Number(quantity);
    console.log(product_price)
    console.log(quantity)
    if (!product_price || !quantity) {
    return res.status(400).json({
    message: "Price and quantity are required"
    });
    }
    
    const product = await productmodel.create({
        description:description,
        product_price:product_price,
        quantity:quantity,
        image:image,
        overall_total:totalamt,
        createdBy:req.user._id
    })
    res.status(201).send({
        message:"Product added to cart",
        product:product
    })
    } catch (error) {
        res.status(500).send({
            "message":error.response
        })
    }
})



// get all user products 
router.get('/',protectroute, async(req,res)=>{
    const getall_userproducts = await productmodel.find({createdBy:req.user._id});
    res.status(200).send({
        allproducts:getall_userproducts
    })
})


// edit post 
router.put('/:id',protectroute,async(req,res)=>{
    const {description,product_price,quantity,image} = req.body
    const totalamt = Number(product_price ) * Number(quantity);
    const id = req.params.id;
    const product = await productmodel.findById(id)
    product.description = description;
    product.product_price = product_price;
    product.quantity = quantity;
    product.image = image;
    product.overall_total = totalamt;
    const updateproduct = await product.save()
    res.status(200).send({
        "message":"Product Updated",
        "updated_product": updateproduct
    })
})


// delete post 
router.delete('/:id',protectroute,async(req,res)=>{
    const id = req.params.id;
    const deleteproduct = await productmodel.findByIdAndDelete(id)
    res.status(200).send({
        "message" : "Product Deleted"
    })
})


export default router