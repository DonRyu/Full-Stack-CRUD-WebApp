import React from "react";
import { Button, Form, Input, notification } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { labels,ErrorMsgMap } from "../../Labels";


const DeveloperTable = () => {
  const addDevloper = (fields, add) => {
    if (fields.length < 5) {
      add();
    } else {
      notification["error"]({
        message: `You can add max 5 developers`,
      });
    }
  };

  return (
    <>
      <div style={{ paddingBlock: 4 }}>Developers</div>
      <Form.List name={"developers"} initialValue={[null]}>
        {(fields, { add, remove }) => (
          <div
            style={{
              borderRadius: 6,
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
                    {
                      validator: (_, value) => {
                        const pattern = /^[a-zA-Z\s]+$/;
                        if (!pattern.test(value)) {
                          notification["error"]({
                            message: `${ErrorMsgMap.developerNameError}`,
                          });
                          return Promise.reject();
                        }
                        return Promise.resolve();
                      },
                      validateTrigger: "onBlur",
                    },
                  ]}
                >
                  <Input placeholder={labels.Name} />
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
              onClick={() => addDevloper(fields, add)}
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
