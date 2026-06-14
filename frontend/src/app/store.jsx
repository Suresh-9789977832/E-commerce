import {configureStore} from '@reduxjs/toolkit'
import authslice from '../features/auth/authSlice'
import addtocartslice from '../features/addtocart/addtocartSlice'

const store = configureStore({
    reducer:{
        auth:authslice,
        addtocart:addtocartslice
    }  
})

export default store