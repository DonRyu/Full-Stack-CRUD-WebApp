import React from 'react';
import { useSelector } from "react-redux";

const TotalNumberOfProducts = () => {
    const productList = useSelector((state) => state.products.productList);
    return (
        <div>
            Total : {productList.length}
        </div>
    );
};

export default TotalNumberOfProducts;