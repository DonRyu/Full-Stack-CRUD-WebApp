/**
 * Main container of application
 * Contain the product table which CRUD occur
 */
import React from "react";
import ProductTable from "./components/product/ProductTable";
import styled from "styled-components";

function App() {
  return (
    <MainContainer>
      <ProductTable />
    </MainContainer>
  );
}

export default App;

// I used styled component and Antd to design 
const MainContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  min-width: 1180px;
  min-height: 740px;
  position: relative;
`;
