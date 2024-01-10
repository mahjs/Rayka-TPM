import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FC, useState } from "react";
import api from "../../services";
import Input from "../login/Input";
import axios from "axios";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetchDomains: () => void;
  refetchIpAddresses: () => void;
}

const AddDomainModal: FC<Props> = ({
  openModal,
  setOpenModal,
  refetchDomains,
  refetchIpAddresses
}) => {
  const [domainName, setDomainName] = useState<string>("");

  const handleSubmit = () => {
    if (!domainName || domainName.length === 0) return;
    api.domain.addDomain([domainName]).then(() => {
      refetchDomains();
      setOpenModal(false);
      setDomainName("");
      return;
    });

    const addedDomainName = domainName + ".com";
    axios
      .post("http://10.201.228.64:5000/get_ipv4", {
        domains: [
          {
            name: domainName + ".com"
          }
        ]
      })
      .then((res) => {
        api.domain
          .addIpAddressesToDomain(domainName, res.data[addedDomainName])
          .then(() => {
            refetchIpAddresses();
            refetchDomains();
            setOpenModal(false);
            setDomainName("");
          });
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
        alignItems: "center"
      }}
    >
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
              افزودن سرویس
            </Typography>
            <Button
              onClick={() => {
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
          <Input
            value={domainName}
            onChange={(value) => setDomainName(value)}
            name="domain_name"
            title="نام وبسایت"
          />
          <Button
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
            افزودن
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddDomainModal;
