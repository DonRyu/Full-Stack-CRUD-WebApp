import React, { useEffect, useState } from "react";

import ProductsTable from "./components/ProductsTable";
import 'antd/dist/antd.css';

function App() {
  return (
    <div style={{width:'100%'}}>
      <ProductsTable />
    </div>
  );
}

export default App;
