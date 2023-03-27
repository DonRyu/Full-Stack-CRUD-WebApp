import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm } from "antd";
import ProductFormInDrawer from "./ProductFormInDrawer";
import OnSearch from "./OnSearch";
import { labels } from "../Labels";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { productList, productCRUD } from "../store/productSlice";
import ProductsPagination from "./ProductsPagination";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList({ page: 1 }));
  }, []);

  const deleteProduct = (productNumber) => {
    dispatch(
      productCRUD({ data: { productNumber }, path: "delete", method: "DELETE" })
    ).then((res) => {
      if (res.payload.msg) return dispatch(productList());
    });
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
      title: "Scrum Master",
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
          {developers?.map((tag, key) => {
            return <Tag key={key}>{tag.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      width: 120,
    },
    {
      title: "Methodology",
      dataIndex: "methodology",
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
    <div
      style={{
       padding:35
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <OnSearch />
        <ProductFormInDrawer title={labels.Add} />
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={List.pageData}
        rowKey={(item) => item.productNumber}
      />
      <ProductsPagination />
    </div>
  );
};

export default ProductsTable;
