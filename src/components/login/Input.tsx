import { Box, Typography, Input as MuiInput } from "@mui/material";
import { FC } from "react";

interface Props {
  name: string;
  onChange: (newValue: string) => void;
  value: string;
  title: string;
  type?: string;
  sx?: any;
}

const Input: FC<Props> = ({
  onChange,
  sx,
  value,
  title,
  name,
  type = "text",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontWeight="700" fontSize="1rem">
        {title}
      </Typography>
      <MuiInput
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          paddingX: ".5rem",
          borderRadius: ".3rem",
          outline: "none",
          border: "1px solid #D1D1D1",
          borderBottomWidth: "1px",
          borderBottomColor: "gray",
          ...sx,
        }}
      />
    </Box>
  );
};

export default Input;
