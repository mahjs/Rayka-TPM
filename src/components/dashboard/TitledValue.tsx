import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  value: number;
  title: string;
  color: string;
}

const TitledValue: FC<Props> = ({ value, title, color }) => {
  return (
    <Stack direction="row" gap=".2rem">
      <Typography color={color}>{value}</Typography>
      <Typography>:{title}</Typography>
    </Stack>
  );
};

export default TitledValue;
