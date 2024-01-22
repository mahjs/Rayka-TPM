import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  title: string;
  expression: string;
  value: number;
  unit?: string;
}

const ExpressionValue: FC<Props> = ({ title, expression, value, unit }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
        width: "13rem",
        marginRight: "1.8rem",
        fontFamily: "YekanBakh-Regular"
      }}
    >
      <Typography
        sx={{
          position: "relative",
          fontFamily: "YekanBakh-Regular",
          fontWeight: "700",
          fontSize: "1.1rem",
          "&::after": {
            content: unit ? `"${unit}"` : '""',
            position: "absolute",
            bottom: "-0.1rem",
            right: "0",
            fontSize: ".9rem",
            opacity: ".8"
          }
        }}
      >
        {(value * (Math.random() + 0.3)).toFixed(0)}
      </Typography>
      <Stack
        sx={{
          marginLeft: "auto"
        }}
      >
        <Typography
          sx={{
            fontFamily: "YekanBakh-Regular",
            fontSize: "1.1rem",
            fontWeight: "800"
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            opacity: ".8",
            fontSize: ".8rem",
            fontWeight: "700"
          }}
        >
          {expression}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ExpressionValue;
