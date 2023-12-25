import { Box, Stack, Typography, Button } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Box
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
          onClick={() => navigate("/")}
          sx={{
            textAlign: "right",
            cursor: "pointer",
          }}
        >
          <Typography fontSize="1.5rem" fontFamily="Tomorrow-SemiBold">
            TPM
          </Typography>
          <Typography fontFamily="Tomorrow-Light">Dashboard</Typography>
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
          <Button
            sx={{
              minWidth: "0",
            }}
          >
            <IoChevronDown
              color="gray"
              style={{ width: "25px", height: "25px" }}
            />
          </Button>
          <Button
            onClick={() => navigate("/profile")}
            sx={{
              minWidth: "0",
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
          </Button>
          <Typography
            fontFamily="YekanBakh-Medium"
            sx={{
              paddingRight: ".5rem",
            }}
          >
            {"احمد مهرانفر"}
          </Typography>
        </Box>
        {pathname === "/" && (
          <>
            <Box
              sx={{
                background: "#000",
                height: "60px",
                width: "1px",
              }}
            />
            <Button
              onClick={() => navigate("/profile")}
              sx={{
                fontFamily: "YekanBakh-Medium",
                color: "#000",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              <RiHistoryLine />
              فعالیت های کاربران
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProfileInfo;
