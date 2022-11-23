import styled from "styled-components";
import { Button } from "@mui/material";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  overflow-y: scroll;
  min-height: 500px;
  .swipe {
    position: absolute;
  }
  #scrollstyle::-webkit-scrollbar {
    width: 16px;
  }

  #scrollstyle::-webkit-scrollbar-track {
    background: #fb7d8a;
  }

  #scrollstyle::-webkit-scrollbar-thumb {
    background-color: #8f54a0;
    border-radius: 39px;
    border: 6px solid #fb7d8a;
  }

  @keyframes popup {
    0% {
      transform: scale(1, 1);
    }
    10% {
      transform: scale(1.1, 1.1);
    }
    30% {
      transform: scale(0.9, 0.9);
    }
    50% {
      transform: scale(1, 1);
    }
    57% {
      transform: scale(1, 1);
    }
    64% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;
export const StyledCardMainContainer = styled.div`
  max-width: 380px;
  height: 500px;
  width: 100vw;
`;
export const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  font-family: Inter;
  font-weight: 600;
  background-color: #fb7d8a;
  border-radius: 16px;
  width: 380px;
  height: 500px;
  color: white;
  gap: 10px;
`;

export const StyledCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;
export const StyledCardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  border-radius: 10px;
  font-size: 20px;
  background-color: white;
  padding: 20px;
  color: black;
  font-weight: 400;
  height: 250px;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  gap: 20px;
  margin-top: 350px;
`;

export const StyledTaskTitle = styled.span`
  overflow-y: auto;
  height: 130px;
  font-size: 35px;
  :hover {
    overflow-y: scroll;
  }
`;

export const StyledAddress = styled.span`
  font-size: 12px;
  color: black;
  border-radius: 50px;
  background-color: white;
  padding: 2px 5px;
  height: 20px;
  margin-top: 20px;
  font-weight: 500;
`;
export const StyledCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-weight: 500;
`;
export const StyledCardButton = styled.div`
  border-radius: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  background-color: black;
  height: 60px;
`;

export const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 10px 35px;
  font-weight: 600;
`;

export const StyledClarifyButton = styled(StyledButton)`
  background-color: #ffffff;
  color: black;
`;
export const StyledProgressButton = styled(StyledButton)`
  background-color: #6f5acd;
  color: #ffffff;
`;
export const StyledCardLeftButton = styled(StyledCardButton)`
  background-color: #ffffff;
`;
export const StyledCardRightButton = styled(StyledCardButton)`
  background-color: #6f5acd;
  color: #ffffff;
`;
export const StyledCardInfoText = styled.span`
  font-size: 14px;
  overflow-wrap: anywhere;
`;
export const StyledCardInfoText2 = styled.span`
  font-size: 16px;
  overflow-wrap: anywhere;
`;
export const CancelButton = styled(Button)`
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid transparent;
  color: #1a1a25;
  margin-top: 100px;
  &:hover {
    background: #e8e8e8;
  }
`;
