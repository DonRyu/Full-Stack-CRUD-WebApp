import React, { useState } from "react";
import { Input, Select } from "antd";
import { SearchOptionMap } from "../Labels";
import { useDispatch } from "react-redux";
import { productSearch } from "../store/productSlice";
import TotalNumberOfProducts from "../components/TotalNumberOfProducts";
const { Search } = Input;

const OnSearch = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    SearchOptionMap[0].value
  );
  const [loading, setLoading] = useState(false);

  const onPress = (value) => {
    setLoading(true);
    dispatch(
      productSearch({
        path: `get?selectedOption=${selectedOption}&value=${value
          .trim()
          .replace(/(\s*)/g, "")
          .toLowerCase()}`,
        method: "GET",
      })
    );
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", width: 400 }}>
      <Select
        onChange={(value) => setSelectedOption(value)}
        defaultValue={SearchOptionMap[0].value}
        style={{ width: 180, height: "100%" }}
        options={SearchOptionMap}
      />
      <Search
        disabled={loading}
        placeholder="input search text"
        enterButton="Search"
        onSearch={onPress}
      />
      <TotalNumberOfProducts />
    </div>
  );
};

export default OnSearch;
