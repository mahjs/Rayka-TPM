
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App() {
  const renderContent = () => {
    const path = window.location.pathname;
    return (
      <>
        <CssBaseline />
        {path === "/" ? <Dashboard /> : <NotFound />}
      </>
    );
  };

  return <>{renderContent()}</>;
}

export default App;
