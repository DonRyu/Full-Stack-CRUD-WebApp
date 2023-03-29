/**
 * DeveloperTable component for CRUD developers
 * Only get alphabet input (it should be the name of developer)
 */
import React from "react";
import { Button, Form, Input, notification } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { labels, ErrorMsgMap } from "../../constants";
import styled from "styled-components";

const DeveloperTable = () => {
  /**
   * Adds a new developer to the list of fields, if the list has fewer than 5 items.
   * Otherwise, displays an error message.
   * @param {array} fields - The current list of developers.
   * @param {function} add - The function to add a new developer to the list.
   */
  const addDevloper = (fields, add) => {
    if (fields.length < 5) {
      add();
    } else {
      notification["error"]({
        message: `${ErrorMsgMap.developerNumberError}`,
      });
    }
  };

  return (
    <DeveloperTableContainer>
      <div className={"title"}>Developers</div>
      <Form.List name={"developers"} initialValue={[null]}>
        {(fields, { add, remove }) => (
          <div className={"table"}>
            {fields?.map(({ key, name }) => (
              <div className={"row"} key={key}>
                <Form.Item
                  className={"col"}
                  key={name}
                  name={name}
                  rules={[
                    {
                      required: true,
                      message: " ",
                    },
                    {
                      validator: (_, value) => {
                        // developer can be only alphabet
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
                    className={"deleteIcon"}
                    onClick={() => {
                      remove(name);
                    }}
                  />
                </Form.Item>
              </div>
            ))}
            <Button
              className={"addButton"}
              onClick={() => addDevloper(fields, add)}
            >
              Add
            </Button>
          </div>
        )}
      </Form.List>
    </DeveloperTableContainer>
  );
};

export default DeveloperTable;

const DeveloperTableContainer = styled.div`
  .title {
    padding-block: 4px;
  }
  .table {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    height: 220px;
    overflow: auto;
    padding-bottom: 5px;
    .row {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      margin-top: 10px;
      height: 33px;
    }
    .col {
      height: 33px;
      width: 80%;
    }
    .deleteIcon {
      font-size: 18px;
    }
    .addButton {
      position: absolute;
      bottom: -32px;
      width: 96.5%;
    }
  }
`;
