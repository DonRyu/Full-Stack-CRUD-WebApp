import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const ProductDatePicker = ({ onChange, value }) => {
  const getDate = (date) => {
    onChange?.(date);
  };
  return (
    <span>
      <DatePicker
        format={"YYYY-MM-DD"}
        onChange={(_, date) => getDate(date)}
        defaultValue={value ? moment(value, "YYYY-MM-DD") : undefined}
      />
    </span>
  );
};

export default ProductDatePicker;
