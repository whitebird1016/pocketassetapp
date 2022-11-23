import React, { useContext } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import LoginTemplate, { initialValues } from "../../templates/Login";

import { loginPA } from "../../../services/auth";
import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";

const Container = styled.div`
  height: calc(100% - 64px);
`;

const Component = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();

  const {
    mutate: mutateLoginUser,
    isLoading,
    error,
  } = useMutation(
    "loginUser",
    (values: typeof initialValues) => {
      return loginPA(values);
    },
    {
      onSuccess: (resp) => {
        setAuth((auth) => ({
          ...auth,
          user_id: resp?.user_id,
          role: "pa",
          accessToken: resp?.token,
          user_name: resp?.user_name,
        }));

        localStorage.setItem("user_id", resp?.user_id);
        localStorage.setItem("accessToken", resp?.token);
        localStorage.setItem("ignore_tasks", JSON.stringify([]));
        setSnackbar({
          title: "Success",
          content: "Logged in!",
          type: "success",
        });
        navigate("/");
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Incorrect email or password.",
          type: "error",
        });
        navigate("/login");
      },
    },
  );

  return (
    <Container className="bg-mainBg">
      <LoginTemplate handleSubmit={mutateLoginUser} isLoading={isLoading} />
    </Container>
  );
};

export default Component;
