import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as domtoimage from "dom-to-image";
import { Modal, Box, Stack, Typography, Button, Checkbox, Input } from "@mui/material";
import { Blacklist } from "../../services/domain";
import Cross from "../../assets/images/cross.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  ipAddress: Blacklist[];
}

const ariaLabel = { 'aria-label': 'description' };

const BlackList: FC<Props> = ({ openModal, setOpenModal, ipAddress }) => {
  const chartRef = useRef(null);
  const [blacklistedDomains, setBlacklistedDomains] = useState<string[]>([]);
  const [selectedIps, setSelectedIps] = useState<Set<string>>(new Set());
  const [localIpAddress, setLocalIpAddress] = useState<Blacklist[]>([]);
  const [newIp, setNewIp] = useState<string>('');
  const [newDomain, setNewDomain] = useState<string>('');
  const [ipDomainMapping, setIpDomainMapping] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    axios.get("http://10.201.228.64:5000/blacklist")
      .then((response) => {
        if (response.data && response.data.blacklisted_domains) {
          setBlacklistedDomains(response.data.blacklisted_domains);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  const handleCheckboxChange = (ip: string) => {
    setSelectedIps((prevSelectedIps) => {
      const newSelectedIps = new Set(prevSelectedIps);
      if (newSelectedIps.has(ip)) {
        newSelectedIps.delete(ip);
      } else {
        newSelectedIps.add(ip);
      }
      return newSelectedIps;
    });
  };


  useEffect(() => {
    setLocalIpAddress(ipAddress);
  }, [ipAddress]);

  const handleDeleteSelectedIps = () => {
    const ipsToRemove: string[] = [];
    const domainsToRemove: string[] = [];
    selectedIps.forEach(ip => {
      ipsToRemove.push(ip);
      const domain = ipDomainMapping.get(ip);
      if (domain) {
        domainsToRemove.push(domain);
      }
    });

    removeFromDatabase(ipsToRemove, domainsToRemove);
    const newLocalIpAddress = localIpAddress.filter(ipInfo => !ipsToRemove.includes(ipInfo.ip_address));
    const newBlacklistedDomains = blacklistedDomains.filter(domain => !domainsToRemove.includes(domain));
    const newIpDomainMapping = new Map(ipDomainMapping);
    ipsToRemove.forEach(ip => newIpDomainMapping.delete(ip));
    setLocalIpAddress(newLocalIpAddress);
    setBlacklistedDomains(newBlacklistedDomains);
    setIpDomainMapping(newIpDomainMapping);
    setSelectedIps(new Set());
  };


  const handleAddIp = () => {
    if (newIp) {
      axios.post("http://10.201.228.64:5001/add", {
        ips: [newIp]
      }).then(response => {
        console.log("IP added successfully", response);
        setLocalIpAddress(prevIps => [...prevIps, { ip_address: newIp }]);
        setNewIp('');
      }).catch(error => {
        console.error("Error adding IP", error);
      });
    }
  };

  const handleAddDomain = () => {
    if (newDomain) {
      axios.post("http://10.201.228.64:5000/addblacklist", {
        domains: [{ name: newDomain }]
      }).then(response => {
        console.log("Domain added successfully", response);
        setBlacklistedDomains(prevDomains => [...prevDomains, newDomain]);
        setIpDomainMapping(prevMap => new Map(prevMap.set(newIp, newDomain)));
        setNewDomain('');
      }).catch(error => {
        console.error("Error adding Domain", error);
      });
    }
  };

  const removeFromDatabase = (ipsToRemove: string[], domainsToRemove: string[]) => {
    if (ipsToRemove.length > 0) {
      axios.post("http://10.201.228.64:5001/delete", { ips: ipsToRemove })
        .then(response => {
          console.log("IPs removed successfully", response);
        })
        .catch(error => {
          console.error("Error removing IPs", error);
        });
    }
    if (domainsToRemove.length > 0) {
      axios.post("http://10.201.228.64:5000/remblacklist", {
        domains: domainsToRemove.map(domain => ({ name: domain }))
      })
        .then(response => {
          console.log("Domains removed successfully", response);
        })
        .catch(error => {
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
            <Button
              onClick={handleDeleteSelectedIps}
              sx={{
                color: "red",
                fontFamily: "YekanBakh-Regular",
                display: selectedIps.size > 0 ? "flex" : "none",
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
            <img alt="cross" style={{ marginRight: "0.5em" }} width={18} height={18} src={Cross} />
          </Button>
        </Stack>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ my: 2 }}>
            <Input
              placeholder="آدرس های IP"
              inputProps={ariaLabel}
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              sx={{ ml: "6.5em" }}
            />
            <Button
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
          <Box sx={{ my: 2 }}>
            <Input
              placeholder="آدرس های دامنه"
              inputProps={ariaLabel}
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
            />
            <Button
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: 'space-between',
            gap: ".5rem",
            p: '0.5em'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Typography sx={{ fontFamily: "YekanBakh-Medium" }}>آدرس های IP</Typography>
            {localIpAddress.map((ipInfo, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Checkbox
                  checked={selectedIps.has(ipInfo.ip_address)}
                  onChange={() => handleCheckboxChange(ipInfo.ip_address)}
                  sx={{
                    padding: ".1rem",
                    background: "#fff",
                    borderRadius: ".2rem",
                    ":hover": {
                      background: "#fff"
                    }
                  }}
                />
                <Typography fontFamily="Tomorrow-Regular" fontSize="1rem" textAlign="right">
                  {ipInfo.ip_address}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontFamily: "YekanBakh-Medium", textAlign: "left" }}>آدرس های دامنه</Typography>
            {blacklistedDomains.map((domain, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Typography
                  textAlign="left"
                  fontFamily="Tomorrow-Regular" fontSize="1rem">
                  {domain}
                </Typography>
                <Checkbox
                  checked={selectedIps.has(domain)}
                  onChange={() => handleCheckboxChange(domain)}
                  sx={{
                    padding: ".1rem",
                    background: "#fff",
                    borderRadius: ".2rem",
                    ":hover": {
                      background: "#fff"
                    }
                  }}
                />
              </Box>
            ))}
          </Box>

        </Box>
      </Box>
    </Modal>
  );
};

export default BlackList;
