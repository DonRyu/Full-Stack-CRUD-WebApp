import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";
import { SearchOptionMap } from "../Labels";

const getProductList = createAsyncThunk(
  "product/list",
  async ({ page, queryType, query }) => {
    let url;
    if (queryType && query) {
      url = `http://localhost:3000/api/product?page=${page}&queryType=${queryType}&query=${query}`;
    } else {
      url = `http://localhost:3000/api/product?page=${page}`;
    }
    const res = await axios({
      url,
      method: "GET",
    });
    return res.data;
  }
);

const productCRUD = createAsyncThunk("product/CRUD", async (info) => {
  const res = await axios({
    url: `http://localhost:3000/api/product/${info?.id ?? ""}`,
    data: info.data,
    method: info.method,
  });
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    getProductList: [],
    queryData: {
      queryType: SearchOptionMap[0].value,
    },
  },
  reducers: {
    getQueryData: (state, action) => {
      state.queryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.getProductList = action.payload;
    });
    builder.addCase(productCRUD.fulfilled, (state, action) => {
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
export { getProductList, productCRUD };
