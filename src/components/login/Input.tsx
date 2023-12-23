import { Box, Typography, Input as MuiInput } from "@mui/material";
import { FC } from "react";

interface Props {
  name: string;
  onChange: (newValue: string) => void;
  value: string;
  title: string;
  type?: string;
}

const Input: FC<Props> = ({ onChange, value, title, name, type = "text" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontWeight="700" fontSize="1.2rem">
        {title}
      </Typography>
      <MuiInput
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          borderRadius: ".3rem",
          outline: "none",
          border: "1px solid #D1D1D1",
          borderBottomWidth: "1px",
          borderBottomColor: "gray",
        }}
      />
    </Box>
  );
};

export default Input;
