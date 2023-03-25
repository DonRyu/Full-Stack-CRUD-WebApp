import React from "react";
import { Button, Drawer, Form } from "antd";
import { labels } from "../Labels";
import {PlusOutlined, SettingOutlined} from '@ant-design/icons';

const ProductFormInDrawer = ({ title }) => {
  return (
    <>
      {title === labels.Add ? (
        <Button type="primary">Add</Button>
      ) : (
        <Button type="primary"><SettingOutlined/></Button>
      )}
    </>
  );
};

export default ProductFormInDrawer;
