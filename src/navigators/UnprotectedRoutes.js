import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";
import ForgotPassword from "../components/pages/ForgotPassword";
import ChangePassword from "../components/pages/ChangePassword";
import Home from "../components/pages/Home";
import OwnerLogin from "../components/pages/OwnerLogin";
import Header from "../components/organisms/Header";

export default () => (
  <>
    <Header />
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="owner-login" element={<OwnerLogin />} />
    </Routes>
  </>
);
