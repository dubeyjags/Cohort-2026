import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import LayoutCenter from "./components/LayoutCenter.jsx";
import LayoutPage from "./components/LayoutPage.jsx";
import { Profile } from "./components/Profile.jsx";
import { ForgotPassword } from "./components/ForgotPassword.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>      
      <Routes>
        <Route element={<LayoutCenter />}>
          <Route index element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<LayoutPage />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
