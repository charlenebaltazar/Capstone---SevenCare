import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup";
import Login from "./pages/auth/login";
import LandingPage from "./pages/static/landingPage";
import About from "./pages/static/about";
import Services from "./pages/static/services";
import ContactUs from "./pages/static/contactUs";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import HomePage from "./pages/app/homePage";
import CreateAppointment from "./pages/app/createAppointment";
import ViewAppointments from "./pages/app/viewAppointments";
import { UserProvider } from "./context/userContext";
import Notification from "./pages/app/notifications";
import ViewTransactions from "./pages/app/viewTransactions";
import ViewMedicalRecord from "./pages/app/viewMedicalRecord";
import ViewReceipt from "./pages/app/viewReceipt";
import ViewMedicalRecordList from "./pages/app/viewMedicalRecordList";
import Profile from "./pages/app/profile";

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
          <Route path="/home" element={<HomePage />} />
          <Route path="/appointments" element={<ViewAppointments />} />
          <Route path="/appointments/create" element={<CreateAppointment />} />
          <Route path="/transactions" element={<ViewTransactions />} />
          <Route path="/transactions/:id/receipt" element={<ViewReceipt />} />
          <Route path="/medical-records" element={<ViewMedicalRecordList />} />
          <Route path="/medical-records/:id" element={<ViewMedicalRecord />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
