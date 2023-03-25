import React from "react";
import { Button, Drawer, Form, Row, Col, Input, Select } from "antd";
import { labels , MethodologyMap} from "../Labels";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
const { Option } = Select;

// "productNumber": "76237-279",
// "productName": "Lotlux",
// "scrumMaster": "Constantino",
// "productOwner": "Irvine",
// "developers": ["Willabella", "Glenine", "Haleigh"],
// "startDate": "2022-09-25",
// "methodology": "Agile"

const ProductFormInDrawer = ({ title }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onOpen = () => {
    setVisible(true);
  };

  const onSubmit = () => {};

  return (
    <>
      {title === labels.Add ? (
        <Button type="primary" onClick={() => onOpen()}>
          <PlusOutlined />
          Add
        </Button>
      ) : (
        <Button type="primary" onClick={() => onOpen()}>
          <SettingOutlined />
        </Button>
      )}
      <Drawer
        title={title === labels.Add ? "Add Product" : "Edit Product"}
        width={window.innerWidth > 900 ? 720 : window.innerWidth}
        onClose={() => onClose()}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={10}>
            <Col span={10}>
              <Form.Item
                name="productname"
                label={labels.ProductName}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder={labels.ProductName} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="productOwner"
                label={labels.ProductOwner}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder={labels.ProductOwner} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={10}>
              <Form.Item
                name="scrumMaster"
                label={labels.ScrumMaster}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder={labels.ScrumMaster} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="developers"
                label={labels.Developers}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder={labels.Developers} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={10}>
              <Form.Item
                name="startDate"
                label={labels.StartDate}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
              initialValue={MethodologyMap[0].value}
                name="methodology"
                label={labels.Methodology}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                 <Select>
                  {MethodologyMap.map((item, index) => {
                    return <Option value={item.value} key={index}>{item.key}</Option>
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="drawer-form-buttons">
            <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onSubmit} htmlType={"submit"} type="primary">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductFormInDrawer;
