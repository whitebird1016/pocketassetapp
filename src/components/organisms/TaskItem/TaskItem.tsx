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
  status: string;
  isTrashDisabled?: boolean;
  onItemClick?: () => void;
  onStarClick?: () => void;
  onPenClick?: () => void;
  onTrashClick?: () => void;
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
  align-items: left;
  justify-content: center;
  width: 6rem;
  height: 22px;
  color: white;
  font-size: 12px;
  font-family: Inter;
  font-weight: 500;
  margin-right: 10px;

  @media only screen and (max-width: 780px) {
    margin-right: 10px;
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

const Component = ({
  title,
  energy = 0,
  status,
  isTrashDisabled,
  onItemClick = () => {},
  onStarClick = () => {},
  onPenClick = () => {},
  onTrashClick = () => {},
}: Props) => {
  const energyArray = new Array(energy).fill(null);

  /*
  // was not working well because sometimes ID would be null
  const handleClick = (e) => {
    e.stopPropagation();
    // console.log("e id :>> ", e.target.id);
    // console.log("e :>> ", e);
    switch (e.target.id) {
      case "view":
        onPenClick();
        break;
      case "star":
        onStarClick();
        break;
      case "trash":
        onTrashClick();
        break;
      case "title":
        onPenClick();
        break;
    }
  };
  */

  return (
    <StyledItemContainer>
      <div
        id="title"
        onClick={onPenClick}
        className="flex flex-col justify-evenly  overflow-ellipsis  whitespace-nowrap w-4/5 cursor-pointer">
        <StyledTitle className="font-inter font-bold text-lg md:text-xl overflow-ellipsis overflow-hidden ">
          {title}
        </StyledTitle>
        <div className="flex flex-row">
          <Status color={statusColors?.[status]}>
            {allStatuses?.[status] || status}
          </Status>
          {energy && energyArray.map(() => <Energy />)}
        </div>
      </div>
      <div className="flex justify-end gap-4 md:gap-6 items-center md:mr-6 w-1/5">
        <Star id="star" className="cursor-pointer" onClick={onStarClick} />
        <ViewIcon id="view" className="cursor-pointer" onClick={onPenClick} />
        <Trash
          id="trash"
          className={!isTrashDisabled ? "cursor-pointer" : ""}
          pathColor={!isTrashDisabled ? "#111827" : "#D3D3D3"}
          onClick={onTrashClick}
        />
      </div>
    </StyledItemContainer>
  );
};

export default Component;
