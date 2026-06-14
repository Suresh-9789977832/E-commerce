import { createSlice } from "@reduxjs/toolkit";
import {get_profilethunk, register_userthunk } from "./authThunk";
import {login_userthunk} from './authThunk'

const initialstate = {
    loading: false,
    user: null,
    error: null,
    message: null,
}

const authslice = createSlice({
    name:"auth",
    initialState:initialstate,
    reducers:{},
    extraReducers: (builder) => {
        builder

              // Register User
             .addCase(register_userthunk.pending, (state,action)=> {
                    state.loading = true;
             })
             .addCase(register_userthunk.fulfilled, (state,action) => {
                    state.loading = false
                    state.user = action.payload.user
                    state.message = action.payload.message
             })
             .addCase(register_userthunk.rejected, (state,action) => {
                    state.loading = false,
                    state.error = action.payload
             })

            //  Login User
             .addCase(login_userthunk.pending, (state,action) => {
                    state.loading = true;
             })
             .addCase(login_userthunk.fulfilled, (state,action) => {
                    state.loading = false
                    state.user = action?.payload
                    state.message = action.payload.user
                    state.error=action.payload
             })
              .addCase(login_userthunk.rejected, (state,action) => {
                    state.loading = false,
                    state.error = action.payload
             })

              // Get Profile
             .addCase(get_profilethunk.pending, (state,action) => {
                    state.loading = true;
             })
             .addCase(get_profilethunk.fulfilled, (state,action) => {
                    state.loading = false
                    state.user = action?.payload
                    state.message = action.payload.user
                    state.error=action.payload
             })
              .addCase(get_profilethunk.rejected, (state,action) => {
                    state.loading = false,
                    state.error = action.payload
             })
    }
})

export const authstate = (state) => state.auth

export const {userLogin,userRegister} = authslice.actions
export default authslice.reducer