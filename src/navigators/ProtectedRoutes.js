import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import Dashboard from "../components/pages/Dashboard";
import DashboardTaskView from "../components/pages/DashboardTaskView";
// import DashboardEmpty from "../components/pages/DashboardEmpty";
import ProfileView from "../components/pages/ProfileView";
import TaskCards from "../components/pages/TaskCards";
import Header from "../components/organisms/Header";
import Leaderboard from "../components/pages/Leaderboard";

import { authState, initialAuthState } from "../state/atoms";
import { getUserById } from "../services/users";

import { LeaderboardIcon, ProfileIcon, LogoutIcon } from "../assets/svg";

export default () => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("user_id");

    setAuth(initialAuthState);
    navigate("/");
  };

  const { data, isLoading } = useQuery(
    ["fetchingUser", auth.accessToken, auth.user_id],
    () => {
      if (auth.accessToken && auth.user_id) {
        return getUserById(auth.accessToken, auth.user_id);
      }
    },
    {
      onSuccess: (resp) => {
        setAuth((auth) => ({ ...auth, ...resp?.user }));
      },
      onError: (e) => {
        logoutUser();
      },
    },
  );

  return (
    <>
      <Header
        role="pa"
        dropdownButtonName={auth.user_name || "N/A"}
        dropdownOptions={[
          {
            name: "Profile",
            onClick: () => navigate("/profile"),
            icon: <ProfileIcon />,
          },
          {
            name: "Leaderboard",
            onClick: () => navigate("/leaderboard"),
            icon: <LeaderboardIcon />,
          },
          { name: "Logout", onClick: logoutUser, icon: <LogoutIcon /> },
        ]}
      />
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route exact path="dashboard" element={<Dashboard />} />
        <Route exact path="task/:taskId" element={<DashboardTaskView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="tasks" element={<TaskCards />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
};
