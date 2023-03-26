import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm } from "antd";
import TotalNumberOfProducts from "./TotalNumberOfProducts";
import ProductFormInDrawer from "./ProductFormInDrawer";
import OnSearch from "./OnSearch";
import { labels } from "../Labels";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { productList, productCRUD } from "../store/productSlice";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productList());
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
          {developers?.map((tag, key) => {
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
      <OnSearch />
      <TotalNumberOfProducts />
      <Table
        columns={columns}
        dataSource={List}
        rowKey={(item) => item.productNumber}
      />
    </div>
  );
};

export default ProductsTable;
