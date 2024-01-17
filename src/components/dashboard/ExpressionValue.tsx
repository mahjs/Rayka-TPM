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
        width: "9rem",
        marginRight: "1.8rem",
        fontFamily: "YekanBakh-Regular",
      }}
    >
      <Typography
        sx={{
          position: "relative",
          fontFamily: "YekanBakh-Regular",
          "&::after": {
            content: unit ? `"${unit}"` : '""',
            position: "absolute",
            bottom: ".5rem",
            right: "0",
            fontSize: ".65rem",
            opacity: ".5",
          },
        }}
      >
        {(value * (Math.random() + 0.3)).toFixed(0)}
      </Typography>
      <Stack
        sx={{
          marginLeft: "auto",
        }}
      >
        <Typography
          sx={{
            fontFamily: "YekanBakh-Regular",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            opacity: ".5",
            fontSize: ".6rem",
          }}
        >
          {expression}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ExpressionValue;
