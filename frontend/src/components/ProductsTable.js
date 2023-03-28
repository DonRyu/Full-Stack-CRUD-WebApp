import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Table, Tag, Popconfirm, Tooltip } from "antd";
import ProductFormInDrawer from "./ProductFormInDrawer";
import OnSearch from "./OnSearch";
import { labels } from "../Labels";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getProductList, productCRUD } from "../store/productSlice";
import ProductsPagination from "./ProductsPagination";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.getProductList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductList({ page: 1 }));
  }, []);

  const deleteProduct = (productNumber) => {
    dispatch(
      productCRUD({ id: productNumber, method: "DELETE" })
    ).then((res) => {
      if (res.payload.msg)
        return dispatch(getProductList({ page: List.currentPage }));
    });
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
      dataIndex: "scrumMaster",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Owner",
      dataIndex: "productOwner",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Developers",
      dataIndex: "developers",
      render: (developers) => (
        <>
          <Tooltip
            title={developers.map((developer, key) => (
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
        scroll={{ y: 600 }}
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
