import "./layout/App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mainRoutes } from "./routes/routes";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import AuthProvider from "./contexts/authContext";

const theme = createTheme({
  typography: {
    fontFamily: "YekanBakh-Thin",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {mainRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
