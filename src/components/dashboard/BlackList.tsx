import { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import * as domtoimage from "dom-to-image";
import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { Blacklist } from "../../services/domain";
import Cross from "../../assets/images/cross.svg";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  ipAddress: Blacklist[];
}

const BlackList: FC<Props> = ({ openModal, setOpenModal, ipAddress }) => {
  const chartRef = useRef(null);
  const [blacklistedDomains, setBlacklistedDomains] = useState<string[]>([]);

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
          width: "400px",
          paddingY: "1rem",
          paddingX: "1rem"
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1em"
        >
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", mx: "0.6em" }}>
          <Typography sx={{ fontFamily: "YekanBakh-Medium" }}>آدرس های IP</Typography>
          <Typography sx={{ fontFamily: "YekanBakh-Medium" }}>آدرس های دامنه</Typography>
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
          <Box>
            {ipAddress?.map((item, index) => {
              return (
                <Typography
                  fontFamily="Tomorrow-Regular"
                  fontSize="1rem"
                  textAlign="right"
                  key={index}
                >
                  {item.ip_address}
                </Typography>
              );
            })}
          </Box>
          <Box>
            {blacklistedDomains.map((domain, index) => (
              <Typography key={index}
                textAlign="left"
                fontFamily="Tomorrow-Regular" fontSize="1rem">
                {domain}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BlackList;
