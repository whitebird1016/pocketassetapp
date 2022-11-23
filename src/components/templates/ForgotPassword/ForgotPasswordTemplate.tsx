import React, { useContext } from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import { TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { ForgotPasswordSchema } from "./validation";

import { forgotPasswordRequest } from "../../../services/auth";
import { SnackbarContext } from "../../../state/hooks";

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 380px;
`;

const StyledTitle = styled.p`
  font-size: 40px;
  letter-spacing: 0.4px;
  margin-bottom: 60px;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 50px;
`;

const Component = () => {
  const navigate = useNavigate();
  const setSnackbar = useContext(SnackbarContext);
  const initialValues = {
    email: "",
  };

  const {
    mutate: mutateForgotPassword,
    isLoading,
    error,
  } = useMutation(
    "forgotPassword",
    (values: typeof initialValues) => {
      return forgotPasswordRequest(values);
    },
    {
      onSuccess: (resp) => {
        navigate(`/change-password?token=${resp.token}`);
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: " Could not send reset password email",
          type: "error",
        });
        navigate("/login");
      },
    },
  );

  return (
    <StyledContainer className="bg-mainBg">
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotPasswordSchema}
        onSubmit={(values, helpers) => {
          mutateForgotPassword(values);
        }}>
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <StyledFormWrapper onSubmit={handleSubmit}>
              <StyledTitle className="text-center font-gilroy font-bold">
                Forgot Password
              </StyledTitle>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="filled"
                style={{
                  paddingBottom: errors?.email ? 18 : 40,
                }}
                className="w-full"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors?.email}
              />

              <StyledButton
                variant="contained"
                type="submit"
                className="bg-primaryButton text-white w-full font-inter mb-14"
                disabled={isLoading}>
                Send instructions
              </StyledButton>
            </StyledFormWrapper>
          );
        }}
      </Formik>
    </StyledContainer>
  );
};

export default Component;
