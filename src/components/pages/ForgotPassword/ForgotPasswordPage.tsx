import React from "react";
import styled from "styled-components";
import ForgotPasswordTemplate from "../../templates/ForgotPassword";

const Container = styled.div`
  height: calc(100% - 64px);
`;

const Component = () => {
  return (
    <Container className="bg-mainBg">
      <ForgotPasswordTemplate />
    </Container>
  );
};

export default Component;
