/**
 * Component for showing total number of product
 */
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProductsTotalNumber = () => {
  // Access the `totalProduct` value from the Redux store's `getProductList` slice using `useSelector`
  const List = useSelector((state) => state.products.getProductList);
  return <Container>Total : {List.totalProduct}</Container>;
};

export default ProductsTotalNumber;

const Container = styled.div`
  width: 120px;
  margin-left: 5px;
`;
