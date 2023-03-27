import React from "react";
import ProductsTable from "./components/ProductsTable";

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
      <ProductsTable />
    </div>
  );
}

export default App;
