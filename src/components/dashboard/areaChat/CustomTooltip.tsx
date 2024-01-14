import { Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  active?: boolean;
  payload?: any;
}

const CustomTooltip: FC<Props> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
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
            alignItems: "flex-end",
            fontFamily: "YekanBakh-Regular"
          }}
        >
          <Typography color="#608DB4">
            Receive: {`${payload[0].value.toFixed(3)} Gbps`}
          </Typography>
          <Typography color="#B46092">
            Send: {`${payload[1].value.toFixed(3)} Gbps`}
          </Typography>
          <Typography>Date: {`${payload[1].payload.date}`}</Typography>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
