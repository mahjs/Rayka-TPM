import {
  Modal,
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FC, useEffect, useState } from "react";
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
  const [domainAddress, setDomainAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (
      !domainName ||
      domainName.length === 0 ||
      !domainAddress ||
      domainAddress.length === 0
    )
      return;

    const addedDomainName = domainName + ".com";
    setLoading(true);
    api.domain.addDomain([domainName]).then(() => {
      axios
        .post("http://10.201.228.64:5000/get_ipv4", {
          domains: [
            {
              name: domainAddress
            }
          ]
        })
        .then((res) => {
          api.domain
            .addIpAddressesToDomain(domainName, res.data[addedDomainName])
            .then(() => {
              refetchIpAddresses();
              setDomainName("");
              setDomainAddress("");
              setLoading(false);
              setTimeout(() => {
                refetchDomains();
                setOpenModal(false);
              }, 300);
            });
        });
      return;
    });
  };
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (loading) {
        const message =
          "آی پی ها هنوز به طور کامل در سایت اضافه نشده. از انتخاب خود مطمئن هستید؟";
        e.preventDefault(); // Cancel the event as stated by the standard.
        e.returnValue = message; // Chrome requires returnValue to be set.
        return message;
      }
    };

    if (loading) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading]);
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
          <Input
            value={domainAddress}
            onChange={(value) => setDomainAddress(value)}
            name="domain_name"
            title="آدرس وبسایت"
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
            {loading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "افزودن"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddDomainModal;
