import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { RiHistoryLine } from "react-icons/ri";
import { FC } from "react";
import Icon from "../../assets/images/icon.svg";

interface Props {
  totalDomains?: number;
  totalAddresses?: number;
  loading?: boolean;
  isDashboard?: boolean;
}

const ProfileInfo: FC<Props> = ({
  totalAddresses,
  totalDomains,
  loading,
  isDashboard = true,
}) => {
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
          <img
            src={Icon}
            style={{
              width: "120px",
              height: "30px",
            }}
          />
          <Typography
            fontFamily="Tomorrow-Light"
            sx={{
              letterSpacing: ".15rem",
              fontSize: "1.2rem",
              opacity: ".6",
            }}
          >
            Dashboard
          </Typography>
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
      {isDashboard && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack direction="row" gap=".5rem" justifyContent="space-between">
            <Typography whiteSpace="nowrap">تعداد دامین‌ها:</Typography>
            <Typography
              sx={{
                width: "2rem",
                textAlign: "left",
              }}
            >
              {loading ? (
                <CircularProgress size="1rem" />
              ) : (
                totalDomains!.toLocaleString()
              )}
            </Typography>
          </Stack>
          <Divider
            sx={{
              marginBottom: ".3rem",
            }}
          />
          <Stack direction="row" gap=".5rem" justifyContent="space-between">
            <Typography whiteSpace="nowrap">تعداد آدرس‌ها:</Typography>
            <Typography
              sx={{
                width: "2rem",
                textAlign: "left",
              }}
            >
              {loading ? (
                <CircularProgress size="1rem" />
              ) : (
                totalAddresses!.toLocaleString()
              )}
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ProfileInfo;
