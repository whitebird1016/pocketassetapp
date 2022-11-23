import React from "react";
import styled from "styled-components";
import { Formik, FormikProps } from "formik";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LogInSchema } from "./validation";

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

export const initialValues = {
  email: "",
  password: "",
};

type Props = {
  handleSubmit: (values: typeof initialValues) => void;
  isLoading: boolean;
};

const Component = ({ handleSubmit, isLoading }: Props) => {
  const navigate = useNavigate();

  return (
    <StyledContainer className="bg-mainBg">
      <Formik
        initialValues={initialValues}
        validationSchema={LogInSchema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <StyledFormWrapper onSubmit={handleSubmit}>
              <StyledTitle className="text-center font-gilroy font-bold">
                Log in
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
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="filled"
                style={{
                  paddingBottom: errors?.password ? 0 : 8,
                }}
                className="w-full"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors?.password}
              />
              <a
                className="font-inter text-sm text-black hover:cursor-pointer pb-4 w-fit"
                onClick={() => navigate("/forgot-password")}>
                Forgot password?
              </a>

              <StyledButton
                variant="contained"
                type="submit"
                className="bg-primaryButton text-white w-full font-inter mb-14"
                disabled={isLoading}>
                Log in
              </StyledButton>
              <a
                className="text-center pb-3 hover:cursor-pointer w-fit self-center"
                onClick={() => {}}>
                No account yet?
              </a>
              <StyledButton
                variant="outlined"
                className="border-buttonBorder text-buttonBorder w-full font-inter mb-16"
                onClick={() => navigate("/register")}>
                Register
              </StyledButton>
            </StyledFormWrapper>
          );
        }}
      </Formik>
    </StyledContainer>
  );
};

export default Component;
