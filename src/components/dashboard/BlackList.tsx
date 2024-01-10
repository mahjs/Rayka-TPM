import { FC } from "react";
import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import CheckBoxRow from "./CheckBoxRow";
import ExcelIcon from "../../assets/images/excel.svg";
import Png from "../../assets/images/png.svg";
import Cross from "../../assets/images/cross.svg";
import PDFIcon from "../../assets/images/pdf.svg";
import { Blacklist } from "../../services/domain";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  ipAddress: Blacklist[];
}

const BlackList: FC<Props> = ({ openModal, setOpenModal, ipAddress }) => {
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
          width: "400px",
          paddingY: "1rem",
          paddingX: "2rem"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem"
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontFamily="Tomorrow-SemiBold" fontSize="1rem">
              دریافت خروجی
            </Typography>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{
                color: "#000",
                fontFamily: "Tomorrow-SemiBold",
                fontSize: "1rem"
              }}
            >
              بستن پنجره
              <img alt="cross" src={Cross} />
            </Button>
          </Stack>
          {ipAddress?.map((item, index) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Box
                  display="flex"
                  flexDirection="row-reverse"
                  justifyContent="space-between"
                >
                  <Typography fontFamily="Tomorrow-SemiBold" fontSize="1rem">
                    :ip_address{" "}
                  </Typography>

                  <Typography
                    fontFamily="Tomorrow-SemiBold"
                    fontSize="1rem"
                    key={index}
                  >
                    {item.ip_address}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  );
};

export default BlackList;
