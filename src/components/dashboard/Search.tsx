import { Box, Button, Input } from "@mui/material";
import { FC } from "react";
import { GoSearch } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

interface Props {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

const Search: FC<Props> = ({ setSearchInput, value, handleSubmit }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchInput(e.target.value);
  };

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
      <Input
        type="text"
        placeholder="جستجوی سرویس یا IP"
        value={value}
        onChange={handleChange}
        sx={{
          fontFamily: "YekanBakh-Thin",
          padding: ".5rem",
          border: "none",
        }}
      />
      {value && (
        <RxCross2
          onClick={() => setSearchInput("")}
          style={{
            position: "absolute",
            left: "20%",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
          }}
        />
      )}
    </Box>
  );
};

export default Search;
