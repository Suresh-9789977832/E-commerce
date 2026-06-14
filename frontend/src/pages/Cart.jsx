import React, { useEffect } from 'react'
import Appbar from '../components/Appbar'
import { MdDelete } from "react-icons/md";
import {jwtDecode} from 'jwt-decode'
import {useDispatch, useSelector} from 'react-redux'
import {deletecartproduct_thunk, editproduct_thunk, getallproducts_thunk} from "../features/addtocart/addtocartThunk"
import { get_allproducts } from '../features/addtocart/addtocartSlice';
import empty from "../assets/empty.png";
import { toast } from "react-toastify";
import { edit_cartproducts } from '../services/addtocartService';




const Cart = ({user,setuser,pagename,title}) => {

    const dispatch = useDispatch();
    const getproducts = useSelector(get_allproducts).items
    const productssss = useSelector(get_allproducts)


    const handledelete = async(id) =>{
        const token = localStorage.getItem('Token');
        const deleteproduct = await dispatch(deletecartproduct_thunk({token,id}))
        toast.success(deleteproduct.payload.message)
    }

     async function getall_cartproducts() {
        const token = localStorage.getItem("Token");
        if (!token) return;
      
        const id = jwtDecode(token).id;
      
        const data = await dispatch(
          getallproducts_thunk({ token, id })
        ).unwrap();
        console.log("Data:", data);
      }
    
  
    useEffect(() => {
     
      getall_cartproducts();
    }, [dispatch]);

    const totalQuantity = getproducts.reduce(
      (total, item) => total + item.quantity,
      0
    );


    const overalltotal = getproducts.reduce(
      (total, item) => total + item.overall_total,
      0
    );

    const total_productprice = getproducts.reduce(
      (total, item) => total + item.product_price,
      0
    );


    
    const handleincreseproduct = async(item) =>{
      const finalquantity = Number(item.quantity) + 1;
      const finaloveralltotal = finalquantity * item.product_price

      if(finalquantity == 0){
         const id = item._id
         const token = localStorage.getItem('Token');
        const deleteproduct = await dispatch(deletecartproduct_thunk({token,id}))
        toast.success(deleteproduct.payload.message)

          return; 
      }
      
      const updatedData = {
        "description":item.description,
        "product_price":item.product_price,
        "quantity":finalquantity,
        "image":item.image,
        "overall_total":finaloveralltotal
      }
        try { 
           const token = localStorage.getItem('Token')
           const data = await dispatch(editproduct_thunk({
              updatedData,
              token,
              id:item._id
           }))  
           console.log(data)
           getall_cartproducts();
        } catch (error) {
          console.log(error.message)
        }
    }


    const handledecreaseproduct = async(item) => {
            const finalquantity = Number(item.quantity) - 1;
      const finaloveralltotal = finalquantity * item.product_price

       if(finalquantity == 0){
         const id = item._id
         const token = localStorage.getItem('Token');
        const deleteproduct = await dispatch(deletecartproduct_thunk({token,id}))
        toast.success(deleteproduct.payload.message)

          return; // stop execution here
      }
      
      
      const updatedData = {
        "description":item.description,
        "product_price":item.product_price,
        "quantity":finalquantity,
        "image":item.image,
        "overall_total":finaloveralltotal
      }
        try { 
           const token = localStorage.getItem('Token')
           const data = await dispatch(editproduct_thunk({
              updatedData,
              token,
              id:item._id
           }))  
           console.log(data)
           getall_cartproducts();
        } catch (error) {
          console.log(error.message)
        }
    }




  return (


    <div className='bg-gray-200'>
        <Appbar user={user} setuser={setuser} pagename={'Cart'} title={user ? `Welcome ${user.username}` : ''}/>

      
        <div className='w-full mx-auto container flex flex-col md:flex-row  gap-5 mt-10 h-screen px-4 md:px-0'>
            <div className='md:w-3/5 w-full rounded-xl shadow-xl bg-[#14524f] h-150 flex flex-col overflow-y-auto'>

              {
                 getproducts.length <= 0 ? 

                 <div className="flex flex-col items-center justify-center h-[100] text-center">
                      <img
                        className="h-100 w-auto py-5 px-5"
                        src={empty}
                        alt="No products"
                      />

                      <p className="text-2xl text-white">
                        No Products
                      </p>
                    </div>
                  
                 : 
                  ''
              }

              {getproducts.map((item,index)=>(
                   <div key={index} className='flex flex-col md:flex-row md:justify-between m-3 bg-[#1d6b67] text-white shadow-xl  rounded-md p-2'>
                    <div className='flex'>
                             <img className='rounded-lg' width={100} height={100} src={item.image}/>
                             <div className='px-4 flex justify-center  h-full flex-col'>
                                <div className='text-lg font-semibold'>{item.description}</div>
                                <p className='mt-2 font-semibold text-lg'>₹{item.product_price}</p>
                             </div>
                    </div>

                    <div className="px-4 py-3 flex justify-between md:flex-col items-center gap-6">
                            <button onClick={()=>handledelete(item._id)} className="hover:cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-700">
                              <MdDelete className='text-white' size={20} />
                              <span className='text-white'>Delete</span>
                            </button>

                  <div className="flex items-center gap-3">
                   
                    <button onClick={()=>handledecreaseproduct(item)} className="hover:cursor-pointer w-8 h-8 flex items-center justify-center border rounded-md">
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button onClick={()=>handleincreseproduct(item)} className="hover:cursor-pointer w-8 h-8 flex items-center justify-center border rounded-md">
                      +
                    </button>

                  </div>
                </div>

                </div>
              ))}

            </div>
      
            <div className='md:w-2/5 w-full h-80 bg-[#14524f] rounded-lg py-5 px-6'>
                    <h4 className='text-white font-semibold text-xl'>Order Summary</h4>
                    <div className='flex justify-between my-4 text-lg text-white'>
                        <p>SubTotal</p>
                        <p>₹{total_productprice}</p>
                    </div>
                     <div className='flex justify-between my-4 text-lg text-white'>
                        <p>Quantity</p>
                        <p>{totalQuantity} Products</p>
                    </div>
                    <p className='border border-white'></p>
                     <div className='flex justify-between my-4 text-lg text-white'>
                        <p>Total</p>
                        <p>₹{overalltotal}</p>
                    </div>
                    <button className='text-white bg-black w-full h-10 rounded-full'>Go To Checkout</button>
            </div> 
        </div>        

    </div>


  )
}

export default Cart