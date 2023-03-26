import React from 'react';
import { useSelector } from "react-redux";

const ProductsTotalNumber = () => {
    const productList = useSelector((state) => state.products.productList);
    return (
        <div style={{width:120,marginLeft:5}}>
            Total : {productList.length}
        </div>
    );
};

export default ProductsTotalNumber;