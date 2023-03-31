/**
 *This component renders a search bar that allows users to search for products based on different criteria such as the product name or its developers.
 *It dispatches getProductList and getQueryData actions to retrieve products matching the search query and updates the query information state accordingly.
 *Users can enter search keywords and select the type of search from a dropdown list.
 *Additionally, a ProductsTotalNumber component is included to display the total number of products matching the search query.
 */
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

  /**
   * Handles the search button click event and dispatches the getProductList and getQueryData actions
   * with the current query type and search query to fetch matching products and update the query data.
   * @param {string} value - The search query value entered by the user.
   */
  const onPress = (query) => {
    setLoading(true);
    dispatch(
      getProductList({
        page: 1,
        queryType: queryInfo?.queryType,
        query
      })
    );
    dispatch(getQueryData({ queryType: queryInfo?.queryType, query}));
    setLoading(false);
  };

  /**
   * Validates the search input and prevents the user from entering non-alphabetic characters and exceeding 40 characters limit.
   * @param {object} e - The key press event object.
   */
  const validateInput = (e) => {
    const pattern = /[^a-zA-Z\s]/gi;
    if (pattern.test(e.key)) {
      // User can type only alphabet
      e.preventDefault();
    }
    if (e.target.value.length >= 40) {
      // User can not type more then 40 letters
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
        onChange={(e) =>
          dispatch(getQueryData({ ...queryInfo, query: e.target.value }))
        }
        value={queryInfo.query}
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
