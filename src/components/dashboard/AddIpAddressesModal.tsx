import {
  Modal,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import api from "../../services";
import convertToPersianWordNumber from "../../utils/convertToPersianWordNumber";
import Input from "../login/Input";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchIpAddresses: () => void;
  domainName: string | null;
}

const AddIpAddressesModal: FC<Props> = ({
  openModal,
  setOpenModal,
  refetchIpAddresses,
  domainName,
}) => {
  const [ipAddressCountForAdding, setIpAddressCountForAdding] = useState(1);
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);
  const [bulkIpInput, setBulkIpInput] = useState("");

  // const parseBulkInput = () => {
  //   const parsedIps = bulkIpInput.split(/,|\n/).map(ip => ip.trim());
  //   setIpAddresses(prev => [...prev, ...parsedIps.filter(ip => ip)]);
  //   setBulkIpInput("");
  // };

  const isValidIp = (ip: string) => {
    const ipPattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  };

  const handleSubmit = () => {
    const parsedIps = bulkIpInput.split(/,|\n/).map(ip => ip.trim());
    setIpAddresses(prev => [...prev, ...parsedIps.filter(ip => ip)]);
    setBulkIpInput("");
    console.log(ipAddresses);
    if (
      ipAddresses.length === 0 ||
      ipAddresses.some((ip) => ip.length === 0 || !isValidIp(ip)) ||
      !domainName
    ) {
      toast.error("Please enter a valid IP address and domain name.");
      return;
    }

    api.domain
      .addIpAddressesToDomain(domainName, ipAddresses)
      .then(() => {
        refetchIpAddresses();
        setOpenModal(false);
        setIpAddresses([]);
        toast.success("IP address added successfully.");
      })
      .catch((error) => {
        toast.error(`Error adding IP address: ${error.message}`);
      });
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
      }}
    >
      <>
        <ToastContainer position="top-center"/>
        <Box
          sx={{
            border: "1px solid #97B5CE",
            background: "#fff",
            borderRadius: "1.5rem",
            width: "300px",
            paddingY: "1rem",
            paddingX: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              marginBottom: "1rem",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "900",
                }}
              >
                افزودن سرویس
              </Typography>
              <Button
                onClick={() => {
                  setIpAddressCountForAdding(1);
                  setBulkIpInput("");
                  setOpenModal(false);
                }}
                sx={{
                  color: "#000",
                }}
              >
                بستن پنجره
                <RxCross2 style={{ marginTop: "-.2rem " }} />
              </Button>
            </Stack>
          </Box>
          <Box>
            <TextField
              label="افزودن IP به صورت گروهی"
              multiline
              rows={4}
              value={bulkIpInput}
              onChange={(e) => setBulkIpInput(e.target.value)}
              placeholder="Enter IP addresses separated by commas or new lines"
              fullWidth
            />
            {/* <Button onClick={parseBulkInput}>افزودن</Button> */}
          </Box>
          <Box
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {Array(ipAddressCountForAdding)
              .fill(null)
              .map((_, index) => (
                <Input
                  value={ipAddresses[index]}
                  onChange={(value) => {
                    if (isValidIp(value)) {
                      setIpAddresses((prev) => {
                        const newIpAddresses = [...prev];
                        newIpAddresses[index] = value;
                        return newIpAddresses;
                      });
                    }
                  }}
                  key={index}
                  name="domain_name"
                  title={
                    "آدرس IP " +
                    convertToPersianWordNumber(ipAddressCountForAdding)
                  }
                />
              ))}
            <Button
              sx={{
                marginLeft: "auto",
              }}
              onClick={() => setIpAddressCountForAdding((prev) => (prev += 1))}
            >
              <GoPlus />
              افزودن آدرس IP بیشتر
            </Button>
            <Button
              type="submit"
              sx={{
                background: "#0F6CBD",
                color: "#fff",
                borderRadius: ".5rem",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff",
                },
              }}
            >
              افزودن
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AddIpAddressesModal;
