import { createAsyncThunk } from "@reduxjs/toolkit";
import { addtocart_products, delete_cartproducts, edit_cartproducts, getall_cartproducts } from "../../services/addtocartService";


export const addtocart_thunk = createAsyncThunk(
    "addtocart/addtocart_product",
    async({datas,token},thunkAPI)=>{
        try {
             const response = await addtocart_products(datas,token)
             return response.data
        } catch (error) {
              return thunkAPI.rejectWithValue(
                error.response.data.message
              )
        }
    }
)




export const getallproducts_thunk = createAsyncThunk(
    "addtocart/getallproducts",
     async({token,id},thunkAPI)=>{
        try {
            const response = await getall_cartproducts(token,id)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data.message
            )
        }
     }
)



export const editproduct_thunk = createAsyncThunk(
    "addtocart/editproduct",
    async({updatedData,token,id},thunkAPI)=>{
        try {
            const response = await edit_cartproducts(updatedData,token,id)
            return response.data
        } catch (error) {
            return error.response.data.message
        }
    }
)




export const deletecartproduct_thunk = createAsyncThunk(
    "addtoproduct/deleteproduct",
    async({id,token},thunkAPI)=>{
        try {
            const response = await delete_cartproducts(id,token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data.message
            )
        }
    }
)