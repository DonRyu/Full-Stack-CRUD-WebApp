/**
 *This component is responsible for rendering the pagination for the product list. It uses the Ant Design Pagination
 *component and Redux hooks to handle state management. It retrieves the current page number and total number of
 *products from the Redux store and dispatches an action to update the product list when the user changes the page.
 */
import React from "react";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../store/productSlice";

const ProductsPagination = () => {
  const List = useSelector((state) => state.products.getProductList);
  const queryInfo = useSelector((state) => state.products.queryData);
  const dispatch = useDispatch();

  /**
   * Get page number from user and call the products by 10
   * @param {number} page
   */
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
    <div className={"paginationConatiner"}>
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
