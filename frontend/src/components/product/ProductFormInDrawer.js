/**
 * Drawer component to CRUD product data.
 * when the title props are add => Add drawer
 * when the title props are edit nad have productNumber => Efid drawer
 */
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
import { labels, MethodologyMap } from "../../constants";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import ProductDatePicker from "../common/DatePicker";
import DeveloperTable from "../common/DeveloperTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  productCRUD,
} from "../../store/productSlice";
import { NAME_VALIDATOR } from "../../helper/index";
import { DrawerButtonContainer } from "./Product.style";
const { Option } = Select;
const MAX_INPUT_LENGTH = 50;

const ProductFormInDrawer = ({ title, productNumber, currentPage }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const queryInfo = useSelector((state) => state.products.queryData);
  const dispatch = useDispatch();

  /**
   * Close the drawer when user press cancel
   */
  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  /**
   * Open the drawer when user press Add or setting button
   * When user want to setting it get product number by props to call the API
   */
  const onOpen = () => {
    setVisible(true);
    if (productNumber) {
      dispatch(
        productCRUD({
          method: "GET",
          id: `${productNumber}`,
        })
      ).then((res) => {
        form.setFieldsValue({ ...res.payload });
      });
    }
  };

  /**
  *This function is triggered when the form is submitted.
  *It checks if at least one developer is selected and then sends a POST or PUT request to add or update a product, respectively.
  *If the operation is successful, it dispatches a getProductList action to update the product list and resets the form fields.
    @param {Object} values - The values of the form fields.
  */
  const onFinish = (values) => {
    if (values.developers.length < 1) {
      notification["error"]({
        message: `Input at least one developer`,
      });
      return;
    }
    //Add product
    if (title === labels.Add) {
      dispatch(productCRUD({ data: values, method: "POST" })).then((res) => {
        res.payload?.msg &&
          dispatch(
            getProductList({
              page: 1,
              queryType: queryInfo?.queryType,
              query: queryInfo?.query,
            })
          );
      });
      //Edit product
    } else if (title === labels.Edit) {
      dispatch(
        productCRUD({
          data: { ...values, startDate: undefined },
          method: "PUT",
          id: productNumber,
        })
      ).then((res) => {
        res.payload?.msg &&
          dispatch(
            getProductList({
              page: currentPage,
              queryType: queryInfo?.queryType,
              query: queryInfo?.query,
            })
          );
      });
    }

    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      {/* Buttons to open drawer */}
      {title === labels.Add ? (
        <Button type="primary" onClick={() => onOpen()}>
          <PlusOutlined />
          Add
        </Button>
      ) : (
        <Button
          type="primary"
          onClick={() => onOpen()}
          className={"editButton"}
        >
          <SettingOutlined />
        </Button>
      )}
      {/* Drawer form to collect the product data */}
      <Drawer
        title={
          title === labels.Add ? labels.AddDrawerTitle : labels.EditDrawerTitle
        }
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
                    message: "Please enter a product name",
                  },
                ]}
              >
                <Input
                  placeholder={labels.ProductName}
                  maxLength={MAX_INPUT_LENGTH}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="productOwnerName"
                label={labels.ProductOwner}
                rules={[
                  {
                    required: true,
                    message: "Please enter a product owner",
                  },
                  NAME_VALIDATOR,
                ]}
              >
                <Input placeholder={labels.Name} maxLength={MAX_INPUT_LENGTH} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="scrumMasterName"
                label={labels.ScrumMaster}
                rules={[
                  {
                    required: true,
                    message: "Please enter a scrum master",
                  },
                  NAME_VALIDATOR,
                ]}
              >
                <Input placeholder={labels.Name} maxLength={MAX_INPUT_LENGTH} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label={labels.StartDate}
                rules={[
                  {
                    required: true,
                    message: "Please select start date",
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
                  {MethodologyMap?.map((item, index) => {
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
          <DrawerButtonContainer>
            <Form.Item className="drawer-form-buttons">
              <Button onClick={() => onClose()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </Form.Item>
          </DrawerButtonContainer>
        </Form>
      </Drawer>
    </>
  );
};

export default ProductFormInDrawer;
