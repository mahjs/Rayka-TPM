import { Box, Button } from "@mui/material";
import { FC } from "react";
import { GoSearch } from "react-icons/go";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<Props> = ({ handleSubmit, value, onChange }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minWidth: "250px",
        maxHeight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #D1D1D1",
        borderBottomColor: "black",
        borderRadius: "5px",
      }}
    >
      <Button
        type="submit"
        sx={{
          padding: ".5rem",
          position: "absolute",
          left: "-1rem",
        }}
      >
        <GoSearch
          style={{
            height: "23px",
            width: "25px",
            color: "black",
          }}
        />
      </Button>
      <Box
        component="input"
        type="search"
        placeholder="جست و جو سرویس یا IP"
        value={value}
        onChange={onChange}
        sx={{
          fontFamily: "YekanBakh-Thin",
          padding: ".5rem",
          ":focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );
};

export default Search;
