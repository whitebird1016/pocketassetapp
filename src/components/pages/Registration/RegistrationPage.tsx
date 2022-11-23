import React from "react";
import styled from "styled-components";
import RegistrationTemplate from "../../templates/Registration";

const Container = styled.div`
  height: calc(100% - 64px);
`;

const Component = () => {
  return (
    <Container className="bg-mainBg">
      <RegistrationTemplate />
    </Container>
  );
};

export default Component;
