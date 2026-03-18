import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/SubPages/Dashboard";
import Profile from "./pages/SubPages/SettingsPage/Profile";
import Settings from "./pages/SubPages/Settings";
import AdminLogin from "./Components/AdminLogin";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProtectedRoute from "./pages/protectedWrapper/ProtectedRoute";
import Institute from "./pages/SubPages/Institute";
import Students from "./pages/SubPages/Students";
import Inqueries from "./pages/SubPages/Inqueries";
import Security from "./pages/SubPages/SettingsPage/Security";
import PlansAndPricing from "./pages/SubPages/SettingsPage/PlansAndPricing";
import AddInstitute from "./Components/AddInstitute";
import Subscription from "./pages/SubPages/Subscription";
import CustomisePlan from "./pages/SubPages/SettingsPage/CustomisePlan";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ResetPasswordProtected from "./pages/protectedWrapper/ResetPasswordProtected";
function App() {
  const theme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.User);
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route element={<ResetPasswordProtected />}>
          <Route path="/reset-password/:email" element={<ResetPassword />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="institute" element={<Institute />}>
              <Route path="addInstitute" element={<AddInstitute />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="security" element={<Security />} />
              <Route path="plans">
                <Route index element={<PlansAndPricing />} />
                <Route path="customise/:planId" element={<CustomisePlan />} />
              </Route>
            </Route>
            <Route path="students" element={<Students />} />
            <Route path="inqueries" element={<Inqueries />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
