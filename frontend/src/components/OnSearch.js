import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOptionMap } from "../Labels";
import { useDispatch, useSelector } from "react-redux";
import { productList, getQueryData } from "../store/productSlice";
import ProductsTotalNumber from "./ProductsTotalNumber";
const { Search } = Input;

const OnSearch = () => {
  const dispatch = useDispatch();
  const queryInfo = useSelector((state) => state.products.queryData);
  const [loading, setLoading] = useState(false);

  const onPress = (value) => {
    let query = value.trim().replace(/(\s*)/g, "").toLowerCase();
    setLoading(true);
    dispatch(
      productList({
        page: 1,
        queryType: queryInfo.queryType,
        query,
      })
    );
    dispatch(getQueryData({ queryType: queryInfo.queryType, query }));
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        width: 500,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Select
        onChange={(value) => dispatch(getQueryData({ queryType: value }))}
        defaultValue={SearchOptionMap[0].value}
        style={{ width: 180, height: "100%" }}
        options={SearchOptionMap}
      />
      <Search
        disabled={loading}
        placeholder="input search text"
        enterButton="Search"
        onSearch={onPress}
      />
      <ProductsTotalNumber />
    </div>
  );
};

export default OnSearch;
