import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import convertToPersianWordNumber from "../../utils/convertToPersianWordNumber";
import { FC, useState } from "react";
import api from "../../services";
import Input from "../login/Input";

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
  refetchIpAddresses,
}) => {
  const [ipAddressCountForAdding, setIpAddressCountForAdding] =
    useState<number>(1);

  const [domainName, setDomainName] = useState<string>("");
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!domainName || domainName.length === 0) return;
    api.domain.addDomain([domainName]).then(() => {
      refetchDomains();
      if (ipAddresses.length === 0) {
        setOpenModal(false);
        setDomainName("");
        return;
      }
      api.domain.addIpAddressesToDomain(domainName, ipAddresses).then(() => {
        refetchIpAddresses();
        setOpenModal(false);
        setDomainName("");
        setIpAddresses([]);
        setIpAddressCountForAdding(1);
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
        alignItems: "center",
      }}
    >
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
          <Input
            value={domainName}
            onChange={(value) => setDomainName(value)}
            name="domain_name"
            title="آدرس وبسایت"
          />
          {Array(ipAddressCountForAdding)
            .fill(null)
            .map((_, index) => (
              <Input
                value={ipAddresses[index]}
                onChange={(value) =>
                  setIpAddresses((prev) => {
                    const newIpAddresses = [...prev];
                    newIpAddresses[index] = value;
                    return newIpAddresses;
                  })
                }
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
    </Modal>
  );
};

export default AddDomainModal;
