import { Box, Button, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import formatPersianDateTime from "../utils/formatPersianDateTime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import api from "../services";
import { Log } from "../services/logs";
import { useAuth } from "../contexts/authContext";

const Profile = () => {
  // const [historyData, setHistoryData] = useState(mockData);
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<Log[]>([]);

  const { isLogin } = useAuth();

  useEffect(() => {
    api.logs.getAllLogs().then((res) => {
      setLogs(res.logs);
    });
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex"
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "85%",
          overflowY: "auto",
          background: "#E9F1F4",
          paddingX: "8rem",
          paddingY: "5rem",
          marginBottom: "5rem",
          position: "relative"
        }}
      >
        <Button
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            color: "#00000088",
            display: "flex",
            gap: ".2rem",
            alignItems: "center"
          }}
          onClick={() => navigate(-1)}
        >
          <FaArrowRightLong />
          <Typography>بازگشت</Typography>
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "700",
              marginLeft: "auto"
            }}
          >
            سوابق فعالیت های کاربر
          </Typography>
          <Button
            onClick={() => {
              // Temporary solution
              // setHistoryData([]);
            }}
            sx={{
              color: "#DD2025"
            }}
          >
            پاک کردن همه
            <RxCross2 />
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: "2.5rem",
            marginBottom: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            justifyItems: "center",
            gap: "1rem"
          }}
        >
          <Typography>نام</Typography>
          <Typography>فعالیت</Typography>
          <Typography>توضیحات</Typography>
          {/* <Typography>وبسایت/سرویس</Typography> */}
          <Typography>زمان انجام</Typography>
        </Box>
        {logs.map(({ name, activity, description, id, timeDate }) => (
          <Box
            key={id}
            sx={{
              display: "grid",
              marginY: ".5rem",
              gridTemplateColumns: "repeat(4, 1fr)",
              justifyItems: "center",
              gap: "1rem",
              background: "#fff",
              paddingY: ".8rem"
            }}
          >
            <Typography>{name}</Typography>
            <Typography>{activity}</Typography>
            <Typography>{description}</Typography>
            <Typography>{formatPersianDateTime(new Date(timeDate))}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
