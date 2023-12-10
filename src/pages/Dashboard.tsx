import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

import { Box, Stack, Typography } from "@mui/material";
import Search from "../components/dashboard/Search";

const Dashboard: React.FC = () => {
  // State to hold the search input
  const [searchInput, setSearchInput] = useState("");

  // Function to handle the search action
  const handleSearch = () => {
    // You would implement your search logic here
    // For now, we'll just log the input to the console
    console.log(`Search for: ${searchInput}`);
  };

  // Function to handle changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Function to handle submission of the search
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };
  return (
    <Box
      component="main"
      sx={{
        padding: "2rem 1.5rem",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Stack
            sx={{
              textAlign: "right",
            }}
          >
            <Typography fontWeight="bold" fontSize="1.5rem">
              TPM
            </Typography>
            <Typography fontWeight="300">Dashboard</Typography>
          </Stack>

          <Box
            sx={{
              background: "#000",
              height: "60px",
              width: "1px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".2rem",
            }}
          >
            <button>
              <IoChevronDown color="gray" />
            </button>
            <button
              style={{
                width: "50px",
                height: "50px",
                background: "#E6E6E6",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsPerson
                style={{
                  width: "23px",
                  height: "23px",
                  color: "gray",
                }}
              />
            </button>
            <Typography
              sx={{
                paddingRight: ".5rem",
              }}
            >
              {"احمد مهرانفر"}
            </Typography>
          </Box>
        </Box>
        <Search
          value={searchInput}
          onChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <Box
          sx={{
            display: "flex",
            height: "40px",
            background: "#0F6CBD",
            overflow: "hidden",
            alignItems: "center",
            padding: ".5rem",
            gap: ".5rem",
            borderRadius: ".5rem",
          }}
        >
          <button>
            <IoChevronDown color="#fff" />
          </button>
          <Box
            sx={{
              height: "200%",
              background: "#fff",
              width: "2px",
            }}
          />
          <Typography
            sx={{
              color: "#fff",
              paddingRight: ".5rem",
            }}
          >
            دریافت خروجی
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
