import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
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

const mockDomainsData = [
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
  const { loadingData, treeMapData } = useTreeMapData();

  // State for Selecting a service
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  // State for getting all domains
  const { loadingDomains, domains, reFetchDomains } = useDomains();

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
  const [dataForAreaChart, setDataForAreaChart] = useState(
    initialDataForLineChart
  );

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
          <ProfileInfo />
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
                setDataForAreaChart={setDataForAreaChart}
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
              domains={domains}
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
