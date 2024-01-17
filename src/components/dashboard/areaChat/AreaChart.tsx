import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress
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
  Brush
} from "recharts";
import { FC, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import RangeDatePicker from "../DatePicker";
import TitledValue from "../TitledValue";
import * as domtoimage from "dom-to-image";
import api from "../../../services";
import getFillColorForAreaChart from "../../../utils/getFillColorForAreaChart";
import CustomTooltip from "./CustomTooltip";
import convertDataForAreaChart from "../../../utils/convertDateForAreaChart";

interface Props {
  isAllDataLoaded: boolean;
}
export interface ChartDataFormat {
  receiveValue: number;
  sendValue: number;
  date: string;
  time: string;
}

const AreaChart: FC<Props> = ({ isAllDataLoaded }) => {
  const [selectedTimeForAreaChart, setSelectedTimeForAreaChart] =
    useState("Hour");
  const [selectedServerForAreaChart, setSelectedServerForAreaChart] =
    useState("server1");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dataForChart, setDataForChart] = useState<ChartDataFormat[]>([
    {
      receiveValue: 0,
      sendValue: 0,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleDateString()
    }
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setShowDatePicker(false);
    if (endDate) {
      setSelectedTimeForAreaChart("custom");
    }
  }, [endDate]);

  useEffect(() => {
    setEndDate(null);
    setStartDate(null);
  }, [selectedTimeForAreaChart]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      startDate && endDate
        ? api.chart
            .getReceiveDataForCustomDate(
              startDate.getTime() / 1000,
              endDate.getTime() / 1000,
              selectedServerForAreaChart
            )
            .then((res) => res.data.result)
        : api.chart
            .getReceiveData(
              selectedTimeForAreaChart,
              selectedServerForAreaChart
            )
            .then((res) => res.data.result),
      startDate && endDate
        ? api.chart
            .getSendDataForCustomDate(
              startDate.getTime() / 1000,
              endDate.getTime() / 1000,
              selectedServerForAreaChart
            )
            .then((res) => res.data.result)
        : api.chart
            .getSendData(selectedTimeForAreaChart, selectedServerForAreaChart)
            .then((res) => res.data.result)
    ]).then((data) => {
      setDataForChart(convertDataForAreaChart(data).reverse());
      setLoading(false);
    });
  }, [
    selectedServerForAreaChart,
    selectedTimeForAreaChart,
    startDate,
    endDate
  ]);

  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [avg, setAvg] = useState(0);
  useEffect(() => {
    const rawMax = Math.max(
      ...dataForChart.map((data) => Math.max(data.receiveValue, data.sendValue))
    );
    const roundedMax = Math.ceil(rawMax * 1.1);
    setMax(roundedMax);

    setMin(
      +Math.min(
        ...dataForChart.map((data) =>
          Math.min(data.receiveValue, data.sendValue)
        )
      ).toFixed(2)
    );

    setAvg(
      +(
        dataForChart.reduce(
          (sum, curr) => (sum += (curr.receiveValue + curr.sendValue) / 2),
          0
        ) / dataForChart.length
      ).toFixed(2)
    );
  }, [dataForChart]);

  const chartRef = useRef(null);

  const captureScreenshot = () => {
    const chartElement = chartRef.current;
    if (chartElement) {
      domtoimage
        .toPng(chartElement, {
          style: {
            backgroundColor: "white"
          }
        })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = "chart-screenshot.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error: any) => {
          console.error(
            "Something went wrong with capturing the screenshot",
            error
          );
        });
    }
  };

  return (
    <Box position="relative" padding="1rem" ref={chartRef}>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Stack direction="row" gap="1rem" alignItems="center">
          <Typography
            fontFamily="YekanBakh-Medium"
            component="h3"
            sx={{
              fontSize: "1.5rem"
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
              zIndex: "35"
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
              position: "relative"
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
                  marginTop: "-.25rem"
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0
                  }
              }}
            >
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Hour">
                ساعتی
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Day">
                روزانه
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Week">
                هفته‌‌ای
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Month">
                ماهانه
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="Year">
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
                cursor: "pointer"
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
                marginTop: "-.25rem"
              },
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0
                }
            }}
          >
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
            <MenuItem
              sx={{ fontFamily: "YekanBakh-Regular" }}
              value="switch_in"
            >
              TPM Switch In
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "YekanBakh-Regular" }}
              value="switch_out"
            >
              TPM Switch Out
            </MenuItem>
          </Select>
        </Stack>
        {isAllDataLoaded ? (
          <Button
            onClick={captureScreenshot}
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
                color: "#fff"
              }
            }}
          >
            دریافت خروجی
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Box
        width="100%"
        fontFamily="YekanBakh-Regular"
        sx={{
          direction: "ltr",
          height: "35vh",
          position: "relative"
        }}
      >
        <Stack
          direction="row"
          sx={{
            opacity: showDatePicker ? "0" : "1",
            transition: "opacity .3s ease",
            gap: "1rem",
            position: "absolute",
            top: ".3rem",
            right: "-6.2rem",
            transform: "translateX(-50%)",
            background: "#fff",
            zIndex: "40",
            padding: ".5rem",
            border: "1px solid #707070",
            borderRadius: ".5rem"
          }}
        >
          <TitledValue color="red" title="Min" value={min} />
          <TitledValue color="green" title="Max" value={max} />
          <TitledValue color="blue" title="Avg" value={avg} />
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            style={{ marginTop: "1rem" }}
          >
            <RechartAreaChart width={500} data={dataForChart}>
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="2 2" className="w-96" />
              <YAxis
                domain={[0, max]}
                scale="linear"
                label={{ value: "Gbps", angle: -90, position: "insideLeft" }}
                // tickFormatter={(tick) => {
                //   if (tick === 1) {
                //     switch (tick) {
                //       case 1:
                //         return "1";
                //       case 0.8:
                //         return "8";
                //       case 0.6:
                //         return "6";
                //       case 0.4:
                //         return "4";
                //       case 0.2:
                //         return "2";
                //     }
                //   }
                //   return tick;
                // }}
              />
              <XAxis
                padding={{ left: 40, right: 60 }}
                dataKey={
                  selectedTimeForAreaChart === "Week" ||
                  selectedTimeForAreaChart === "Year" ||
                  selectedTimeForAreaChart === "Month"
                    ? "date"
                    : "time"
                }
              />
              <defs>
                <filter id="glow" x="-70%" y="-70%" width="200%" height="200%">
                  <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                  <feGaussianBlur
                    result="blurOut"
                    in="offOut"
                    stdDeviation="5"
                  />
                  <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
              </defs>
              <Area
                type="monotone"
                dataKey="receiveValue"
                stroke={getFillColorForAreaChart(selectedServerForAreaChart)[0]}
                fill={getFillColorForAreaChart(selectedServerForAreaChart)[0]}
                strokeWidth={3}
                style={{ filter: "url(#glow)" }}
              />
              <Area
                type="monotone"
                dataKey="sendValue"
                stroke={getFillColorForAreaChart(selectedServerForAreaChart)[1]}
                fill={getFillColorForAreaChart(selectedServerForAreaChart)[1]}
                strokeWidth={3}
                style={{ filter: "url(#glow)" }}
              />
              <ReferenceLine
                y={min}
                label={{
                  value: "Min",
                  position: "insideRight",
                  stroke: "red",
                  opacity: ".5"
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
                  opacity: ".5"
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
                  opacity: ".5"
                }}
                stroke="blue"
                strokeDasharray="5 5"
                opacity=".5"
              />
              <Brush
                style={{
                  borderRadius: ".5rem"
                }}
                height={30}
                stroke="#0F6CBD"
                fill="#5E819F88"
                travellerWidth={15}
              />
            </RechartAreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default AreaChart;
