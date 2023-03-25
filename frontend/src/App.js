import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { product } from "./store/productSlice";
import ProductsTable from "./components/ProductsTable";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(product({ path: "get", data: {}, method: "GET" }));
  }, []);

  return (
    <div style={{width:'100%'}}>
      <ProductsTable />
    </div>
  );
}

export default App;
