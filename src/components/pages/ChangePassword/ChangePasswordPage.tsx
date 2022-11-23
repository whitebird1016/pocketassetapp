import React, { useMemo } from "react";
import styled from "styled-components";
import { URLSearchParams as URLSearchParamsType } from "url";
import { useLocation } from "react-router-dom";

import ChangePassTemplate from "../../templates/ChangePassword";

const Container = styled.div`
  height: calc(100% - 64px);
`;

const Component = () => {
  const useQuery = (): URLSearchParamsType => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const token = query.get("token");
  return (
    <Container className="bg-mainBg">
      <ChangePassTemplate token={token} />
    </Container>
  );
};

export default Component;
