import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm } from "antd";
import ProductFormInDrawer from "./ProductFormInDrawer";
import OnSearch from "./OnSearch";
import { labels } from "../Labels";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { productList, productCUD } from "../store/productSlice";
import ProductsPagination from "./ProductsPagination";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList({ page: 1 }));
  }, []);

  const deleteProduct = (productNumber) => {
    dispatch(
      productCUD({ data: { productNumber }, path: "delete", method: "DELETE" })
    ).then((res) => {
      if (res.payload.msg)
        return dispatch(productList({ page: List.currentPage }));
    });
  };

  const columns = [
    {
      title: "Product#",
      dataIndex: "productNumber",
      width:80,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "productName",
      width:150,
    },
    {
      title: "Scrum Master",
      dataIndex: "scrumMaster",
      width:150,
    },
    {
      title: "Owner",
      dataIndex: "productOwner",
      width:200,
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
    <div
      style={{
        padding: 35,
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
        size={"middle"}
        scroll={{ y: 1000 }}
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
