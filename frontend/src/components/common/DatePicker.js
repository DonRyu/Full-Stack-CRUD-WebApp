import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

const ProductDatePicker = ({ onChange, value, isSetting }) => {
  const getDate = (date) => {
    onChange?.(date);
  };
  return (
    <span>
      <CustomDaterPicker
        format={"YYYY/MM/DD"}
        onChange={(_, date) => getDate(date)}
        value={isSetting ? dayjs(value, "YYYY/MM/DD") : undefined}
        disabled={isSetting}
      />
    </span>
  );
};

export default ProductDatePicker;

const CustomDaterPicker= styled(DatePicker)`
  width: 100%;
`;
