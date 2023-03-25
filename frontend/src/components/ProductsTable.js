import React from "react";
import { useSelector } from "react-redux";
import { Button, Space, Table, Tag } from "antd";
import TotalNumberOfProducts from "./TotalNumberOfProducts";
import ProductFormInDrawer from "./ProductFormInDrawer";
import { labels } from "../Labels";

// "productNumber": "76237-279",
// "productName": "Lotlux",
// "scrumMaster": "Constantino",
// "productOwner": "Irvine",
// "developers": ["Willabella", "Glenine", "Haleigh"],
// "startDate": "2022-09-25",
// "methodology": "Agile"

const ProductsTable = () => {
  const productList = useSelector((state) => state.products.productList);

  const columns = [
    {
      title: "Product#",
      dataIndex: "productNumber",
      key: "productNumber",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "ScrumMaster",
      dataIndex: "scrumMaster",
      key: "scrumMaster",
    },
    {
      title: "Owner",
      dataIndex: "productOwner",
      key: "productOwner",
    },
    {
      title: "Developers",
      key: "developers",
      dataIndex: "developers",
      render: (developers) => (
        <>
          {developers.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "Methodology",
      key: "methodology",
      dataIndex: "methodology",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, elm) => {
        return (
          <>
            <ProductFormInDrawer title={labels.Edit} />
            <Button type="primary" danger>
              {labels.Delete}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ProductFormInDrawer title={labels.Add} />
      <TotalNumberOfProducts />
      <Table columns={columns} dataSource={productList} />
    </div>
  );
};

export default ProductsTable;
