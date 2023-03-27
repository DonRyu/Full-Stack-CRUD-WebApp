import React from "react";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { productList } from "../store/productSlice";

const ProductsPagination = () => {
  const List = useSelector((state) => state.products.productList);
  const queryInfo = useSelector((state) => state.products.queryData);
  const dispatch = useDispatch();


  const pageChange = (page) => {
    dispatch(
      productList({
        page,
        queryType: queryInfo?.queryType,
        query: queryInfo?.query,
      })
    );
  };

  return (
    <div style={{ position: "absolute", bottom: 0 }}>
      <Pagination
        defaultCurrent={1}
        total={List.totalProduct}
        onChange={pageChange}
      />
    </div>
  );
};

export default ProductsPagination;
