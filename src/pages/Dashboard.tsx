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
import { Domain } from "../services/domain";
import * as XLSX from "xlsx";
interface DomainData {
  name: string;
  ips: string[];
}
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

  // Function to handle submission of the search
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  // State for Selecting a service
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<
    number | null
  >(null);

  // State for SquareCharts
  const { loadingData, treeMapData, totalIps } = useTreeMapData();

  const [filteredIps, setFilteredIps] = useState<string[]>(totalIps);

  useEffect(() => {
    if (totalIps.length === 0) return;
    setFilteredIps(totalIps);
  }, [totalIps]);

  useEffect(() => {
    if (isNaN(parseInt(searchInput)) || selectedServiceIndex !== null) return;

    setFilteredIps(
      totalIps.filter((ip) =>
        ip.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, selectedServiceIndex]);

  // State for getting all domains
  const { loadingDomains, domains, reFetchDomains } = useDomains();
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>(
    domains || []
  );

  // Filter functionality
  useEffect(() => {
    if (!domains) return;
    if (searchInput === "") {
      setFilteredDomains(domains);
      return;
    }
    // setSelectedServiceIndex(null);
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
    useIpAddresses(
      domains ? filteredDomains![selectedServiceIndex!]?.name : null
    );
  const [filteredIpAddresses, setFilteredIpAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (!ipAddressesForDomain) return;
    if (isNaN(parseInt(searchInput))) {
      setFilteredIpAddresses(ipAddressesForDomain);
      return;
    }
  }, [ipAddressesForDomain, searchInput]);

  useEffect(() => {
    if (!ipAddressesForDomain) return;

    setFilteredIpAddresses(
      ipAddressesForDomain.filter((ip) =>
        isNaN(parseInt(searchInput))
          ? true
          : ip.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, selectedServiceIndex, ipAddressesForDomain]);

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

  const [domainDownloadData, setDomainDownloadData] = useState<DomainData[]>(
    []
  );
  const prepareDataForExport = () => {
    // Create an array to hold the data for each domain
    let domainExportData = [];

    // Iterate over each domain to prepare its data
    domainDownloadData.forEach((domain) => {
      let domainIps =
        treeMapData.find((data) => data.name === domain.name)?.ips || [];

      // Add an object for each domain with its name and associated IPs
      domainExportData.push({ name: domain.name, ips: domainIps });
    });

    return domainExportData;
  };

  const exportToExcel = () => {
    const domainData = prepareDataForExport();
    const wb = XLSX.utils.book_new();

    domainData.forEach((domain) => {
      // Convert each domain's IP list to a format suitable for Excel sheet
      const ipData = domain.ips.map((ip) => ({ IP: ip }));
      const ws = XLSX.utils.json_to_sheet(ipData);
      ws["!cols"] = [{ wch: 20 }];
      // Append a new sheet for each domain
      XLSX.utils.book_append_sheet(wb, ws, domain.name);
    });

    // Write the Excel file if there are sheets
    if (wb.SheetNames.length > 0) {
      XLSX.writeFile(wb, "Domains_and_IPs.xlsx");
    } else {
      console.error("No data to export.");
    }
  };

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
            gap: "1rem",
          }}
        >
          <ProfileInfo
            loading={loadingData || loadingDomains}
            totalAddresses={totalIps.length}
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
                selectedServiceIndex={
                  searchInput === null
                    ? selectedServiceIndex
                    : domains?.findIndex(
                        (domain) =>
                          domain?.name ===
                          filteredDomains[selectedServiceIndex!]?.name
                      )
                }
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
              marginTop: "auto",
            }}
          >
            <AreaChart selectedServiceIndex={selectedServiceIndex} />
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
              setSearchInput={setSearchInput}
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
              setSelectedServiceIndex={setSelectedServiceIndex}
              setDomainsDownloadData={setDomainDownloadData}
              domainsDownloadData={domainDownloadData}
            />

            <AddressesTable
              refetchIpAddresses={reFetchAddresses}
              domainName={
                domains ? filteredDomains![selectedServiceIndex!]?.name : null
              }
              loading={loadingAddresses}
              addressesData={
                selectedServiceIndex !== null
                  ? filteredIpAddresses
                  : !isNaN(parseInt(searchInput))
                  ? filteredIps
                  : null
              }
              showData={
                isNaN(parseInt(searchInput))
                  ? selectedServiceIndex !== null
                  : true
              }
            />
          </Box>
        </Box>
      </Box>
      <ExportDocModal
        openModal={openExportModal}
        setOpenModal={setOpenExportModal}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        onExportClick={exportToExcel}
      />
    </>
  );
};

export default Dashboard;
