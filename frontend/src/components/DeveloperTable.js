import React from "react";
import { Button, Drawer, Form, Row, Col, Input, Select } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const DeveloperTable = () => {
  return (
    <>
      <div style={{ paddingBlock: 4 }}>Developers</div>
      <Form.List name={"developers"} initialValue={[null]}>
        {(fields, { add, remove }) => (
          <div
            style={{
              borderRadius: 2,
              border: "1px solid #d9d9d9",
              height: 164,
              overflow: "auto",
              paddingBottom: 5,
            }}
          >
            {fields.map(({ key, name, ...restField }) => (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                  marginTop: 10,
                  height: 33,
                }}
                key={key}
              >
                <Form.Item
                  style={{ height: 33, width: "80%" }}
                  key={name}
                  name={name}
                  rules={[
                    {
                      required: true,
                      message: " ",
                    },
                  ]}
                >
                  <Input placeholder={"Full Name"} />
                </Form.Item>
                <Form.Item>
                  <MinusCircleOutlined
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      remove(name);
                    }}
                  />
                </Form.Item>
              </div>
            ))}
            <Button
              style={{
                position: "absolute",
                bottom: -32,
                width: "96.5%",
              }}
              onClick={() => {
                if (fields.length < 5) {
                  add();
                }
              }}
            >
              Add
            </Button>
          </div>
        )}
      </Form.List>
    </>
  );
};

export default DeveloperTable;
