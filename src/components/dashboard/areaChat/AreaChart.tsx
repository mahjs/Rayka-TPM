import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import RangeDatePicker from "../DatePicker";
import * as domtoimage from "dom-to-image";
import api from "../../../services";
import getFillColorForAreaChart from "../../../utils/getFillColorForAreaChart";
import convertDataForAreaChart from "../../../utils/convertDateForAreaChart";
import CustomizedAreaChart from "./CustomizedAreaChart";

interface Props {
  isAllDataLoaded: boolean;
}
export interface ChartDataFormat {
  date: string[];
  time: string[];
  send: number[];
  receive: number[];
}

const AreaChart: FC<Props> = ({ isAllDataLoaded }) => {
  const [selectedTimeForAreaChart, setSelectedTimeForAreaChart] =
    useState("Hour");
  const [selectedServerForAreaChart, setSelectedServerForAreaChart] =
    useState("server1");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [dataForChart, setDataForChart] = useState<ChartDataFormat>({
    date: [],
    time: [],
    send: [],
    receive: []
  });

  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setShowDatePicker(false);
    if (endDate) {
      setSelectedTimeForAreaChart("Custom");
    }
  }, [endDate]);

  useEffect(() => {
    // if (selectedTimeForAreaChart === "custom") return;
    setEndDate(null);
    setStartDate(null);
  }, [selectedTimeForAreaChart]);

  useEffect(() => {
    // setLoading(true);
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
      setDataForChart(convertDataForAreaChart(data));

      // setLoading(false);
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
    setMax(
      +Math.max(
        Math.max(
          Math.max(...dataForChart.receive),
          Math.max(...dataForChart.send)
        )
      ).toFixed(2)
    );
    setMin(
      +Math.min(
        Math.min(
          Math.min(...dataForChart.receive),
          Math.min(...dataForChart.send)
        )
      ).toFixed(2)
    );

    setAvg(
      +(
        (dataForChart.receive.reduce((sum, curr) => (sum += curr), 0) /
          dataForChart.receive.length +
          dataForChart.send.reduce((sum, curr) => (sum += curr), 0) /
            dataForChart.send.length) /
        2
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
                value="Custom"
              >
                دستی
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
        <CustomizedAreaChart
          showDate={
            selectedTimeForAreaChart === "Day" ||
            selectedTimeForAreaChart === "Week" ||
            selectedTimeForAreaChart === "Month" ||
            selectedTimeForAreaChart === "Year" ||
            selectedTimeForAreaChart === "Custom"
          }
          data={dataForChart}
          min={min}
          max={max}
          avg={avg}
          sendColor={getFillColorForAreaChart(selectedServerForAreaChart)[1]}
          receiveColor={getFillColorForAreaChart(selectedServerForAreaChart)[0]}
        />
      </Box>
    </Box>
  );
};

export default AreaChart;
