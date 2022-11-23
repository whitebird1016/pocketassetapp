import React from "react";
import styled from "styled-components";

import ownerStatuses from "../../../assets/ownerStatuses";
import paStatuses from "../../../assets/paStatuses";
import statusColors from "../../../assets/statusColors";
import { Energy, Star, Pen, Trash, ViewIcon } from "../../../assets/svg";

const allStatuses = { ...ownerStatuses, ...paStatuses };

type Props = {
  title: string;
  energy?: number;
  onItemClick?: () => void;
  onPenClick?: () => void;
};

const StyledItemContainer = styled.div`
  padding: 0px 10px;
  height: 75px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #d9d9d9;
  border-radius: 10px;
  border: 1px solid transparent;

  color: #000;
`;

const Status = styled.div<{ color: string }>`
  background: ${(props) => props.color || "black"};
  border-radius: 20px;
  border: 1px solid transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 22px;
  color: white;
  font-size: 12px;
  font-family: Inter;
  font-weight: 500;
  margin-left: 30px;

  @media only screen and (max-width: 780px) {
    margin-left: 10px;
  }
  padding: 0px 5px;
`;

const StyledTitle = styled.div`
  width: 500px;
  @media only screen and (max-width: 780px) {
    width: 300px;
  }
  @media only screen and (max-width: 500px) {
    width: 250px;
  }
  @media only screen and (max-width: 420px) {
    width: 250px;
  }
  @media only screen and (max-width: 400px) {
    width: 150px;
  }
`;

const Component = ({ title, energy = 0, onPenClick = () => {} }: Props) => {
  const energyArray = new Array(energy).fill(null);

  return (
    <StyledItemContainer>
      <div className="flex flex-col justify-evenly  overflow-ellipsis  whitespace-nowrap w-3/5">
        <StyledTitle className="font-inter font-bold text-lg md:text-xl overflow-ellipsis overflow-hidden ">
          {title}
        </StyledTitle>
        <div className="flex flex-row">
          {energy && energyArray.map((item, index) => <Energy key={index} />)}
        </div>
      </div>
      <div className="flex justify-end gap-4 md:gap-6 items-center md:mr-6 w-4/12">
        <ViewIcon className="hover:cursor-pointer" onClick={onPenClick} />
      </div>
    </StyledItemContainer>
  );
};

export default Component;
