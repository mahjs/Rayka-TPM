import React, { FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography
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
import { Domain, IpWithProvider } from "../services/domain";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as domtoimage from "dom-to-image";
import api from "../services";

export interface DomainData {
  name: string;
  ips?: string[];
}
const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  // State to hold the search input
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<
    "All_IPs" | "CDN" | "Host"
  >("All_IPs");

  useEffect(() => {
    if (selectedFilter !== "All_IPs") {
      setSelectedServiceIndexs([]);
    }
  }, [selectedFilter]);

  // Function to handle the search action
  const handleSearch = () => {
    // You would implement your search logic here
    // For now, we'll just log the input to the console
    console.log(`Search for: ${searchInput}`);
  };
  const treeMapRef = useRef<HTMLElement | null>(null); // Function to handle submission of the search
  const dashboardRef = useRef<HTMLElement | null>(null); // Function to handle submission of the search
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  // State for Selecting a service & an address
  const [selectedServiceIndexs, setSelectedServiceIndexs] = useState<number[]>(
    []
  );

  const handleSelectedServiceIndex = (index: number) => {
    const findIndex = selectedServiceIndexs?.find(
      (searchingIndex) => searchingIndex === index
    );

    if (findIndex === index) {
      setSelectedServiceIndexs((pre) =>
        pre.filter((searchingIndex) => searchingIndex !== index)
      );
    } else {
      setSelectedServiceIndexs((pre) => [...pre, index]);
    }
  };
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAddress(null);
  }, [selectedServiceIndexs]);

  // State for SquareCharts
  const {
    loadingData,
    treeMapData,
    totalIps,
    refetch: refetchAllData
  } = useTreeMapData();

  const [filteredIps, setFilteredIps] = useState<string[]>(totalIps);

  useEffect(() => {
    if (totalIps.length === 0) return;
    setFilteredIps(totalIps);
  }, [totalIps]);

  useEffect(() => {
    if (isNaN(parseInt(searchInput)) || selectedServiceIndexs !== null) return;

    setFilteredIps(
      totalIps.filter((ip) =>
        ip.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, selectedServiceIndexs]);

  // State for getting all domains
  const {
    loadingDomains,
    domains,
    reFetchDomains: refetchDomainData
  } = useDomains();
  const [filteredDomains, setFilteredDomains] = useState<Domain[]>(
    domains || []
  );

  const refetchDomains = () => {
    refetchDomainData();
    setTimeout(() => {
      refetchAllData();
    }, 500);
  };

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
  const {
    ipAddressesForDomain,
    loadingAddresses: loadingAllAddresses,
    reFetchAddresses: reFetchAddressesData
  } = useIpAddresses(
    domains ? filteredDomains![selectedServiceIndexs![0]]?.name : null
  );
  const [filteredIpAddresses, setFilteredIpAddresses] = useState<string[]>([]);
  const [ipsWithProvider, setIpsWithProvider] = useState<IpWithProvider[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(false);

  const reFetchAddresses = () => {
    reFetchAddressesData();
    setTimeout(() => {
      refetchAllData();
    }, 500);
  };

  useEffect(() => {
    const updateAddressesData = (data: IpWithProvider[]) => {
      if (Array.isArray(data)) {
        const filterResults = data.filter((ipWithProvider) =>
          ipWithProvider.ip.startsWith("172.")
        );
        setFilteredIpAddresses(
          filterResults.map((ipWithProvider) => ipWithProvider.ip)
        );
        setIpsWithProvider(filterResults);
      } else {
        console.error(
          "Expected an array of IP address objects, but received:",
          data
        );
        setFilteredIpAddresses([]);
      }
    };

    if (selectedFilter === "All_IPs" && ipAddressesForDomain) {
      if (!ipAddressesForDomain) return;
      if (isNaN(parseInt(searchInput))) {
        setFilteredIpAddresses(ipAddressesForDomain);
        return;
      }
    } else if (selectedFilter === "CDN") {
      setLoadingAddresses(true);
      api.domain
        .getCDN()
        .then((response) => {
          // setFilteredIpAddresses(response);
          if (response && response.ips && Array.isArray(response.ips)) {
            updateAddressesData(response.ips);
          } else {
            console.error("No data in CDN response", response);
            setFilteredIpAddresses([]);
          }
          setLoadingAddresses(false);
        })
        .catch((error) => {
          console.error("Error fetching CDN data:", error);
          setLoadingAddresses(false);
        });
    } else if (selectedFilter === "Host") {
      setLoadingAddresses(true);
      api.domain
        .getNotCDN()
        .then((response) => {
          console.log("hot Response:", response);
          if (response && response.ips && Array.isArray(response.ips)) {
            updateAddressesData(response.ips);
          } else {
            console.error("No data in CDN response", response);
            setFilteredIpAddresses([]);
          }
          setLoadingAddresses(false);
        })
        .catch((error) => {
          console.error("Error fetching CDN data:", error);
          setLoadingAddresses(false);
        });
    }
  }, [searchInput, selectedFilter, ipAddressesForDomain]);
  // Scroll to selected service
  const dataRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    if (
      selectedServiceIndexs !== null &&
      dataRefs.current[selectedServiceIndexs[0]]
    ) {
      dataRefs.current[selectedServiceIndexs[0]].scrollIntoView({
        behavior: "smooth",
        block: "center"
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
    const domainExportData: { name: string; ips: string[] }[] = [];
    // Iterate over each domain to prepare its data
    domainDownloadData.forEach((domain) => {
      const domainIps: string[] =
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
      const ipData = domain.ips.map((ip: string) => ({ IP: ip }));
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

  const exportToPDF = () => {
    const doc = new jsPDF();

    const domainData = prepareDataForExport();
    let tableRows = domainData.map((domain) => {
      return [domain.name, domain.ips.length];
    });

    autoTable(doc, {
      startY: 20,
      head: [["Domain Name", "Number of IPs"]],
      body: tableRows,
      margin: { top: 10 },
      styles: {
        halign: "center",
        valign: "middle"
      },
      headStyles: {
        halign: "center",
        valign: "middle"
      },
      bodyStyles: {
        halign: "center",
        valign: "middle"
      }
    });

    domainData.forEach((domain, index) => {
      doc.addPage();
      doc.text(domain.name, 10, 10);
      autoTable(doc, {
        startY: 20,
        head: [["IP Address"]],
        body: domain.ips.map((ip) => [ip]),
        margin: { top: 10 }
      });
    });

    doc.save("Domains_and_IPs.pdf");
  };

  const onExportClick = () => {
    if (selectedFormat === "excel") {
      exportToExcel();
    } else if (selectedFormat === "pdf") {
      exportToPDF();
    } else if (selectedFormat === "csv") {
      dashboardScreenshot();
    }
  };
  const captureScreenshotTreeChart = () => {
    const treeMapElement = treeMapRef.current;
    if (treeMapElement) {
      domtoimage
        .toPng(treeMapElement, {
          style: {
            backgroundColor: "white"
          }
        })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = "tree-map-screenshot.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error: any) => {
          console.error("Error capturing screenshot", error);
        });
    }
  };

  const dashboardScreenshot = () => {
    const dashboardElement = dashboardRef.current;
    if (dashboardElement) {
      domtoimage
        .toPng(dashboardElement, {
          style: {
            backgroundColor: "white"
          }
        })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = "dashboard.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error: any) => {
          console.error("Error capturing screenshot", error);
        });
    }
  };
  const [isAllDataLoaded, setIsAllDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Assuming 'loadingData', 'loadingDomains', and 'loadingAddresses' are the states
    // that indicate if the respective data is still being fetched.
    // Update 'isDataLoaded' based on these loading states.
    if (!loadingData && !loadingDomains && !loadingAllAddresses) {
      setIsAllDataLoaded(true);
    }
  }, [loadingData, loadingDomains, loadingAllAddresses]);

  return (
    <>
      <Box
        ref={dashboardRef}
        component="main"
        sx={{
          padding: "2rem 1.5rem",
          display: "flex",
          gap: "1rem"
        }}
      >
        {/* Right side. Charts*/}
        <Box
          sx={{
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <ProfileInfo
            loading={loadingData || loadingDomains}
            totalAddresses={totalIps.length}
            totalDomains={domains?.length || 0}
          />
          <Box
            ref={treeMapRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "35vh",
              padding: "1rem"
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              {" "}
              <Typography
                fontFamily="YekanBakh-Medium"
                component="h2"
                sx={{
                  fontSize: "1.5rem"
                }}
              >
                سهم سرویس ها
              </Typography>
              {isAllDataLoaded ? (
                <Button
                  onClick={captureScreenshotTreeChart}
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
            </Stack>

            <Box
              sx={{
                border: "1px solid #707070",
                padding: ".2rem",
                height: "100%",
                position: "relative"
              }}
            >
              <TreeMap
                loadingData={loadingData}
                dataForTreeChart={
                  loadingData ? [{ name: "nothing", value: 100 }] : treeMapData
                }
                selectedServiceIndexs={
                  searchInput === null
                    ? selectedServiceIndexs
                    : domains?.reduce((indexes: number[], domain, index) => {
                        if (
                          selectedServiceIndexs.some(
                            (selectedIndex) =>
                              filteredDomains[selectedIndex]?.name ===
                              domain?.name
                          )
                        )
                          indexes.push(index);

                        return indexes;
                      }, [])
                }
                handleSelectedService={handleSelectedServiceIndex}
              />
              {loadingData && (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "48%",
                    transform: "translate(-50% -50%)"
                  }}
                />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
              marginTop: "auto"
            }}
          >
            <AreaChart isAllDataLoaded={isAllDataLoaded} />
          </Box>
        </Box>

        {/* Left side. Tables*/}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <Box
            sx={{
              height: "5dvh",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Search
              value={searchInput}
              setSearchInput={setSearchInput}
              handleSubmit={handleSubmit}
            />
            {isAllDataLoaded ? (
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
                    background: "#0F6CBD33"
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
            sx={{
              display: "flex",
              gap: "1.8rem"
            }}
          >
            {/* Services Table*/}
            <ServicesTable
              refetchDomains={refetchDomains}
              mapData={treeMapData}
              loadingMapData={loadingData}
              refetchIpAddresses={reFetchAddresses}
              loading={loadingDomains}
              domains={filteredDomains}
              selectedServiceIndexs={selectedServiceIndexs}
              handleSelectedServiceIndex={handleSelectedServiceIndex}
              setDomainsDownloadData={setDomainDownloadData}
            />

            <AddressesTable
              refetchIpAddresses={reFetchAddresses}
              domainName={
                domains && selectedServiceIndexs.length === 1
                  ? filteredDomains![selectedServiceIndexs[0]]?.name
                  : null
              }
              loading={loadingAllAddresses || loadingAddresses}
              addressesData={
                selectedServiceIndexs !== null
                  ? filteredIpAddresses
                  : !isNaN(parseInt(searchInput))
                  ? filteredIps
                  : filteredIpAddresses
              }
              showData={
                isNaN(parseInt(searchInput))
                  ? selectedServiceIndexs.length > 0 ||
                    selectedFilter !== "All_IPs"
                  : true
              }
              isWithProvider={selectedFilter !== "All_IPs"}
              ipsWithProvider={ipsWithProvider}
              showAddButton={selectedServiceIndexs !== null}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </Box>
        </Box>
      </Box>
      <ExportDocModal
        openModal={openExportModal}
        setOpenModal={setOpenExportModal}
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
        onExportClick={onExportClick}
      />
    </>
  );
};

export default Dashboard;
