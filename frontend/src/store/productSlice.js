import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";
import { SearchOptionMap } from "../Labels";

const productList = createAsyncThunk(
  "product/list",
  async ({ page, queryType, query }) => {
    const res = await axios({
      url: `http://localhost:3000/api/products/get?page=${page}&queryType=${queryType}&query=${query}`,
      method: "GET",
    });
    return res.data;
  }
);

const productCUD = createAsyncThunk("product/CRUD", async (info) => {
  const res = await axios({
    url: `http://localhost:3000/api/products/${info.path}`,
    data: info.data,
    method: info.method,
  });
  return res.data;
});


const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    queryData: {
      queryType: SearchOptionMap[0].value
    },
  },
  reducers: {
    getQueryData: (state, action) => {
      state.queryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productList.fulfilled, (state, action) => {
      state.productList = action.payload;
    });
    builder.addCase(productCUD.fulfilled, (state, action) => {
      if (action.payload.msg) {
        notification["success"]({
          message: `${action.payload.msg}`,
        });
      }
    });
  },
});

export default productSlice.reducer;
export const { getQueryData } = productSlice.actions;
export { productList, productCUD };
