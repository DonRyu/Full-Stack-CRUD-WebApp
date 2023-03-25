import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const ProductDatePicker = ({ onChange, value, isSetting }) => {
  // const [date, setDate] = useState("");

  // useEffect(() => {
  //   isSetting && setDate(value);
  // }, [date]);

  const getDate = (date) => {
    onChange?.(date);
  };
  return (
    <span>
      <DatePicker
        style={{ width: "100%" }}
        format={"YYYY-MM-DD"}
        onChange={(_, date) => getDate(date)}
        value={isSetting ? moment(value, "YYYY-MM-DD") : undefined}
        disabled={isSetting}
      />
    </span>
  );
};

export default ProductDatePicker;
