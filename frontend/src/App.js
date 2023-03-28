import React from "react";
import ProductTable from "./components/product/ProductTable";

function App() {
  return (
    <div
      style={{
        width:'100%',
        backgroundColor: "#f4f4f4",
        minWidth: 1180,
        minHeight: 750,
        position: "relative",
      }}
    >
      <ProductTable />
    </div>
  );
}

export default App;
