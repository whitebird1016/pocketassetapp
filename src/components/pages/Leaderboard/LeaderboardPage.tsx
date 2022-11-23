import React from "react";
import styled from "styled-components";

import LeaderboardTemplate from "../../templates/Leaderboard";

const Container = styled.div`
  height: calc(100% - 64px);
`;

const Component = () => {
  return (
    <Container className="bg-mainBg">
      <LeaderboardTemplate />
    </Container>
  );
};

export default Component;
