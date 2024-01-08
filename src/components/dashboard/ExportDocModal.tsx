import { FC } from "react";
import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import CheckBoxRow from "./CheckBoxRow";
import ExcelIcon from "../../assets/images/excel.svg";
import CSVIcon from "../../assets/images/csv.svg";
import Cross from "../../assets/images/cross.svg";
import PDFIcon from "../../assets/images/pdf.svg";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFormat: string;
  setSelectedFormat: React.Dispatch<React.SetStateAction<string>>;
  onExportClick: () => void;
}

const ExportDocModal: FC<Props> = ({
  openModal,
  setOpenModal,
  selectedFormat,
  setSelectedFormat,
  onExportClick,
}) => {
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
          width: "400px",
          paddingY: "1rem",
          paddingX: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>دریافت خروجی</Typography>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{
                color: "#000",
              }}
            >
              بستن پنجره
              <img src={Cross} />
            </Button>
          </Stack>
          <CheckBoxRow
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            icon={PDFIcon}
            format="pdf"
            name="پی دی اف"
          />
          <CheckBoxRow
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            icon={ExcelIcon}
            format="excel"
            name="اکسل"
          />
          <CheckBoxRow
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            icon={CSVIcon}
            format="csv"
            name="سی اس وی"
          />
          <Button
            onClick={() => onExportClick()}
            sx={{
              fontFamily: "YekanBakh-Bold",
              color: "#fff",
              paddingRight: ".5rem",
              display: "flex",
              background: "#0F6CBD",
              alignItems: "center",
              padding: ".5rem",
              gap: ".5rem",
              borderRadius: ".5rem",
              zIndex: "5",
              ":hover": {
                color: "#0F6CBD",
                background: "#0F6CBD33",
              },
            }}
          >
            دریافت خروجی
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ExportDocModal;
