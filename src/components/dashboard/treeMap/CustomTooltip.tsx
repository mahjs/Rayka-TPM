import { Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  active?: boolean;
  payload?: any;
  sumOfData?: number;
}

const CustomTooltip: FC<Props> = ({ active, payload, sumOfData = 1 }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          zIndex: "20",
          background: "#fff",
          color: "#333",
          boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem"
        }}
      >
        <div
          style={{
            margin: "13px 19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            fontFamily: "YekanBakh-Regular"
          }}
        >
          <Typography>نام: {payload[0].payload.name}</Typography>
          <Typography>مقدار: {payload[0].payload.value}</Typography>
          <Typography>
            سهم: %{((payload[0].payload.value / sumOfData) * 100).toFixed(2)}
          </Typography>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
