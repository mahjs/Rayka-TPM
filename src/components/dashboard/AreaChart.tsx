import { Box, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  Area,
  AreaChart as RechartAreaChart,
} from "recharts";
import { FC } from "react";

interface Props {
  selectedServiceIndex: number | null;
  dataForAreaChart: { name: string; value: number }[];
}

const AreaChart: FC<Props> = ({ selectedServiceIndex, dataForAreaChart }) => {
  return (
    <Box>
      <Typography
        fontFamily="YekanBakh-Medium"
        component="h3"
        sx={{
          fontSize: "1.5rem",
        }}
      >
        نمودار ترافیک
      </Typography>
      <Box
        width="100%"
        fontFamily="YekanBakh-Regular"
        sx={{
          direction: "ltr",
          height: "35vh",
          position: "relative",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartAreaChart
            width={500}
            data={dataForAreaChart}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip content={<CustomTooltipForAreaChart />} />
            <YAxis
              domain={[1, 40]}
              ticks={[1, 5, 10, 20, 40]}
              scale="log"
              label={{ value: "Gbps", angle: -90, position: "insideLeft" }}
              tickFormatter={(tick) => {
                if (tick === 1) {
                  return "0"; // Display '0' for the first tick
                }
                return tick; // For other ticks, display their actual value
              }}
            />
            <XAxis padding={{ left: 50, right: 50 }} dataKey="name" />
            <defs>
              <filter id="glow" x="-70%" y="-70%" width="200%" height="200%">
                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={"#0F6CBD"}
              strokeWidth={3}
              fill="transparent"
              style={{ filter: "url(#glow)" }}
            />
          </RechartAreaChart>
        </ResponsiveContainer>
        {/* {selectedServiceIndex === null && (
          <Typography
            fontFamily="YekanBakh-Regular"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "200px",
              textAlign: "center",
            }}
          >
            برای نمایش نمودار ترافیک یک سرویس را از منوی سرویس ها انتخاب کنید.
          </Typography>
        )} */}
      </Box>
    </Box>
  );
};

interface CustomTooltipForAreaChartProps {
  active?: boolean;
  payload?: any;
}

const CustomTooltipForAreaChart: FC<CustomTooltipForAreaChartProps> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#333",
          boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            fontFamily: "YekanBakh-Regular",
          }}
        >
          {/* <Typography>زمان: {payload[0].payload.name}</Typography> */}
          <Typography>
            {`${
              payload[0].payload.value === 1 ? 0 : payload[0].payload.value
            } Gbps`}
          </Typography>
        </div>
      </div>
    );
  }

  return null;
};

export default AreaChart;
