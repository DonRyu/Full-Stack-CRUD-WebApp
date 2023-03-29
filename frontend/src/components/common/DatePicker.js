/**
 * Custom antd datepicker component to convert dayjs format to string "YYYY/MM/DD" format
 */
import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

/**
A date picker component for selecting a date.
@param {Function} onChange - A function to handle the date change event.
@param {string} value - The currently selected date in string format ("YYYY/MM/DD").
@param {boolean} isSetting - A flag to indicate if the date picker is for setting or display only.
@returns {JSX.Element} - A JSX element representing the date picker component.
*/
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

const CustomDaterPicker = styled(DatePicker)`
  width: 100%;
`;
