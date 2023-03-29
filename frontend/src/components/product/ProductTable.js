import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm, Tooltip } from "antd";
import { labels } from "../../constants";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getProductList, productCRUD } from "../../store/productSlice";
import OnSearch from "../common/OnSearch";
import ProductPagination from "./ProductPagination";
import ProductFormInDrawer from "./ProductFormInDrawer";
import styled from "styled-components";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.getProductList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList({ page: 1 }));
  }, []);

  const deleteProduct = (productNumber) => {
    dispatch(productCRUD({ id: productNumber, method: "DELETE" })).then(
      (res) => {
        if (res.payload.msg)
          return dispatch(getProductList({ page: List.currentPage }));
      }
    );
  };

  const columns = [
    {
      title: "Product#",
      dataIndex: "productNumber",
      width: 80,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "productName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Scrum Master",
      dataIndex: "scrumMasterName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Owner",
      dataIndex: "productOwnerName",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Developers",
      dataIndex: "developers",
      render: (developers) => (
        <>
          <Tooltip
            title={developers?.map((developer, key) => (
              <div key={key}>{developer}</div>
            ))}
          >
            {developers?.map((tag, key) => {
              return <Tag key={key}>{tag.toUpperCase()}</Tag>;
            })}
          </Tooltip>
        </>
      ),
      ellipsis: true,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      width: 120,
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
      width: 110,
    },
    {
      title: "",
      dataIndex: "action",
      width: 100,
      render: (_, elm) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <ProductFormInDrawer
              title={labels.Edit}
              productNumber={elm.productNumber}
              currentPage={List.currentPage}
            />
            <Popconfirm
              placement="leftTop"
              title={"Delete"}
              onConfirm={() => {
                deleteProduct(elm.productNumber);
              }}
              okText={"Yes"}
              cancelText={"Cancel"}
            >
              <Button type={"primary"} danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <ProductTableContainer>
      <div className={"header"}>
        <OnSearch />
        <ProductFormInDrawer title={labels.Add} />
      </div>
      <Table
        size={"middle"}
        scroll={{ y: 600 }}
        pagination={false}
        columns={columns}
        dataSource={List.pageData}
        rowKey={(item) => item.productNumber}
      />
      <ProductPagination />
    </ProductTableContainer>
  );
};

export default ProductsTable;

const ProductTableContainer = styled.div`
  padding: 35px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;
