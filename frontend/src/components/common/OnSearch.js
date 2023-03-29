import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOptionMap } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getProductList, getQueryData } from "../../store/productSlice";
import ProductsTotalNumber from "../product/ProductTotalNumber";
import styled from "styled-components";
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
    <OnSearchContainer>
      <Select
        className={"selectBox"}
        onChange={(value) => dispatch(getQueryData({ queryType: value }))}
        defaultValue={SearchOptionMap[0].value}
        options={SearchOptionMap}
      />
      <Search
        className={"searchBox"}
        disabled={loading}
        placeholder="input search text"
        enterButton="Search"
        onSearch={onPress}
        onKeyPress={validateInput}
        allowClear
      />
      <ProductsTotalNumber />
    </OnSearchContainer>
  );
};

export default OnSearch;

const OnSearchContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .selectBox {
    width: 140px;
    height: 100%;
    margin-right: 5px;
  }
  .searchBox {
    width: 300px;
  }
`;
