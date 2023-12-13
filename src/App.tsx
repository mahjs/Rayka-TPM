import "./layout/App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./layout/normalize.css";
import { mainRoutes } from "./routes/routes";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "YekanBakh-Thin",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {mainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
