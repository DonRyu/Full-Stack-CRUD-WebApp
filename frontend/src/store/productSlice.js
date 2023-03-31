/**
 * This file contains the product slice for Redux state management,
 * which includes async thunks for getting a list of products and CRUD operations
 * for products, as well as reducers for updating query data.
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";
import { SearchOptionMap, ErrorMsgMap } from "../constants";

// Create an instance of Axios with a base URL for the API
const Api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Async thunk for getting a list of products with optional query parameters
const getProductList = createAsyncThunk(
  "product/list",
  async ({ page, queryType, query }) => {
    let url;
    if (queryType && query) {
      let validQry = query?.trim().replace(/(\s*)/g, "").toLowerCase();
      url = `/product?page=${page}&queryType=${queryType}&query=${validQry}`;
    } else {
      url = `/product?page=${page}`;
    }
    const res = await Api.get(url);
    return res.data;
  }
);

// Async thunk for CRUD operations on products
const productCRUD = createAsyncThunk("product/CRUD", async (info) => {
  const res = await Api({
    url: `/product/${info?.id ?? ""}`,
    data: info.data,
    method: info.method,
  });
  return res.data;
});

// Slice for managing product-related state
const productSlice = createSlice({
  name: "product",
  initialState: {
    getProductList: [],
    queryData: {
      queryType: SearchOptionMap[0].value,
    },
  },
  reducers: {
    // Reducer for updating query data
    getQueryData: (state, action) => {
      state.queryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducer for updating product list after successful async call
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.getProductList = action.payload;
    });
    // Reducer for displaying success notification after successful CRUD operation
    builder.addCase(productCRUD.fulfilled, (state, action) => {
      if (action.payload.msg) {
        notification["success"]({
          message: `${action.payload.msg}`,
        });
      }
    });
    // Reducer for displaying error notification after failed CRUD operation
    builder.addCase(productCRUD.rejected, (state, action) => {
      notification["error"]({
        message: `${ErrorMsgMap.serverError}`,
      });
    });
    // Reducer for displaying error notification after failed async call
    builder.addCase(getProductList.rejected, (state, action) => {
      notification["error"]({
        message: `${ErrorMsgMap.serverError}`,
      });
      state.getProductList = [];
    });
  },
});

// Export the reducer and action creators
export default productSlice.reducer;
export const { getQueryData } = productSlice.actions;
export { getProductList, productCRUD };
