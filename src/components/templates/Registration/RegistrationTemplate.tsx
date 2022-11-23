import React, { useContext } from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import { TextField, Button } from "@mui/material";

import { registerPA } from "../../../services/auth";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { LogInSchema } from "./validation";
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
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };
  const setSnackbar = useContext(SnackbarContext);

  type FormValues = typeof initialValues;

  const {
    mutate: mutateRegisterUser,
    isLoading,
    error,
  } = useMutation(
    "registerUser",
    (values: FormValues) => {
      return registerPA(values);
    },
    {
      onSuccess: (resp) => {
        setSnackbar({
          title: "Success",
          content: "Successfully registered user!",
          type: "success",
        });
        navigate("/login");
      },
      onError: (e, variables) => {
        setSnackbar({
          title: "Error",
          content: "Failed to register user.",
          type: "error",
        });
        navigate("/register");
      },
    },
  );

  return (
    <StyledContainer className="bg-mainBg">
      <Formik
        initialValues={initialValues}
        validationSchema={LogInSchema}
        onSubmit={(values, helpers) => {
          mutateRegisterUser(values);
        }}>
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <StyledFormWrapper onSubmit={handleSubmit}>
              <StyledTitle className="text-center font-gilroy font-bold">
                Welcome Aboard!
              </StyledTitle>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="filled"
                style={{
                  paddingBottom: errors?.name ? 18 : 40,
                }}
                className="w-full"
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors?.name}
                inputProps={{ maxLength: 150 }}
              />
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
                inputProps={{ maxLength: 150 }}
              />
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
    </StyledContainer>
  );
};

export default Component;
