import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOptionMap } from "../../Labels";
import { useDispatch, useSelector } from "react-redux";
import { getProductList, getQueryData } from "../../store/productSlice";
import ProductsTotalNumber from "../product/ProductTotalNumber";
const { Search } = Input;

const OnSearch = () => {
  const dispatch = useDispatch();
  const queryInfo = useSelector((state) => state.products.queryData);
  const [loading, setLoading] = useState(false);

  const onPress = (value) => {
    let query = value.trim().replace(/(\s*)/g, "").toLowerCase();
    setLoading(true);
    dispatch(
      getProductList({
        page: 1,
        queryType: queryInfo.queryType,
        query,
      })
    );
    dispatch(getQueryData({ queryType: queryInfo.queryType, query }));
    setLoading(false);
  };

  const validateInput = (e) => {
    const pattern = /[^a-zA-Z\s]/gi;
    if (pattern.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 40) {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Select
        onChange={(value) => dispatch(getQueryData({ queryType: value }))}
        defaultValue={SearchOptionMap[0].value}
        style={{ width: 140, height: "100%", marginRight: 5 }}
        options={SearchOptionMap}
      />
      <Search
        style={{ width: 300 }}
        disabled={loading}
        placeholder="input search text"
        enterButton="Search"
        onSearch={onPress}
        onKeyPress={validateInput}
      />
      <ProductsTotalNumber />
    </div>
  );
};

export default OnSearch;
