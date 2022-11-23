import React from "react";
import styled from "styled-components";

import AssistantImage from "../../../assets/images/assistant.png";

const StyledContainer = styled.div`
  height: calc(100% - 64px);
`;

const StyledTitle = styled.p`
  text-shadow: #000000 1px 1px;
`;

const StyledImage = styled.img`
  @media only screen and (min-width: 1280px) {
    height: 450px;
    width: 475px;
  }

  @media only screen and (max-width: 640px) {
    height: 100%;
    width: 100%;
  }
`;

const Component = () => {
  return (
    <StyledContainer className="text-title bg-mainBg">
      <div className="lg:flex justify-center justify-items-center items-center pt-[8%]">
        <div className="px-8 lg:px-4">
          <StyledTitle
            className="lg:w-[528px] text-left lg:text-6xl md:text-5xl text-buttonBorder 
                font-title font-bold sm:text-4xl sm:leading-none">
            Pioneering a new gig economy for the underserved on web3.
          </StyledTitle>
        </div>
        <StyledImage src={AssistantImage} />
      </div>
    </StyledContainer>
  );
};

export default Component;
