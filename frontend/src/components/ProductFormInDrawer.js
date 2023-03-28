import React from "react";
import {
  Button,
  Drawer,
  Form,
  Row,
  Col,
  Input,
  Select,
  notification,
} from "antd";
import { labels, MethodologyMap } from "../Labels";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import ProductDatePicker from "./DatePicker";
import DeveloperTable from "./DeveloperTable";
import { useDispatch } from "react-redux";
import { productList, productCUD } from "../store/productSlice";
const { Option } = Select;

const ProductFormInDrawer = ({ title, productNumber, currentPage }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const onOpen = () => {
    setVisible(true);
    if (productNumber) {
      dispatch(
        productCUD({
          data: productNumber,
          method: "GET",
          id: `${productNumber}`,
        })
      ).then((res) => {
        form.setFieldsValue({ ...res.payload[0] });
      });
    }
  };

  const onFinish = (values) => {
    if (values.developers.length < 1) {
      notification["error"]({
        message: `Input at least one developer`,
      });
      return;
    }
    if (title === labels.Add) {
      dispatch(productCUD({ data: values, method: "POST" })).then(
        (res) => {
          res.payload.msg && dispatch(productList({ page: 1 }));
        }
      );
    } else if (title === labels.Edit) {
      dispatch(
        productCUD({
          data: { values, productNumber },
          method: "PUT",
        })
      ).then((res) => {
        res.payload.msg && dispatch(productList({ page: currentPage }));
      });
    }

    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      {title === labels.Add ? (
        <Button type="primary" onClick={() => onOpen()}>
          <PlusOutlined />
          Add
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => onOpen()}
          style={{
            width: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SettingOutlined />
        </Button>
      )}
      <Drawer
        title={title === labels.Add ? "Add Product" : "Edit Product"}
        width={window.innerWidth > 900 ? 620 : window.innerWidth}
        onClose={() => onClose()}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="productName"
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
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                name="startDate"
                label={labels.StartDate}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <ProductDatePicker
                  isSetting={title === labels.Add ? false : true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <DeveloperTable />
            </Col>
            <Col span={12}>
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
                    return (
                      <Option value={item.value} key={index}>
                        {item.key}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: 100,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Form.Item className="drawer-form-buttons">
              <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductFormInDrawer;
