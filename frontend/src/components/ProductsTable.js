import React from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm } from "antd";
import TotalNumberOfProducts from "./TotalNumberOfProducts";
import ProductFormInDrawer from "./ProductFormInDrawer";
import { labels } from "../Labels";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { product } from "../store/productSlice";

// "productNumber": "76237-279",
// "productName": "Lotlux",
// "scrumMaster": "Constantino",
// "productOwner": "Irvine",
// "developers": ["Willabella", "Glenine", "Haleigh"],
// "startDate": "2022-09-25",
// "methodology": "Agile"

const ProductsTable = () => {
  const productList = useSelector((state) => state.products.productList);
  const dispatch = useDispatch();

  const deleteProduct = (productNumber) => {
    dispatch(
      product({ data: { productNumber }, path: "delete", method: "DELETE" })
    );
  };

  const columns = [
    {
      title: "Product#",
      dataIndex: "productNumber",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "ScrumMaster",
      dataIndex: "scrumMaster",
    },
    {
      title: "Owner",
      dataIndex: "productOwner",
    },
    {
      title: "Developers",
      dataIndex: "developers",
      render: (developers) => (
        <>
          {developers?.map((tag,key) => {
            return <Tag key={key}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "startDate",
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, elm) => {
        return (
          <>
            <ProductFormInDrawer
              title={labels.Edit}
              productNumber={elm.productNumber}
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
          </>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ProductFormInDrawer title={labels.Add} />
      <TotalNumberOfProducts />
      <Table
        columns={columns}
        dataSource={productList}
        rowKey={(item) => item.productNumber}
      />
    </div>
  );
};

export default ProductsTable;
