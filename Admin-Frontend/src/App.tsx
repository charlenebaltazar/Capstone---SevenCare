import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import LandingPage from "./pages/static/landingPage";
import About from "./pages/static/about";
import Services from "./pages/static/services";
import ContactUs from "./pages/static/contactUs";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import ViewAppointments from "./pages/app/viewAppointments";
import { UserProvider } from "./context/userContext";
import Profile from "./pages/app/profile";
import DashboardPage from "./pages/app/dashboard";
import Settings from "./pages/app/settings";
import ManageAdmins from "./pages/settings/manageAdmins";
import AddAdmin from "./pages/settings/addAdmin";
import ManageServices from "./pages/settings/manageServices";
import ManageDoctors from "./pages/settings/manageDoctors";
import AddService from "./pages/settings/addService";
import AddDoctor from "./pages/settings/addDoctor";
import PolicyTermConditions from "./pages/settings/policyTermConditions";
import ViewPatients from "./pages/app/viewPatients";
import EditAdmin from "./pages/settings/editAdmin";
import EditService from "./pages/settings/editService";
import EditDoctor from "./pages/settings/editDoctor";
import ViewAdmin from "./pages/settings/viewAdmin";
import ViewUser from "./pages/app/viewUser";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {/* Static pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* App Pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/appointments" element={<ViewAppointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/patients" element={<ViewPatients />} />

          {/* Settings Pages */}
          <Route path="/manage-admins" element={<ManageAdmins />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/manage-services" element={<ManageServices />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/manage-doctors" element={<ManageDoctors />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route
            path="/privacy-policy-and-terms-and-conditions"
            element={<PolicyTermConditions />}
          />
          <Route path="/admins/:id/edit" element={<EditAdmin />} />
          <Route path="/services/:id/edit" element={<EditService />} />
          <Route path="/doctors/:id/edit" element={<EditDoctor />} />
          <Route path="/admins/:id" element={<ViewAdmin />} />
          <Route path="/users/:id" element={<ViewUser />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}