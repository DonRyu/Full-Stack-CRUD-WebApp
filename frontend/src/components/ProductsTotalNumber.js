import React from 'react';
import { useSelector } from "react-redux";

const ProductsTotalNumber = () => {
    const List = useSelector((state) => state.products.productList);
    return (
        <div style={{width:120,marginLeft:5}}>
            Total : {List.totalProduct}
        </div>
    );
};

export default ProductsTotalNumber;