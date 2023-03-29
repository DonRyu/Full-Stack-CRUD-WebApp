/**
 * This is collect of css to design product table's and their sub components
 * Using styled component
 */
import styled from "styled-components";
import { Row } from "antd";

export const ProductTableContainer = styled.div`
  padding: 35px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .paginationConatiner{
    position:absolute;
    bottom:10px;
    left:35%;
  }
  .editButton {
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const DrawerButtonContainer = styled(Row)`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
