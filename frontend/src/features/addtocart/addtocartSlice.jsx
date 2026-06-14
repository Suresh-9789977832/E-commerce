import { createSlice } from "@reduxjs/toolkit";
import {
  addtocart_thunk,
  getallproducts_thunk,
  editproduct_thunk,
  deletecartproduct_thunk,
} from "./addtocartThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const addtocartslice = createSlice({
  name: "addtocart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      // Add Product
      .addCase(addtocart_thunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtocart_thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addtocart_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // Get All Products
      .addCase(getallproducts_thunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getallproducts_thunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.allproducts;
      })
      .addCase(getallproducts_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // Edit Product
      .addCase(editproduct_thunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(editproduct_thunk.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          item => item._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editproduct_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      
      // Delete Product
      .addCase(deletecartproduct_thunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletecartproduct_thunk.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          item => item._id !== action.meta.arg.id
        );
      })
      .addCase(deletecartproduct_thunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const get_allproducts = (state)=> state.addtocart; 

export default addtocartslice.reducer;