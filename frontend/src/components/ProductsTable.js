import React from "react";
import { useSelector } from "react-redux";

const ProductsTable = () => {
  const productList = useSelector((state) => state.products.productList);

  return (
    <div>asd</div>
  );
};

export default ProductsTable;
