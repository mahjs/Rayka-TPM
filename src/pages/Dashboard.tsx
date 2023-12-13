import React, { useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Search from "../components/dashboard/Search";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import AddressesTable from "../components/dashboard/AddressesTable";
import ServicesTable from "../components/dashboard/ServicesTable";
import TreeMap from "../components/dashboard/TreeMap";
import AreaChart from "../components/dashboard/AreaChart";

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
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

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

  return (
    <Box
      component="main"
      sx={{
        padding: "2rem 1.5rem",
        display: "flex",
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
            height: "35vh",
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
            <TreeMap
              dataForTreeChart={dataForTreeChart}
              selectedServiceIndex={selectedServiceIndex}
              setSelectedServiceIndex={setSelectedServiceIndex}
            />
          </Box>
        </Box>
        <AreaChart
          dataForAreaChart={dataForAreaChart}
          selectedServiceIndex={selectedServiceIndex}
        />
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
          <ServicesTable
            selectedServiceIndex={selectedServiceIndex}
            setDataForAreaChart={setDataForAreaChart}
            setSelectedServiceIndex={setSelectedServiceIndex}
          />
          <AddressesTable
            addressesData={addressesData}
            selectedServiceIndex={selectedServiceIndex}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
