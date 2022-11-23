import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import { TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { ChangePasswordSchema } from "./validation";

import {
  validateForgotPasswordToken,
  changePassword,
} from "../../../services/auth";
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

type Props = {
  token: string | null;
};

const Component = ({ token }: Props) => {
  const navigate = useNavigate();
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const setSnackbar = useContext(SnackbarContext);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const { data, isLoading: isValidatingUser } = useQuery(
    ["validatingToken", token],
    () => {
      if (token) {
        return validateForgotPasswordToken({ token });
      }
    },
    {
      onSuccess: () => {
        setIsValidatingToken(false);
      },
    },
  );

  const {
    mutate: mutateChangePassword,
    isLoading,
    error,
  } = useMutation(
    "loginUser",
    (values: typeof initialValues) => {
      return changePassword({ password: values.password, token });
    },
    {
      onSuccess: (resp) => {
        setSnackbar({
          title: "Success",
          content: "Successfully changed password.",
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
    <StyledContainer className="bg-mainBg">
      {isValidatingToken || isValidatingUser ? (
        <></>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, helpers) => {
            mutateChangePassword(values);
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <StyledFormWrapper onSubmit={handleSubmit}>
                <StyledTitle className="text-center font-gilroy font-bold">
                  Create new password
                </StyledTitle>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="filled"
                  style={{
                    paddingBottom: errors?.password ? 18 : 40,
                  }}
                  className="w-full"
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors?.password}
                />
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="filled"
                  style={{
                    paddingBottom: errors?.confirmPassword ? 18 : 40,
                  }}
                  className="w-full"
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors?.confirmPassword}
                />
                <StyledButton
                  variant="contained"
                  type="submit"
                  className="bg-primaryButton text-white w-full font-inter mb-14"
                  disabled={isLoading}>
                  Create Account
                </StyledButton>
              </StyledFormWrapper>
            );
          }}
        </Formik>
      )}
    </StyledContainer>
  );
};

export default Component;
