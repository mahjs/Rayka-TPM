import { Typography, Box, Button } from "@mui/material";
import { keyframes } from "@mui/system";

// Keyframes for animations
const colorSlide = keyframes`
100% { background-color: #ffffff; } 
75% { background-color: #E9F1F4; } 
50% { background-color: #B2CADF; } 
25% { background-color: #0F6CBD;} 
0% { background-color: #5E819F; } 
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NotFoundPage = () => {
  const handleBackToDashboard = () => {
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        color: "black",

        animation: `${colorSlide} 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite`,
        ".text-center": {
          textAlign: "center",
          "h1, h3": {
            margin: "10px",
            cursor: "default",
            ".fade-in": {
              animation: `${fadeIn} 2s ease infinite`,
            },
          },
          h1: {
            fontSize: "8em",
            transition: "font-size 200ms ease-in-out",
            borderBottom: "1px dashed black",
            "& span": {
              ":nth-of-type(1)": { animationDelay: "200ms" },
              ":nth-of-type(2)": { animationDelay: "300ms" },
              ":nth-of-type(3)": { animationDelay: "400ms" },
            },
          },
          button: {
            border: "1px solid black",
            background: "transparent",
            outline: "none",
            padding: "10px 20px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            transition: "background-color 200ms ease-in",
            margin: "20px 0",
            "&:hover": {
              backgroundColor: "black",
              color: "#ffffff",
              cursor: "pointer",
            },
          },
        },
      }}
    >
      <Box className="text-center">
        <Typography
          variant="h1"
          component="h1"
          style={{ cursor: "default", margin: "10px" }}
        >
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          style={{ cursor: "default", margin: "10px" }}
        >
          صفحه‌ی مورد نظر پیدا نشد
        </Typography>
        <Button onClick={handleBackToDashboard}>بازگشت به صفحه اصلی</Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
