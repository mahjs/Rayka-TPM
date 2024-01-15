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
import RangeDatePicker from "./DatePicker";
import TitledValue from "./TitledValue";
import * as domtoimage from "dom-to-image";
import api from "../../services";
import { DataForChart } from "../../services/chart";

interface Props {
  isAllDataLoaded: boolean;
}
interface ChartDataFormat {
  receiveValue: number;
  sendValue: number;
  time: string;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const AreaChart: FC<Props> = ({ isAllDataLoaded }) => {
  const [selectedTimeForAreaChart, setSelectedTimeForAreaChart] =
    useState("Hour");
  const [selectedServerForAreaChart, setSelectedServerForAreaChart] =
    useState("server1");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowProgress(true);
    setShowButton(false);

    const timer = setTimeout(() => {
      setShowProgress(false);
      setShowButton(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setEndDate(null);
    setStartDate(null);
  }, [selectedTimeForAreaChart]);

  const [dataForChart, setDataForChart] = useState<ChartDataFormat[]>([
    {
      receiveValue: 0,
      sendValue: 0,
      time: new Date().toLocaleDateString()
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const convertDataForAreaChart = (data: [DataForChart[], DataForChart[]]) => {
    const smallerIndex = Math.min(data[0].length, data[1].length);
    const formattedData: ChartDataFormat[] = [];
    for (let i = 0; i < smallerIndex; i++) {
      formattedData.push({
        receiveValue: +data[0][i].value / ( 10 ** 9),
        sendValue: +data[1][i].value / ( 10 ** 9),
        time: formatDate(new Date(+data[0][i].clock * 1000))
      });
    }
    return formattedData;
  };

  useEffect(() => {
    setShowDatePicker(false);
    if (endDate) {
      setSelectedTimeForAreaChart("custom");
    }
  }, [endDate]);

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
              <MenuItem
                disabled
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="custom"
              >
                انتخابی
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
        {showProgress && <CircularProgress />}

        {showButton && (
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
            top: "1rem",
            left: "52%",
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
        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ marginTop: "1rem" }}
        >
          <RechartAreaChart width={500} data={dataForChart}>
            <Tooltip content={<CustomTooltipForAreaChart />} />
            <CartesianGrid strokeDasharray="2 2" className="w-96" />
            <YAxis
              domain={[0, max]}
              // ticks={[0, 5, 10, 15, 20]}
              scale="linear"
              label={{ value: "Gbps", angle: -90, position: "insideLeft" }}
              tickFormatter={(tick) => {
                const tickLabels = {
                  1: "10",
                  0.8: "8",
                  0.6: "6",
                  0.4: "4",
                  0.2: "2"
                };
                return tickLabels[tick] || tick;
              }}
            />
            <XAxis padding={{ left: 40, right: 60 }} dataKey="time" />
            <defs>
              <filter id="glow" x="-70%" y="-70%" width="200%" height="200%">
                <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <Area
              type="monotone"
              dataKey="receiveValue"
              stroke={"#608DB4"}
              fill="#608DB4"
              strokeWidth={3}
              style={{ filter: "url(#glow)" }}
            />
            <Area
              type="monotone"
              dataKey="sendValue"
              stroke={"#B46092"}
              fill="#B46092"
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
            <Brush />
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
  payload
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
        </div>
      </div>
    );
  }

  return null;
};

export default AreaChart;
