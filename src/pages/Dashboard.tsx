import React, { FC, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoFilterOutline, IoJournal } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";

import {
  Box,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { GoFoldDown } from "react-icons/go";

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

const dataForLineChart = [
  {
    name: "بهار",
    value: 100,
  },
  {
    name: "تابستان",
    value: 200,
  },
  {
    name: "پاییز",
    value: 1000,
  },
  {
    name: "زمستان",
    value: 150,
  },
];

const Dashboard: React.FC = () => {
  // State to hold the search input
  const [searchInput, setSearchInput] = useState("");

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

  const [dataForTreeChar, setDataForTreeChart] = useState(dataForSquareChart);

  return (
    <Box
      component="main"
      sx={{
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        component="header"
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
            <Typography fontWeight="bold" fontSize="1.5rem">
              TPM
            </Typography>
            <Typography fontWeight="300">Dashboard</Typography>
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
            <button>
              <IoChevronDown color="gray" />
            </button>
            <button
              style={{
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
            </button>
            <Typography
              sx={{
                paddingRight: ".5rem",
              }}
            >
              {"احمد مهرانفر"}
            </Typography>
          </Box>
        </Box>
        <Search
          value={searchInput}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <Box
          sx={{
            display: "flex",
            height: "40px",
            background: "#0F6CBD",
            overflow: "hidden",
            alignItems: "center",
            padding: ".5rem",
            gap: ".5rem",
            borderRadius: ".5rem",
          }}
        >
          <button>
            <IoChevronDown color="#fff" />
          </button>
          <Box
            sx={{
              height: "200%",
              background: "#fff",
              width: "2px",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              paddingRight: ".5rem",
            }}
          >
            دریافت خروجی
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "1.5rem",
        }}
      >
        {/* Right side. Charts*/}
        <Box
          sx={{
            width: "50%",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography
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
              }}
            >
              <ResponsiveContainer width="100%" height={250}>
                <Treemap
                  width={200}
                  height={300}
                  data={dataForTreeChar}
                  aspectRatio={4 / 3}
                  dataKey="value"
                  content={<CustomizedContent />}
                />
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box>
            <Typography
              component="h3"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              نمودار ترافیک
            </Typography>
            <Box
              width="100%"
              height={300}
              sx={{
                direction: "ltr",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={200}
                  data={dataForLineChart}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <Tooltip content={<CustomTooltip />} />
                  <YAxis
                    // tickMargin={50}
                    domain={[20, 20000]}
                    ticks={[1, 10, 50, 200, 1000, 5000, 20000]}
                    scale="log"
                  />
                  <XAxis padding={{ left: 50, right: 50 }} dataKey="name" />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0F6CBD"
                    strokeWidth={3}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>

        {/* Left side. Tables*/}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            gap: "1rem",
          }}
        >
          {/* Services Table*/}
          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Stack direction="row" alignItems="center" gap="1rem">
              <Typography
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
                  <MenuItem value="weekly">هفتگی</MenuItem>
                  <MenuItem value="monthly">ماهانه</MenuItem>
                  <MenuItem value="year">سالانه</MenuItem>
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
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    color: "#707070aa",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
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
                <Typography>تعداد سشن‌ها</Typography>
                <Typography
                  sx={{
                    marginLeft: "4rem",
                  }}
                >
                  نام وبسایت
                </Typography>
              </Box>
              {/* Table Body */}
              <Box
                sx={{
                  width: "100%",
                  padding: ".8rem .5rem",
                  justifyContent: "space-between",
                  display: "flex",
                  borderRadius: ".5rem",
                  border: "1px solid #E3E3E3",
                }}
              >
                <Typography>5254</Typography>
                <Typography
                  sx={{
                    direction: "ltr",
                    display: "flex",
                    gap: "2rem",
                  }}
                >
                  <span>1.</span>
                  spotify.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Addresses Table */}
          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Typography
              component="h3"
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
                <Typography>تعداد سشن‌ها</Typography>
                <Typography
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
                  minHeight: "66vh",
                  border: "1px solid #E3E3E3",
                  borderRadius: ".5rem",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    padding: ".8rem .5rem",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <Typography>5254</Typography>
                  <Typography
                    sx={{
                      direction: "ltr",
                      display: "flex",
                      gap: "2rem",
                    }}
                  >
                    <span>1.</span>
                    198.192.1.1
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  textAlign: "left",
                  color: "gray",
                }}
              >
                Powered By{" "}
                <span style={{ color: "black", fontWeight: "bold" }}>
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
  const { depth, x, y, width, height, index } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          // fill: depth <= 2 ? COLORS[Math.floor(index % 6)] : "none",
          fill: "#608DB4",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
    </g>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
}

export const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
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

export default Dashboard;
