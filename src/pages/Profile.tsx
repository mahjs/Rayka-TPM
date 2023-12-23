import { Box, Button, Typography } from "@mui/material";
import ProfileInfoHeader from "../components/profile/ProfileInfoHeader";
import { GoArrowRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import Input from "../components/login/Input";
import formatPersianDateTime from "../utils/formatPersianDateTime";
import { useState } from "react";

const mockData = [
  {
    id: 1,
    title: "ویرایش",
    site: "spotify.com",
    date: new Date(),
  },
  {
    id: 2,
    title: "افزودن",
    site: "google.com",
    date: new Date(),
  },
  {
    id: 3,
    title: "حذف کردن",
    site: "wix.com",
    date: new Date(),
  },
  {
    id: 4,
    title: "بررسی",
    site: "amazon.com",
    date: new Date(),
  },
];

const Profile = () => {
  const [historyData, setHistoryData] = useState(mockData);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          width: "30%",
          height: "100%",
        }}
      >
        <ProfileInfoHeader />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            width: "60%",
            height: "70%",
            margin: "auto",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: "1.8rem",
              fontWeight: "700",
            }}
          >
            اطلاعات کاربر
          </Typography>
          <Input
            title="نام کاربری"
            name="username"
            value="username"
            sx={{
              direction: "ltr",
            }}
            onChange={() => {}}
          />
          <Input title="ایمیل" name="email" value="" onChange={() => {}} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Input title="نام" name="username" value="" onChange={() => {}} />
            <Input
              title="نام خانوادگی"
              name="username"
              value=""
              onChange={() => {}}
            />
          </Box>
          <Button
            sx={{
              color: "#DD2025",
              marginLeft: "auto",
              display: "flex",
              gap: ".5rem",
            }}
          >
            <GoArrowRight
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            خروج از حساب کاربری
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "70%",
          height: "85%",
          overflowY: "auto",
          background: "#E9F1F4",
          paddingX: "8rem",
          paddingY: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "700",
            }}
          >
            سوابق فعالیت های کاربر
          </Typography>
          <Button
            onClick={() => {
              // Temporary solution
              setHistoryData([]);
            }}
            sx={{
              color: "#DD2025",
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
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyItems: "center",
            gap: "1rem",
          }}
        >
          <Typography>فعالیت</Typography>
          <Typography>وبسایت/سرویس</Typography>
          <Typography>زمان انجام</Typography>
        </Box>
        {historyData.map(({ title, id, site, date }) => (
          <Box
            key={id}
            sx={{
              display: "grid",
              marginY: ".5rem",
              gridTemplateColumns: "1fr 1fr 1fr",
              justifyItems: "center",
              gap: "1rem",
              background: "#fff",
              paddingY: ".8rem",
            }}
          >
            <Typography>{title}</Typography>
            <Typography>{site}</Typography>
            <Typography>{formatPersianDateTime(date)}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
