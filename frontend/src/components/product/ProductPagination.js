import React from "react";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../store/productSlice";

const ProductsPagination = () => {
  const List = useSelector((state) => state.products.getProductList);
  const queryInfo = useSelector((state) => state.products.queryData);
  const dispatch = useDispatch();

  const pageChange = (page) => {
    dispatch(
      getProductList({
        page,
        queryType: queryInfo?.queryType,
        query: queryInfo?.query,
      })
    );
  };

  return (
    <div style={{ position: "absolute", bottom: 10,left:'35%' }}>
      <Pagination
        current={List.currentPage}
        total={List.totalProduct}
        onChange={pageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ProductsPagination;
