import React from "react";
import { DatePicker } from "antd";
import dayjs from 'dayjs';

const ProductDatePicker = ({ onChange, value, isSetting }) => {

  const getDate = (date) => {
    onChange?.(date);
  };
  return (
    <span>
      <DatePicker
        style={{ width: "100%" }}
        format={"YYYY/MM/DD"}
        onChange={(_, date) => getDate(date)}
        value={isSetting ? dayjs(value, "YYYY/MM/DD") : undefined}
        disabled={isSetting}
      />
    </span>
  );
};

export default ProductDatePicker;
