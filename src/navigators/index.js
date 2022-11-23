import React, { useContext, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useAddress, useDisconnect, useSigner } from "@thirdweb-dev/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import UnprotectedRoutes from "./UnprotectedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedOwnerRoutes from "./ProtectedOwnerRoutes";
import { GlobalRoutes } from "./GlobalRoutes";

import {
  getNonceForUser,
  authenticateUserWithSignedMessage,
} from "../services/users";
import { authState, initialAuthState } from "../state/atoms";
import { SnackbarContext } from "../state/hooks";

const RenderRoute = () => {
  const { pathname: locationPath } = useLocation();
  const [auth, setAuth] = useRecoilState(authState);
  const isPathGlobal =
    locationPath === "/page-not-found" || locationPath === "/server-error";

  const address = useAddress();
  const signer = useSigner();
  const navigate = useNavigate();
  const disconnectWallet = useDisconnect();
  const setSnackbar = useContext(SnackbarContext);

  const {
    mutate: mutateLoginOwner,
    isLoading,
    error,
  } = useMutation(
    ["loginOwner", address, signer],
    async () => {
      let result = await getNonceForUser(address);
      console.log("got nonce: ", result.nonce);
      const signedMessage = await signer?.signMessage(
        `Please, sign this message to login to the PA app (${result.nonce}).`,
      );
      result = await authenticateUserWithSignedMessage(address, signedMessage);

      console.log("logged in owner", result);
      setAuth({
        role: "owner",
        accessToken: result.token,
        walletAddress: address,
        user_id: result.user_id,
        user_name: result.user_name,
      });
      localStorage.setItem("user_id", result?.user_id);
      localStorage.setItem("accessToken", result?.token);
      localStorage.setItem("ignore_tasks", JSON.stringify([]));
      return result;
    },
    {
      onSuccess: (resp) => {
        setSnackbar({
          title: "Success",
          content: "Logged in!",
          type: "success",
        });
        navigate("/");
      },
      onError: (e, variables) => {
        disconnectWallet();
        setAuth(initialAuthState);

        setSnackbar({
          title: "Error",
          content:
            e?.code && e.code === 4001
              ? "Message signature denied"
              : "Something went wrong.",
          type: "error",
        });
        navigate("/");
      },
    },
  );
  useEffect(() => {
    if (address && signer && !isLoading && !auth.walletAddress) {
      mutateLoginOwner();
    }
    if (!address && auth.walletAddress) {
      disconnectWallet();
      setAuth(initialAuthState);
    }
    console.log(address);
  }, [address, signer, isLoading, auth]);

  if (isPathGlobal) return <GlobalRoutes />;

  if (auth.accessToken || auth.walletAddress) {
    // switch (auth.role) {
    //   case "owner":
    //     return <ProtectedOwnerRoutes />;
    //   case "pa":
    //     return <ProtectedRoutes />;
    //   default:
    //     return <UnprotectedRoutes />;
    // }

    if (address) return <ProtectedOwnerRoutes />;
    else return <ProtectedRoutes />;
  }
  return <UnprotectedRoutes />;
};

const RootNavigator = () => {
  return (
    <React.Suspense fallback={<div>loading routes...</div>}>
      <BrowserRouter>
        <RenderRoute />
      </BrowserRouter>
    </React.Suspense>
  );
};

export default RootNavigator;
