import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export const mainRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
