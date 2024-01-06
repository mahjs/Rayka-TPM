import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Search from "../components/dashboard/Search";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import AddressesTable from "../components/dashboard/AddressesTable";
import ServicesTable from "../components/dashboard/ServicesTable";
import TreeMap from "../components/dashboard/TreeMap";
import AreaChart from "../components/dashboard/AreaChart";
import ProfileInfo from "../components/profile/ProfileInfoHeader";
import ExportDocModal from "../components/dashboard/ExportDocModal";
import useIpAddresses from "../hooks/useIpAddresses";
import useDomains from "../hooks/useDomains";
import useTreeMapData from "../hooks/useTreeMapData";
import { IoChevronDown } from "react-icons/io5";
import { Domain } from "../services/domain";

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
  const { loadingData, treeMapData, totalIps } = useTreeMapData();

  // State for Selecting a service
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  // State for getting all domains
  const { loadingDomains, domains, reFetchDomains } = useDomains();
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>(
    domains || []
  );

  useEffect(() => {
    if (!domains) return;
    if (searchInput === "") {
      setFilteredDomains(domains);
      return;
    }
    setSelectedServiceIndex(null);
    const filteredDomains = treeMapData.filter(
      (data) =>
        data.ips.filter((ip) =>
          ip.toLowerCase().includes(searchInput.toLowerCase())
        ).length > 0
    );

    setFilteredDomains(
      Array.from(
        new Set(
          domains
            .filter((domain) =>
              domain.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .concat(filteredDomains)
        )
      )
    );
  }, [searchInput, domains, treeMapData]);

  // State for getting the ip addresses
  const { ipAddressesForDomain, loadingAddresses, reFetchAddresses } =
    useIpAddresses(domains ? domains![selectedServiceIndex!]?.name : null);

  // Scroll to selected service
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
  const [selectedTimeForAreaChart, setSelectedTimeForAreaChart] =
    useState("yearly");
  const [selectedServerForAreaChart, setSelectedServerForAreaChart] =
    useState("total");
  const [dataForAreaChart, setDataForAreaChart] = useState(
    initialSeasonDataForLineChart
  );

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

  useEffect(() => {
    setDataForAreaChart((prevData: { name: string; value: number }[]) =>
      prevData.map((data) => ({
        ...data,
        value:
          selectedServerForAreaChart === "total"
            ? Math.round(Math.random() * 24 + 12)
            : Math.round(Math.random() * 8 + 1),
      }))
    );
  }, [selectedServerForAreaChart]);

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

  const [openExportModal, setOpenExportModal] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");

  return (
    <>
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
          <ProfileInfo
            loading={loadingData || loadingDomains}
            totalAddresses={totalIps}
            totalDomains={domains?.length || 0}
          />
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
                position: "relative",
              }}
            >
              <TreeMap
                loadingData={loadingData}
                dataForTreeChart={
                  loadingData ? [{ name: "nothing", value: 100 }] : treeMapData
                }
                selectedServiceIndex={selectedServiceIndex}
                setSelectedServiceIndex={setSelectedServiceIndex}
              />
              {loadingData && (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "48%",
                    transform: "translate(-50% -50%)",
                  }}
                />
              )}
            </Box>
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
                position: "absolute",
                height: "2rem",
                right: "8rem",
                top: "0",
                boxShadow: "0 0 4px  rgb(0 0 0 / 10%)",
                borderRadius: ".5rem",
                padding: ".5rem",
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
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="monthly"
              >
                ماهانه
              </MenuItem>
              <MenuItem sx={{ fontFamily: "YekanBakh-Regular" }} value="yearly">
                سالانه
              </MenuItem>
            </Select>
            <Select
              IconComponent={IoChevronDown}
              label="فیلتر سرویس ها"
              value={selectedServerForAreaChart}
              onChange={(e) => setSelectedServerForAreaChart(e.target.value)}
              sx={{
                marginRight: ".5rem",
                position: "absolute",
                right: "14rem",
                height: "2rem",
                top: "0",
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
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server1"
              >
                سرور یک
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server2"
              >
                سرور دو
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server3"
              >
                سرور سه
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server4"
              >
                سرور چهار
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server5"
              >
                سرور پنچ
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "YekanBakh-Regular" }}
                value="server6"
              >
                سرور شش
              </MenuItem>
            </Select>
            <AreaChart
              selectedServiceIndex={selectedServiceIndex}
              dataForAreaChart={dataForAreaChart}
            />
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

            <Button
              onClick={() => setOpenExportModal(true)}
              sx={{
                fontFamily: "YekanBakh-Bold",
                color: "#fff",
                paddingRight: ".5rem",
                display: "flex",
                background: "#0F6CBD",
                alignItems: "center",
                paddingX: "1rem",
                paddingY: ".75rem",
                gap: ".5rem",
                borderRadius: ".5rem",
                zIndex: "5",
                height: "fit-content",
                ":hover": {
                  color: "#0F6CBD",
                  background: "#0F6CBD33",
                },
              }}
            >
              دریافت خروجی
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {/* Services Table*/}
            <ServicesTable
              refetchDomains={reFetchDomains}
              refetchIpAddresses={reFetchAddresses}
              loading={loadingDomains}
              domains={filteredDomains}
              selectedServiceIndex={selectedServiceIndex}
              setDataForAreaChart={setDataForAreaChart}
              setSelectedServiceIndex={setSelectedServiceIndex}
            />
            <AddressesTable
              refetchIpAddresses={reFetchAddresses}
              domainName={
                domains ? domains![selectedServiceIndex!]?.name : null
              }
              loading={loadingAddresses}
              addressesData={ipAddressesForDomain}
              selectedServiceIndex={selectedServiceIndex}
            />
          </Box>
        </Box>
      </Box>
      <ExportDocModal
        openModal={openExportModal}
        setOpenModal={setOpenExportModal}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
      />
    </>
  );
};

export default Dashboard;
