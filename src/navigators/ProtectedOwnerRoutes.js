import React, { useEffect, useRef } from "react";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import OwnerProfileView from "../components/pages/OwnerProfileView";

import Header from "../components/organisms/Header";
import OwnerDashboard from "../components/pages/OwnerDashboard";
import CreateTask from "../components/pages/CreateTask";
import ViewTask from "../components/pages/ViewTask";
import EditTask from "../components/pages/EditTask";

import { ProfileIcon, LogoutIcon } from "../assets/svg";
import { authState, initialAuthState } from "../state/atoms";
import { getUserById } from "../services/users";

// Note: Currently unused but might be helpful
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useHasChanged = (val) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

export default () => {
  const navigate = useNavigate();
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const [auth, setAuth] = useRecoilState(authState);

  const logOutOwner = () => {
    disconnectWallet();
    setAuth(initialAuthState);
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const { data, isLoading } = useQuery(
    ["fetchingOwnerEnergy", auth.accessToken, auth.user_id],
    () => {
      if (auth.accessToken && auth.user_id) {
        return getUserById(auth.accessToken, auth.user_id);
      }
    },
    {
      onSuccess: (resp) => {
        setAuth((auth) => ({ ...auth, energy: resp?.user?.remaining_energy }));
      },
      onError: (e) => {
        setAuth((auth) => ({ ...auth, energy: 0 }));
      },
    },
  );

  return (
    <>
      <Header
        role="owner"
        dropdownButtonName={
          address
            ? `${address.substring(0, 5)}...${address.substring(
                address.length - 2,
              )}`
            : ""
        }
        dropdownOptions={[
          {
            name: "Profile",
            onClick: () => navigate("profile"),
            icon: <ProfileIcon />,
          },
          { name: "Disconnect", onClick: logOutOwner, icon: <LogoutIcon /> },
        ]}
      />
      <Routes>
        <Route path="/*" element={<OwnerDashboard />} />
        <Route path="tasks/create" element={<CreateTask />} />
        <Route path="tasks/view/:id" element={<ViewTask />} />
        <Route path="tasks/edit/:id" element={<EditTask />} />
        <Route path="profile" element={<OwnerProfileView />} />
      </Routes>
    </>
  );
};
