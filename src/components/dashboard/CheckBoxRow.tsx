import { Box, Typography, Checkbox } from "@mui/material";
import { FC } from "react";
import { SetStateAction } from "react";

interface Props {
  selectedFormat: string;
  setSelectedFormat: (value: SetStateAction<string>) => void;
  icon: string;
  format: string;
  name: string;
}

const CheckBoxRow: FC<Props> = ({
  selectedFormat,
  setSelectedFormat,
  icon,
  format,
  name,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        borderRadius: ".9rem",
        border: "1px solid rgba(94, 129, 159, 0.40)",
        padding: ".5rem",
      }}
    >
      <img src={icon} alt="pdfLogo" style={{ width: "45px", height: "45px" }} />
      <Typography>
        {name} ({format}.){" "}
      </Typography>
      <Checkbox
        checked={selectedFormat === format}
        onChange={() => setSelectedFormat(format)}
        sx={{
          marginRight: "auto",
          "& .MuiSvgIcon-root": {
            fontSize: "2rem",
          },
        }}
      />
    </Box>
  );
};

export default CheckBoxRow;
