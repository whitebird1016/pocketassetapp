import React, { useRef, useEffect } from "react";
import styled from "styled-components";

import HTMLTextRender from "../../organisms/HTMLTextRender";

import { Energy } from "../../../assets/svg";

type Props = {
  title: string;
  description: any;
  energy_assigned: number;
  holder_name: string;
  task_id: string;
  canSwipe: boolean;
  attachments: any;
  setIsSwiping: (val: boolean) => void;
  handleSwipe: (direction: "left" | "right") => () => void;
};

const StyledContainer = styled.span`
  padding-top: 8%;
  margin-bottom: 10%;
  display: flex;
  flex: 100vw;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
  // background-color: red;
`;

const StyledAddress = styled.p`
  background-color: white;
  width: 127px;
  height: 19px;
  color: black;
  border-radius: 50px;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: wrap;
  overflow: hidden;
  padding-bottom: 20px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 8%;
`;

const StyledTaskTitle = styled.div`
  width: 100%;
  height: max-content;
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 8%;
  text-align: left;
  // background-color: green;
`;

const StyledTaskDescriptionTitle = styled.span`
  color: white;
  font-size: 14px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 30px;
  margin-left: 8%;
  // background-color: blue;
`;
const StyledTaskDescription = styled.span`
  color: white;
  font-size: 14px;
  width: 85%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 2%;
  margin-left: 8%;
  max-height: 150px;
  height: fit-content;
  overflow-y: auto;
  // background-color: blue;
`;

const StyledTaskDurationTitle = styled.span`
  color: white;
  font-size: 14px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 5%;
  margin-left: 8%;
  // background-color: orange;
`;

const StyledTaskDuration = styled.span`
  color: white;
  font-size: 14px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 2%;
  margin-left: 8%;
  // background-color: orange;
`;

const StyledTaskAttachmentsTitle = styled.span`
  color: white;
  font-size: 14px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 5%;
  margin-left: 8%;
  // background-color: orange;
`;

const StyledTaskAttachments = styled.span`
  color: white;
  font-size: 14px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  margin-top: 2%;
  margin-left: 8%;
  // background-color: orange;
`;

const Component = ({
  title,
  description,
  energy_assigned,
  holder_name,
  task_id,
  canSwipe,
  attachments,
  setIsSwiping,
  handleSwipe,
}: Props) => {
  const energyArray = new Array(energy_assigned).fill(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      setIsSwiping(false);
    };

    const element: any = ref.current;

    element?.addEventListener("click", handleClick);

    return () => {
      element?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="card relative flex self-center justify-center flex-col">
      {/* // <h3 style={{ color: "black" }}>{characterName}</h3> */}
      <StyledContainer>
        <div className="flex flex-row w-full justify-between">
          <StyledTaskTitle>{title}</StyledTaskTitle>
          <StyledAddress className="publicAddress">{holder_name}</StyledAddress>
        </div>
        <StyledTaskDescriptionTitle>
          <b>{/* <u>Description </u> */}</b>
          {/* <p className="flex flex-column justify-center bg-primaryButton w-full mt-[7%]"> */}
          <b>
            <u>Description</u>
          </b>
          <br />
        </StyledTaskDescriptionTitle>
        <StyledTaskDescription>
          <HTMLTextRender
            key={task_id}
            htmlString={description?.replaceAll("<br/>", "\n")}
          />
        </StyledTaskDescription>

        <StyledTaskDurationTitle>
          <b>
            <u>Energy</u>
          </b>
        </StyledTaskDurationTitle>

        <StyledTaskDuration>
          <div className="flex flex-row">
            {energy_assigned && energyArray.map(() => <Energy />)}
          </div>
        </StyledTaskDuration>

        <StyledTaskAttachmentsTitle>
          <b>
            <u>Attachments</u>
          </b>
        </StyledTaskAttachmentsTitle>

        <StyledTaskAttachments>
          {attachments?.map((file) => {
            let fileName = file.substr(file.lastIndexOf("/") + 1);
            return <div className="mr-[5]">{fileName}</div>;
          })}
        </StyledTaskAttachments>
      </StyledContainer>
    </div>
  );
};

export default Component;
