import React from "react";
import { Input, Select } from "antd";
import {SearchOptionMap} from "../Labels"
const { Search } = Input;


const OnSearch = () => {
  const onPress = (value) => {};

  return (
    <div style={{display:'flex',width:400}}>
      <Select
        defaultValue={SearchOptionMap[0].key}
        style={{ width: 180,height:'100%' }}
        options={SearchOptionMap}
      />
      <Search
        placeholder="input search text"
        enterButton="Search"
        onSearch={onPress}
      />
    </div>
  );
};

export default OnSearch;
