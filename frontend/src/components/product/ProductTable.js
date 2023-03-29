/**
 * Main table which shows current list of products
 * User can do CRUD of product
 * User can see the products per page, each page have 10 products
 * User can move the page using pagination
 * User can search the product using search
 */
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
import { ProductTableContainer } from "./Product.style";

const ProductsTable = () => {
  const List = useSelector((state) => state.products.getProductList);
  const dispatch = useDispatch();

  /**
   * When the component mount, call first 10 products of List
   */
  useEffect(() => {
    dispatch(getProductList({ page: 1 }));
  }, []);

  /**
   * Get the product number (ID of product) and call delete API
   * @param {number} productNumber
   */
  const deleteProduct = (productNumber) => {
    dispatch(productCRUD({ id: productNumber, method: "DELETE" })).then(
      (res) => {
        if (res.payload.msg)
          return dispatch(getProductList({ page: List.currentPage }));
      }
    );
  };

  //Columns of table
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
          {/* Show the developers when user hover the tag */}
          <Tooltip
            title={developers?.map((developer, key) => (
              <div key={key}>{developer}</div>
            ))}
          >
            {/* Show the developers by tag */}
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
            {/* Drawer component for CRUD product */}
            <ProductFormInDrawer
              title={labels.Edit}
              productNumber={elm.productNumber}
              currentPage={List.currentPage}
            />
            {/* For deleting, ask user one more time to make sure the data termination */}
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
