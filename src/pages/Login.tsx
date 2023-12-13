import { Box, Button, Typography } from "@mui/material";
import Input from "../components/login/Input";
import { useState } from "react";
import Logo from "../assets/images/logo.svg";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
      }}
    >
      {/* Form Component */}
      <Box
        sx={{
          width: "50%",
          height: "100dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
          }}
        >
          <Typography
            marginBottom="2rem"
            fontWeight="700"
            fontSize="1.5rem"
            component="h1"
          >
            ورود به حساب کاربری
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Input
              name="username"
              title="نام کاربری"
              value={userName}
              onChange={setUserName}
            />
            <Input
              type="password"
              name="password"
              title="رمز عبور"
              value={password}
              onChange={setPassword}
            />

            <Button
              sx={{
                height: "2.5rem",
                background: "#0F6CBD",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "bold",
                ":hover": {
                  color: "#000",
                },
              }}
            >
              ورود
            </Button>
          </Box>
          <Button
            sx={{
              maxWidth: "300px",
              color: "#0F6CBD",
              textDecoration: "underline",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            رمز عبور خود را فراموش کرده ام.
          </Button>
        </Box>
      </Box>

      {/* Logo and Backgrounds*/}
      <Box
        sx={{
          width: "50%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            background: "#E9F1F4",
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              width: "400px",
              height: "400px",
              position: "relative",
              "::after": {
                content: '""',
                position: "absolute",
                top: "-5%",
                left: "-5%",
                width: "110%",
                height: "110%",
                border: "4px solid #608DB4",
              },
            }}
          >
            <img
              style={{
                marginTop: "5rem",
                marginRight: "2rem",
              }}
              src={Logo}
              alt="Logo"
            />

            <Box
              sx={{
                position: "absolute",
                width: "100px",
                height: "100px",
                background: "#608DB4",
                top: "-120px",
                left: "0",
                border: "10px solid #fff",
                zIndex: "10",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                width: "160px",
                height: "160px",
                borderRadius: "1rem",
                background: "#0F6CBD",
                top: "-60px",
                left: "-120px",
                zIndex: "5",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Typography
        sx={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          color: "gray",
          fontSize: "1.2rem",
        }}
      >
        Powered by{" "}
        <span style={{ color: "#000", fontWeight: "bold" }}>Rayka</span>
      </Typography>
    </Box>
  );
};

export default Login;
