import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  Area,
  AreaChart as RechartAreaChart,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { FC, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import html2canvas from "html2canvas";
import RangeDatePicker from "./DatePicker";
import TitledValue from "./TitledValue";

interface Props {
  selectedServiceIndex: number | null;
}

const initialSeasonDataForLineChart = [
  {
    name: "بهار",
    value: 1,
  },
  {
    name: "تابستان",
    value: 1,
  },
  {
    name: "پاییز",
    value: 1,
  },
  {
    name: "زمستان",
    value: 1,
  },
];
const initialMonthDataForLineChart = [
  {
    name: "مهر",
    value: 1,
  },
  {
    name: "آبان",
    value: 1,
  },
  {
    name: "آذر",
    value: 1,
  },
  {
    name: "دی",
    value: 1,
  },
];

const initialWeeklyDataForLineChart = [
  {
    name: "سه هفته پیش",
    value: 1,
  },
  {
    name: "دو هفته پیش",
    value: 1,
  },
  {
    name: "یک هفته قبل",
    value: 1,
  },
  {
    name: "الان",
    value: 1,
  },
];

const initialDayDataForLineChart = [
  {
    name: "سه روز پیش",
    value: 1,
  },
  {
    name: "دو روز پیش",
    value: 1,
  },
  {
    name: "دیروز",
    value: 1,
  },
  {
    name: "امروز",
    value: 1,
  },
];

const initialHourlyDataForLineChart = [
  {
    name: "سه ساعت پیش",
    value: 1,
  },
  {
    name: "دو ساعت پیش",
    value: 1,
  },
  {
    name: "یک ساعت قبل",
    value: 1,
  },
  {
    name: "الان",
    value: 1,
  },
];

const AreaChart: FC<Props> = ({ selectedServiceIndex }) => {
  const [dataForAreaChart, setDataForAreaChart] = useState(
    initialSeasonDataForLineChart
  );

  const max = Math.max(...dataForAreaChart.map((item) => item.value));
  const min = Math.min(...dataForAreaChart.map((item) => item.value));
  const avg =
    dataForAreaChart.reduce((a, b) => a + b.value, 0) / dataForAreaChart.length;

  const [selectedTimeForAreaChart, setSelectedTimeForAreaChart] =
    useState("yearly");
  const [selectedServerForAreaChart, setSelectedServerForAreaChart] =
    useState("total");

  useEffect(() => {
    selectedTimeForAreaChart === "yearly"
      ? setDataForAreaChart(initialSeasonDataForLineChart)
      : selectedTimeForAreaChart === "monthly"
      ? setDataForAreaChart(initialMonthDataForLineChart)
      : selectedTimeForAreaChart === "weekly"
      ? setDataForAreaChart(initialWeeklyDataForLineChart)
      : selectedTimeForAreaChart === "daily"
      ? setDataForAreaChart(initialDayDataForLineChart)
      : setDataForAreaChart(initialHourlyDataForLineChart);

    setDataForAreaChart((prevData: { name: string; value: number }[]) =>
      prevData.map((data) => ({
        ...data,
        value:
          selectedServerForAreaChart === "total"
            ? Math.round(Math.random() * 24 + 12)
            : Math.round(Math.random() * 8 + 1),
      }))
    );
  }, [selectedServerForAreaChart, selectedTimeForAreaChart]);

  const chartRef = useRef(null);
  const exportChartPNG = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "chart.png";
        link.click();
      });
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {});

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
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
          sx={{
            position: "absolute",
            scale: showDatePicker ? "1" : "0",
            transformOrigin: "37% 50%",
            transition: "all .4s ease",
            right: "1rem",
            zIndex: "35",
          }}
        >
          <RangeDatePicker
            key="app"
            handleClose={setShowDatePicker}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Select
            IconComponent={IoChevronDown}
            label="فیلتر سرویس ها"
            value={selectedTimeForAreaChart}
            onChange={(e) => setSelectedTimeForAreaChart(e.target.value)}
            sx={{
              height: "2rem",
              boxShadow: "0 0 4px  rgb(0 0 0 / 10%)",
              borderRadius: ".5rem",
              paddingLeft: "1rem",
              zIndex: "10",
              ".MuiSelect-icon": {
                width: "20px",
                height: "20px",
                marginTop: "-.25rem",
              },
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
            }}
          >
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="hourly">
              ساعتی
            </MenuItem>
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="daily">
              روزانه
            </MenuItem>
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="weekly">
              هفته‌‌ای
            </MenuItem>
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="monthly">
              ماهانه
            </MenuItem>
            <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="yearly">
              سالانه
            </MenuItem>
          </Select>
          <BsCalendar2DateFill
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setShowDatePicker(!showDatePicker);
            }}
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              paddingLeft: ".5rem",
              zIndex: "30",
              cursor: "pointer",
            }}
          />
        </Box>
        <Select
          IconComponent={IoChevronDown}
          label="فیلتر سرویس ها"
          value={selectedServerForAreaChart}
          onChange={(e) => setSelectedServerForAreaChart(e.target.value)}
          sx={{
            marginRight: ".5rem",
            height: "2rem",
            boxShadow: "0 0 4px  rgb(0 0 0 / 10%)",
            zIndex: "10",
            ".MuiSelect-icon": {
              width: "20px",
              height: "20px",
              marginTop: "-.25rem",
            },
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
        >
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="total">
            مجموع ترافیک
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server1">
            سرور یک
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server2">
            سرور دو
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server3">
            سرور سه
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server4">
            سرور چهار
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server5">
            سرور پنچ
          </MenuItem>
          <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="server6">
            سرور شش
          </MenuItem>
        </Select>
        <Button
          onClick={exportChartPNG}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".3rem",
            background: "#0F6CBD",
            color: "#fff",
            fontFamily: "YekanBakh-Regular",
            borderRadius: ".5rem",
            ":hover": {
              background: "#0F6CBD",
              color: "#fff",
            },
          }}
        >
          دریافت خروجی
        </Button>
      </Box>
      <Box
        ref={chartRef}
        width="100%"
        fontFamily="YekanBakh-Regular"
        sx={{
          direction: "ltr",
          height: "35vh",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: "1rem",
            position: "absolute",
            bottom: "2.5rem",
            left: "52%",
            transform: "translateX(-50%)",
            background: "#fff",
            zIndex: "40",
            padding: ".5rem",
            border: "1px solid #707070",
            borderRadius: ".5rem",
          }}
        >
          <TitledValue color="red" title="Min" value={min} />
          <TitledValue color="green" title="Max" value={max} />
          <TitledValue color="blue" title="Avg" value={avg} />
        </Stack>
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginTop: "1rem" }}
        >
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
            <CartesianGrid strokeDasharray="3 3" />
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
              stroke={selectedServiceIndex !== null ? "#7160B4" : "#608DB4"}
              strokeWidth={3}
              fill="transparent"
              style={{ filter: "url(#glow)" }}
            />
            <ReferenceLine
              y={min}
              label={{
                value: "Min",
                position: "insideRight",
                stroke: "red",
                opacity: ".5",
              }}
              stroke="red"
              strokeDasharray="5 5"
              opacity=".5"
            />
            <ReferenceLine
              y={max}
              label={{
                value: "Max",
                position: "insideRight",
                stroke: "green",
                opacity: ".5",
              }}
              stroke="green"
              strokeDasharray="5 5"
              opacity=".5"
            />
            <ReferenceLine
              y={avg}
              label={{
                value: "Avg",
                position: "insideRight",
                stroke: "blue",
                opacity: ".5",
              }}
              stroke="blue"
              strokeDasharray="5 5"
              opacity=".5"
            />
          </RechartAreaChart>
        </ResponsiveContainer>
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
