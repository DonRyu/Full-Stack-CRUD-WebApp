import React from 'react';
import { useSelector } from "react-redux";

const TotalNumberOfProducts = () => {
    const productList = useSelector((state) => state.products.productList);
    return (
        <div style={{position:'absolute',bottom:40}}>
            Total : {productList.length}
        </div>
    );
};

export default TotalNumberOfProducts;