import { createAsyncThunk } from "@reduxjs/toolkit";
import { getprofile, loginuser, reguser } from "../../services/AuthService";

export const register_userthunk = createAsyncThunk(
    "auth/registerUser",
    async(userdata,thunkAPI)=>{
        try {
            const response = await reguser(userdata)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration Failed"
            )
        }
    }
)


export const login_userthunk = createAsyncThunk(
    "auth/loginuser",
    async (data,thunkAPI) => {
        try {
            const response = await loginuser(data)
        return response.data
        } catch (error) {
             return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration Failed"
            )
        }
    }
)

export const get_profilethunk = createAsyncThunk(
    "auth/getprofile",
    async ({userId,token},thunkAPI) => {
        console.log(userId);
    console.log(token);
       try {
            const response = await getprofile(userId,token)
        return response.data
        } catch (error) {
             return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration Failed"
            )
        } 
    }
)