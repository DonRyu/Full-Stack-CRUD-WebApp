import React from "react";
import { useSelector } from "react-redux";
import { Space, Table, Tag } from "antd";
import TotalNumberOfProducts from "./TotalNumberOfProducts";

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
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
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
  ];

  return (
    <div style={{padding:'20px',position:'relative'}}>
      <TotalNumberOfProducts />
      <Table columns={columns} dataSource={productList} />
    </div>
  );
};

export default ProductsTable;
