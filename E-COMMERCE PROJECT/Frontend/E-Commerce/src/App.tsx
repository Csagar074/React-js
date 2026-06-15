import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { allRoutes } from "./routes/router";
import { getAuthToken } from "./services/admin/AdminService";


export default function App() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = getAuthToken();

    if (token) {
      // Navigate Dashboard
      navigate(allRoutes.dashboard);
    } else {
      // Navigate Login Page
      navigate(allRoutes.login);
    }
  }, []);

  return (
    <div>
      <Outlet />

      <ToastContainer />
    </div>
  )
}
