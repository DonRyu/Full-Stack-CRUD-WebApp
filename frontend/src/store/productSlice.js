import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";

const productList = createAsyncThunk("product/list", async () => {
  const res = await axios({
    url: `http://localhost:3000/api/products/get`,
    method: "GET",
  });
  return res.data;
});

const productCRUD = createAsyncThunk("product/CRUD", async (info) => {
  const res = await axios({
    url: `http://localhost:3000/api/products/${info.path}`,
    data: info.data,
    method: info.method,
  });
  return res.data;
});

const productSearch = createAsyncThunk("product/search", async (info) => {
  const res = await axios({
    url: `http://localhost:3000/api/search/${info.path}`,
    data: info.data,
    method: info.method,
  });
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productList.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
    builder.addCase(productCRUD.fulfilled, (state, action) => {
      if (action.payload.msg) {
        notification["success"]({
          message: `${action.payload.msg}`,
        });
      }
    });
    builder.addCase(productSearch.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
  },
});

export default productSlice.reducer;
export { productList, productCRUD, productSearch };
