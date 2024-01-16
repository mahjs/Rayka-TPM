import { FC, useRef, useState } from "react";
import axios from "axios";
import * as domtoimage from "dom-to-image";
import {
  Modal,
  Box,
  Stack,
  Typography,
  Button,
  Checkbox,
  Input,
  Divider,
  CircularProgress
} from "@mui/material";
import Cross from "../../assets/images/cross.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import useBlackListDomains from "../../hooks/useBlackListDomains";
import useBlackListIps from "../../hooks/useBlackListIps";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ariaLabel = { "aria-label": "description" };

const BlackList: FC<Props> = ({ openModal, setOpenModal }) => {
  const chartRef = useRef(null);
  const [newIp, setNewIp] = useState<string>("");
  const [newDomain, setNewDomain] = useState<string>("");
  const [selectedIps, setSelectedIps] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const {
    blackListDomains,
    loading: loadingBlackListDomians,
    refetch: refetchBlackListDomains
  } = useBlackListDomains();

  const {
    blackListIps,
    loading: loadingBlackListIps,
    refetch: refetchBlackListIps
  } = useBlackListIps();

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

  const handleIpsCheckboxChange = (ip: string) => {
    const currentIp = selectedIps.find((searchingIp) => searchingIp === ip);
    console.log(currentIp);

    if (currentIp) {
      setSelectedIps((prevIps) =>
        prevIps.filter((searchingIp) => searchingIp !== ip)
      );
    } else {
      setSelectedIps((prevIps) => [...prevIps, ip]);
    }
  };
  const handleDomainsCheckboxChange = (domain: string) => {
    const currentDomain = selectedDomains.find(
      (searchingDomain) => searchingDomain === domain
    );
    if (currentDomain) {
      setSelectedDomains((prevDomains) =>
        prevDomains.filter((searchingIp) => searchingIp !== domain)
      );
    } else {
      setSelectedDomains((prevDomains) => [...prevDomains, domain]);
    }
  };

  const [loadingAddIp, setLoadingAddIp] = useState<boolean>(false);
  const handleAddIp = () => {
    if (newIp) {
      setLoadingAddIp(true);
      axios
        .post("http://10.201.228.64:5001/add", {
          ips: [newIp]
        })
        .then(() => {
          refetchBlackListIps();
          setNewIp("");
          setLoadingAddIp(false);
        })
        .catch((error) => {
          console.error("Error adding IP", error);
          setLoadingAddIp(false);
        });
    }
  };

  const [loadingAddDomain, setLoadingAddDomain] = useState<boolean>(false);
  const handleAddDomain = () => {
    if (newDomain) {
      setLoadingAddDomain(true);
      axios
        .post("http://10.201.228.64:5000/addblacklist", {
          domains: [{ name: newDomain }]
        })
        .then(() => {
          refetchBlackListDomains();
          setNewDomain("");
          setLoadingAddDomain(false);
        })
        .catch((error) => {
          setLoadingAddDomain(false);
          console.error("Error adding Domain", error);
        });
    }
  };

  const removeIpsFromDatabase = () => {
    if (selectedIps.length > 0) {
      axios
        .post("http://10.201.228.64:5001/delete", { ips: selectedIps })
        .then((response) => {
          refetchBlackListIps();
          setSelectedIps([]);
          console.log("IPs removed successfully", response);
        })
        .catch((error) => {
          console.error("Error removing IPs", error);
        });
    }
  };
  const removeDomainsFromDatabase = () => {
    if (selectedDomains.length > 0) {
      axios
        .post("http://10.201.228.64:5000/remblacklist", {
          domains: selectedDomains.map((domain) => ({ name: domain }))
        })
        .then((response) => {
          refetchBlackListDomains();
          setSelectedDomains([]);
          console.log("Domains removed successfully", response);
        })
        .catch((error) => {
          console.error("Error removing domains", error);
        });
    }
  };

  return (
    <Modal
      open={openModal}
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#ffffff" + 60,
        top: "0",
        left: "0",
        zIndex: "1000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none"
      }}
      ref={chartRef}
    >
      <Box
        sx={{
          border: "1px solid #97B5CE",
          background: "#fff",
          borderRadius: "1.5rem",
          width: "450px",
          height: "40rem",
          paddingY: "1rem",
          paddingX: "1rem",
          overflowY: "scroll"
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1em"
        >
          <Box sx={{ display: "flex", alignItems: "end", gap: "0.5em" }}>
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
                mt: "1em",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              دریافت خروجی
            </Button>
          </Box>
          <Button
            onClick={() => setOpenModal(false)}
            sx={{
              color: "#000",
              fontFamily: "YekanBakh-Medium",
              fontSize: "1.1rem",
              mt: "0.6em"
            }}
          >
            بستن پنجره
            <img
              alt="cross"
              style={{ marginRight: "0.5em" }}
              width={18}
              height={18}
              src={Cross}
            />
          </Button>
        </Stack>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{ my: 2 }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddIp();
            }}
          >
            <Input
              placeholder="آدرس جدید"
              inputProps={ariaLabel}
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              sx={{ ml: "6.5em" }}
            />
            <Button
              disabled={loadingAddIp}
              onClick={handleAddIp}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
                background: "#0F6CBD",
                color: "#fff",
                fontFamily: "YekanBakh-Regular",
                borderRadius: ".5rem",
                py: "0.2em",
                mt: "1em",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              <GoPlus style={{ width: "20px", height: "20px" }} />
              افزودن
            </Button>
          </Box>
          <Box
            sx={{ my: 2 }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddDomain();
            }}
          >
            <Input
              placeholder="دامنه جدید"
              inputProps={ariaLabel}
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            <Button
              disabled={loadingAddDomain}
              onClick={handleAddDomain}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
                background: "#0F6CBD",
                color: "#fff",
                fontFamily: "YekanBakh-Regular",
                borderRadius: ".5rem",
                py: "0.2em",
                mt: "1em",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              <GoPlus style={{ width: "20px", height: "20px" }} />
              افزودن
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5rem",
            p: "0.5em"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
            <Stack direction="row" alignItems="center" height="2rem">
              <Typography sx={{ fontFamily: "YekanBakh-Medium" }}>
                آدرس های IP
              </Typography>
              <Button
                onClick={removeIpsFromDatabase}
                sx={{
                  color: "red",
                  fontFamily: "YekanBakh-Regular",
                  display: selectedIps.length > 0 ? "flex" : "none",
                  alignItems: "center",
                  gap: ".1rem"
                }}
              >
                <RiDeleteBin6Line
                  style={{
                    width: "15px",
                    height: "15px",
                    color: "red"
                  }}
                />
                حذف
              </Button>
            </Stack>
            <Divider />
            {blackListIps.map((ipInfo, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
              >
                <Checkbox
                  checked={
                    selectedIps.filter((ip) => ip === ipInfo.ip_address)
                      .length > 0
                  }
                  onChange={() => handleIpsCheckboxChange(ipInfo.ip_address)}
                  sx={{
                    padding: ".1rem",
                    background: "#fff",
                    borderRadius: ".2rem",
                    ":hover": {
                      background: "#fff"
                    }
                  }}
                />
                <Typography
                  fontFamily="Tomorrow-Regular"
                  fontSize="1rem"
                  textAlign="right"
                >
                  {ipInfo.ip_address}
                </Typography>
              </Box>
            ))}
            {loadingBlackListIps && (
              <CircularProgress
                sx={{
                  marginX: "auto"
                }}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Stack direction="row" alignItems="center" height="2rem">
              <Typography
                sx={{ fontFamily: "YekanBakh-Medium", textAlign: "right" }}
              >
                آدرس های دامنه
              </Typography>
              <Button
                onClick={removeDomainsFromDatabase}
                sx={{
                  color: "red",
                  fontFamily: "YekanBakh-Regular",
                  display: selectedDomains.length > 0 ? "flex" : "none",
                  alignItems: "center",
                  gap: ".1rem"
                }}
              >
                <RiDeleteBin6Line
                  style={{
                    width: "15px",
                    height: "15px",
                    color: "red"
                  }}
                />
                حذف
              </Button>
            </Stack>
            <Divider />
            {blackListDomains.map((domain, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}
              >
                <Checkbox
                  checked={
                    selectedDomains.filter(
                      (searchingDomain) => searchingDomain === domain
                    ).length > 0
                  }
                  onChange={() => handleDomainsCheckboxChange(domain)}
                  sx={{
                    padding: ".1rem",
                    background: "#fff",
                    borderRadius: ".2rem",
                    ":hover": {
                      background: "#fff"
                    }
                  }}
                />
                <Typography
                  textAlign="left"
                  fontFamily="Tomorrow-Regular"
                  fontSize="1rem"
                >
                  {domain}
                </Typography>
              </Box>
            ))}
            {loadingBlackListDomians && (
              <CircularProgress
                sx={{
                  marginX: "auto"
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BlackList;
