import {
  Modal,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress
} from "@mui/material";
import React, { FC, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import api from "../../services";
import axios from "axios";

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
  domainName
}) => {
  const [bulkIpInput, setBulkIpInput] = useState("");

  const isValidIp = (ip: string) => {
    const ipPattern =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ip);
  };

  const [addLoading, setAddLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    // const parsedIps = bulkIpInput.split(/,|\n/).map((ip) => ip.trim());
    const parsedIps = fileContent
      .split(/,|\n/)
      .map((ip) => ip.trim())
      .filter(isValidIp);

    // Clear the input field
    setBulkIpInput("");
    if (
      parsedIps.length === 0 ||
      parsedIps.some((ip) => ip.length === 0 || !isValidIp(ip)) ||
      !domainName
    ) {
      toast.error("Please enter a valid IP address and domain name.");
      return;
    }

    // Prepare the payload
    const payload = {
      ips: parsedIps.filter(isValidIp)
    };
    setAddLoading(true);
    // Send the valid IPs to the server
    axios
      .post("http://10.201.228.64:7000/get-ip", payload)
      .then(() => {
        // Proceed with adding IP addresses to the domain
        api.domain
          .addIpAddressesToDomain(domainName, parsedIps)
          .then(() => {
            refetchIpAddresses();
            setOpenModal(false);
            toast.success("IP address added successfully.");
            setAddLoading(false);
            setFile(null);
          })
          .catch((error) => {
            toast.error(`Error adding IP address: ${error.message}`);
            setAddLoading(false);
            setFile(null);
          });
      })
      .catch((error) => {
        console.error("Error sending IPs to server:", error);
        toast.error("Failed to send IPs to the server.");
        // Decide whether to proceed with adding the IPs to the domain
        // if the server call is critical, you might want to stop the process here
      });
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && (file.name.endsWith(".csv") || file.name.endsWith(".txt"))) {
      setFile(file);
      readFile(file);
    } else {
      toast.error("لطفاً یک فایل csv. یا .txt را انتخاب کنید.");
      setFile(null);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        setFileContent(content);
      }
    };
    reader.readAsText(file);
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
        alignItems: "center"
      }}
    >
      <>
        <ToastContainer position="top-center" />
        <Box
          sx={{
            border: "1px solid #97B5CE",
            background: "#fff",
            borderRadius: "1.5rem",
            width: "300px",
            paddingY: "1rem",
            paddingX: "2rem"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              marginBottom: "1rem"
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
                  fontWeight: "900"
                }}
              >
                افزودن آدرس
              </Typography>
              <Button
                onClick={() => {
                  setBulkIpInput("");
                  setOpenModal(false);
                }}
                sx={{
                  color: "#000"
                }}
              >
                بستن پنجره
                <RxCross2 style={{ marginTop: "-.2rem " }} />
              </Button>
            </Stack>
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
              gap: "1rem"
            }}
          >
            <TextField
              label="افزودن IP به صورت گروهی"
              multiline
              rows={4}
              value={bulkIpInput}
              onChange={(e) => setBulkIpInput(e.target.value)}
              placeholder="Enter IP addresses separated by commas or new lines"
              fullWidth
            />
            <Button
              component="label"
              sx={{
                background: "#0F6CBD",
                color: "#fff",
                borderRadius: ".5rem",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              انتخاب فایل
              <input
                type="file"
                accept=".csv, .txt"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {file && <Typography>{file.name}</Typography>}
            <Button
              disabled={addLoading}
              type="submit"
              sx={{
                background: "#0F6CBD",
                color: "#fff",
                borderRadius: ".5rem",
                ":hover": {
                  background: "#0F6CBD",
                  color: "#fff"
                }
              }}
            >
              {addLoading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "افزودن"
              )}
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AddIpAddressesModal;
