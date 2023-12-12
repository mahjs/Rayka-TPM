import React, { FC, useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Search from "../components/dashboard/Search";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";

const dataForSquareChart = [
  { name: "A1", value: 25 },
  { name: "A2", value: 32 },
  { name: "B1", value: 65 },
  { name: "B2", value: 38 },
  { name: "B3", value: 36 },
  { name: "A4", value: 41 },
  { name: "A5", value: 82 },
  { name: "B6", value: 73 },
  { name: "B3", value: 21 },
  { name: "B4", value: 13 },
  { name: "A7", value: 12 },
  { name: "A8", value: 39 },
  { name: "B5", value: 77 },
  { name: "B6", value: 93 },
  { name: "B7", value: 48 },
  { name: "c1", value: 10 },
  { name: "c2", value: 20 },
  { name: "d1", value: 70 },
  { name: "d2", value: 60 },
  { name: "d3", value: 33 },
  { name: "c3", value: 43 },
  { name: "c4", value: 55 },
  { name: "c5", value: 58 },
  { name: "d4", value: 59 },
  { name: "d5", value: 82 },
  { name: "c6", value: 18 },
  { name: "c7", value: 15 },
  { name: "d5", value: 27 },
  { name: "d6", value: 36 },
  { name: "d7", value: 71 },
];

const dataForAddresses = [
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.2", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
  { ip: "198.192.1.1", session: "5254" },
];

const initialDataForLineChart = [
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

const Dashboard: React.FC = () => {
  // State to hold the search input
  const [searchInput, setSearchInput] = useState<string>("");

  // Function to handle the search action
  const handleSearch = () => {
    // You would implement your search logic here
    // For now, we'll just log the input to the console
    console.log(`Search for: ${searchInput}`);
  };

  // Function to handle changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Function to handle submission of the search
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  // State for SquareCharts
  const [dataForTreeChart, setDataForTreeChart] = useState(dataForSquareChart);
  const sumOfTreeChartValues = dataForTreeChart.reduce(
    (sum, data) => (sum += data.value),
    0
  );
  const dataRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (
      selectedServiceIndex !== null &&
      dataRefs.current[selectedServiceIndex]
    ) {
      dataRefs.current[selectedServiceIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

  // State for Area Chart
  const [dataForAreaChart, setDataForAreaChart] = useState(
    initialDataForLineChart
  );

  // State for Selecting a service
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  // State for Downloading Export file
  const [openDownloadMenu, setOpenDownLoadMenu] = useState<boolean | null>(
    null
  );
  const [formatToDownload, setFormatToDownload] = useState<string | null>(null);

  useEffect(() => {
    if (openDownloadMenu === null) return;
    setOpenDownLoadMenu(false);
    setFormatToDownload(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatToDownload]);

  const [addressesData, setAddressesData] = useState(dataForAddresses);
  const [addressTablePage, setAddressTablePage] = useState(1);
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAddressTablePage(value);
  };

  return (
    <Box
      component="main"
      sx={{
        padding: "2rem 1.5rem",
        display: "flex",
        height: "100dvh",
        gap: "1rem",
      }}
    >
      {/* Right side. Charts*/}
      <Box
        sx={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Stack
              sx={{
                textAlign: "right",
              }}
            >
              <Typography fontSize="1.5rem" fontFamily="Tomorrow-SemiBold">
                TPM
              </Typography>
              <Typography fontFamily="Tomorrow-Light">Dashboard</Typography>
            </Stack>

            <Box
              sx={{
                background: "#000",
                height: "60px",
                width: "1px",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".2rem",
              }}
            >
              <Button
                sx={{
                  minWidth: "0",
                }}
              >
                <IoChevronDown
                  color="gray"
                  style={{ width: "25px", height: "25px" }}
                />
              </Button>
              <Button
                sx={{
                  minWidth: "0",
                  width: "50px",
                  height: "50px",
                  background: "#E6E6E6",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BsPerson
                  style={{
                    width: "23px",
                    height: "23px",
                    color: "gray",
                  }}
                />
              </Button>
              <Typography
                fontFamily="YekanBakh-Medium"
                sx={{
                  paddingRight: ".5rem",
                }}
              >
                {"احمد مهرانفر"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "40vh",
          }}
        >
          <Typography
            fontFamily="YekanBakh-Medium"
            component="h2"
            sx={{
              fontSize: "1.5rem",
            }}
          >
            سهم سرویس ها
          </Typography>
          <Box
            sx={{
              border: "1px solid #707070",
              padding: ".2rem",
              height: "100%",
            }}
          >
            <ResponsiveContainer width="100%">
              <Treemap
                width={200}
                data={dataForTreeChart}
                aspectRatio={4 / 3}
                dataKey="value"
                content={
                  <CustomizedContent
                    selectedIndex={selectedServiceIndex}
                    onClickHandler={setSelectedServiceIndex}
                  />
                }
              >
                <Tooltip
                  content={
                    <CustomTooltipForTreeChart
                      sumOfData={sumOfTreeChartValues}
                    />
                  }
                />
              </Treemap>
            </ResponsiveContainer>
          </Box>
        </Box>
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
              <AreaChart
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
                  domain={[20, 20000]}
                  ticks={[1, 10, 50, 200, 1000, 5000, 20000]}
                  scale="log"
                  tickFormatter={(tick) => {
                    if (tick === 1) {
                      return "0"; // Display '0' for the first tick
                    }
                    return tick; // For other ticks, display their actual value
                  }}
                />
                <XAxis padding={{ left: 50, right: 50 }} dataKey="name" />
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={
                    selectedServiceIndex !== null ? "#0F6CBD" : "transparent"
                  }
                  strokeWidth={3}
                  fill="transparent"
                  style={{ filter: "url(#glow)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            {selectedServiceIndex === null && (
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
                برای نمایش نمودار ترافیک یک سرویس را از منوی سرویس ها انتخاب
                کنید.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Left side. Tables*/}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            height: "5dvh",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            value={searchInput}
            onChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              height: "40px",
              background: "#0F6CBD",
              alignItems: "center",
              padding: ".5rem",
              gap: ".5rem",
              borderRadius: ".5rem",
              zIndex: "5",
            }}
          >
            <Button
              style={{ zIndex: "10", minWidth: "0" }}
              onClick={() => setOpenDownLoadMenu(!openDownloadMenu)}
            >
              <IoChevronDown
                color="#fff"
                style={{ width: "25px", height: "25px" }}
              />
            </Button>
            <Box
              sx={{
                height: "200%",
                background: "#fff",
                width: "2px",
              }}
            />
            <Typography
              fontFamily="YekanBakh-Bold"
              sx={{
                color: "#fff",
                paddingRight: ".5rem",
              }}
            >
              دریافت خروجی
            </Typography>

            <Box
              sx={{
                width: "100%",
                left: "0",
                position: "absolute",
                background: "#0F6CBD",
                borderRadius: ".5rem",
                padding: ".5rem",
                top: "-102%",
                opacity: "0",
                color: "#fff",
                textAlign: "center",
                fontFamily: "YekanBakh-Regular",
                animation:
                  openDownloadMenu !== null
                    ? openDownloadMenu
                      ? "slideDown .2s linear both"
                      : "slideUp .2s linear both"
                    : "",
                "@keyframes slideUp": {
                  "0%": {
                    opacity: "1",
                    top: "102%",
                  },

                  "60%": {
                    opacity: "0",
                  },

                  "100%": {
                    opacity: "0",
                    top: "-102%",
                  },
                },
                "@keyframes slideDown": {
                  "0%": {
                    opacity: "0",
                    top: "-100%",
                  },

                  "60%": {
                    opacity: ".1",
                  },

                  "100%": {
                    opacity: "1",
                    top: "102%",
                  },
                },
              }}
            >
              <Button
                onClick={() => setFormatToDownload("PDF")}
                sx={{ width: "100", color: "#fff" }}
              >
                PDF
              </Button>
              <Divider sx={{ background: "#fff" }} />
              <Button
                onClick={() => setFormatToDownload("CSV")}
                sx={{ width: "100%", color: "#fff" }}
              >
                CSV
              </Button>
              <Divider sx={{ background: "#fff" }} />
              <Button
                onClick={() => setFormatToDownload("Excel")}
                sx={{ width: "100%", color: "#fff" }}
              >
                Excel
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          {/* Services Table*/}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Stack direction="row" alignItems="center" gap="1rem">
              <Typography
                fontFamily="YekanBakh-Medium"
                component="h3"
                sx={{
                  fontSize: "1.5rem",
                }}
              >
                سرویس ها
              </Typography>

              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Select
                  IconComponent={IoChevronDown}
                  label="فیلتر سرویس ها"
                  value=""
                  sx={{
                    minWidth: "180px",
                    padding: ".5rem",
                    border: "1px solid transparent",
                    borderBottomColor: "gray",
                    paddingBottom: "0",
                    ".MuiSelect-icon": {
                      width: "25px",
                      height: "25px",
                    },
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: 0,
                      },
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "0",
                      },
                  }}
                >
                  <MenuItem
                    sx={{ fontFamily: "YekanBakh-Regular" }}
                    value="weekly"
                  >
                    هفتگی
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "YekanBakh-Regular" }}
                    value="monthly"
                  >
                    ماهانه
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "YekanBakh-Regular" }}
                    value="year"
                  >
                    سالانه
                  </MenuItem>
                </Select>
                <IoFilterOutline
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: ".2rem",
                    transform: "translateY(-50%)",
                    width: "25px",
                    height: "25px",
                    color: "gray",
                    zIndex: "-1",
                  }}
                />
                <Typography
                  fontFamily="YekanBakh-Thin"
                  sx={{
                    position: "absolute",
                    color: "#707070aa",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-1",
                  }}
                >
                  فیلتر بر اساس
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
              }}
            >
              {/* Table Header*/}
              <Box
                sx={{
                  marginTop: ".5rem",
                  width: "100%",
                  padding: ".8rem .5rem",
                  background: "#E9F1F4",
                  justifyContent: "space-between",
                  display: "flex",
                  borderRadius: ".5rem",
                }}
              >
                <Typography fontFamily="YekanBakh-Regular">
                  تعداد سشن‌ ها
                </Typography>
                <Typography
                  fontFamily="YekanBakh-Regular"
                  sx={{
                    marginLeft: "4rem",
                  }}
                >
                  نام وبسایت
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "75dvh",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".2rem",
                }}
              >
                {/* Table Body */}
                {Array(30)
                  .fill(null)
                  .map((_, index) => (
                    <Box
                      ref={(el: HTMLDivElement) =>
                        (dataRefs.current[index] = el)
                      }
                      key={index}
                      onClick={() => {
                        setDataForAreaChart((prevData) =>
                          prevData.map((data) => ({
                            ...data,
                            value: Math.round(Math.random() * 150),
                          }))
                        );

                        if (selectedServiceIndex === index)
                          setSelectedServiceIndex(null);
                        else setSelectedServiceIndex(index);
                      }}
                      sx={{
                        background:
                          selectedServiceIndex === index ? "#5E819F" : "",
                        color: selectedServiceIndex === index ? "#fff" : "",
                        transition: "all .2s linear",
                        cursor: "pointer",
                        width: "100%",
                        padding: ".8rem .5rem",
                        justifyContent: "space-between",
                        display: "flex",
                        borderRadius: ".5rem",
                        border: "1px solid #E3E3E3",
                        fontFamily: "SegoeUI",
                      }}
                    >
                      <Typography fontFamily="SegoeUI">5254</Typography>
                      <Typography
                        // fontFamily="SegoeUI"
                        sx={{
                          direction: "ltr",
                          display: "flex",
                          gap: "2rem",
                        }}
                      >
                        <span>{index + 1}.</span>
                        spotify.com
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Box>

          {/* Addresses Table */}
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Typography
              component="h3"
              fontFamily="YekanBakh-Medium"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              آدرس‌های IP
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".2rem",
              }}
            >
              {/* Table Header*/}
              <Box
                sx={{
                  marginTop: ".5rem",
                  width: "100%",
                  padding: ".8rem .5rem",
                  background: "#E9F1F4",
                  justifyContent: "space-between",
                  display: "flex",
                  borderRadius: ".5rem",
                }}
              >
                <Typography fontFamily="YekanBakh-Regular">
                  تعداد سشن‌ ها
                </Typography>
                <Typography
                  fontFamily="YekanBakh-Regular"
                  sx={{
                    marginLeft: "4rem",
                  }}
                >
                  آدرس IP
                </Typography>
              </Box>

              {/* Table Body */}
              <Box
                sx={{
                  position: "relative",
                  minHeight: "70dvh",
                  border: "1px solid #E3E3E3",
                  borderRadius: ".5rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Rows for the body */}
                {selectedServiceIndex !== null &&
                  addressesData
                    .slice(
                      (addressTablePage - 1) * 10,
                      Math.min(
                        (addressTablePage - 1) * 10 + 10,
                        dataForAddresses.length
                      )
                    )
                    .map((address, index) => (
                      <Box
                        sx={{
                          width: "100%",
                          padding: ".7rem .5rem",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <Typography fontFamily="YekanBakh-Regular">
                          {address.session}
                        </Typography>
                        <Typography
                          fontFamily="YekanBakh-Regular"
                          sx={{
                            direction: "ltr",
                            display: "flex",
                            minWidth: "125px",
                          }}
                        >
                          <span>{index + 1}.</span>
                          <span style={{ marginLeft: "auto" }}>
                            {address.ip}
                          </span>
                        </Typography>
                      </Box>
                    ))}
                {selectedServiceIndex === null && (
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
                    برای مشاهده آدرس های IP یک سرویس را از منوی سرویس ها انتخاب
                    کنید.
                  </Typography>
                )}
                {selectedServiceIndex !== null && (
                  <Pagination
                    sx={{
                      direction: "ltr",
                      marginTop: "auto",
                      marginBottom: "1rem",
                      marginX: "auto",
                    }}
                    color="primary"
                    onChange={handleChangePage}
                    count={Math.ceil(addressesData.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    hidePrevButton
                    hideNextButton
                  />
                )}
              </Box>
              <Typography
                fontFamily="YekanBakh-Light"
                sx={{
                  textAlign: "left",
                  color: "gray",
                }}
              >
                Powered By{" "}
                <span style={{ color: "black", fontFamily: "YekanBakh-Bold" }}>
                  Rayka
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, index, selectedIndex, onClickHandler } =
    props;

  return (
    <g onClick={() => onClickHandler(index)}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          transition: "all .2s linear",
          fill:
            selectedIndex !== null
              ? selectedIndex === index
                ? "#608DB4"
                : "#B2CADF"
              : "#608DB4",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      >
        <title style={{ color: "white" }}>Tooltip text goes here</title>
      </rect>
    </g>
  );
};

interface CustomTooltipForAreaChartProps {
  active?: boolean;
  payload?: any;
}

export const CustomTooltipForAreaChart: FC<CustomTooltipForAreaChartProps> = ({
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
            alignItems: "flex-start",
            fontFamily: "YekanBakh-Regular",
          }}
        >
          <p>زمان: {payload[0].payload.name}</p>
          <p>مقدار: {payload[0].payload.value}</p>
        </div>
      </div>
    );
  }

  return null;
};
interface CustomTooltipForTreeChartProps {
  active?: boolean;
  payload?: any;
  sumOfData?: number;
}

export const CustomTooltipForTreeChart: FC<CustomTooltipForTreeChartProps> = ({
  active,
  payload,
  sumOfData = 1,
}) => {
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
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            fontFamily: "YekanBakh-Regular",
          }}
        >
          <p>نام: {payload[0].payload.name}</p>
          <p>مقدار: {payload[0].payload.value}</p>
          <p>
            سهم: %{((payload[0].payload.value / sumOfData) * 100).toFixed(2)}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
