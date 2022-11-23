import React from "react";
import styled from "styled-components";

const StyledContainer = styled.span`
  padding-top: 6%;
  margin-bottom: 10%;
  display: flex;
  flex: 100vw;
  flex-direction: column;
  height: 100%;
  flex-wrap: nowrap;
`;

const StyledTaskTitle = styled.span`
  width: 127px;
  height: 19px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledTaskDescriptionTitle = styled.span`
  padding: 5%;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  width: 82%;
  font-weight: 400;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 10%;
  background-color: white;
`;

const StyledButtonsTaskView = styled.span`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100%;
  gap: 20px;
  margin-top: 10%;
  height: 8%;
`;

const StyledInProgressButton = styled.button`
  background-color: #6f5acd;
  z-index: 300;
  border-radius: 50px;
  cursor: pointer;
  padding-top: 11px;
  padding-bottom: 13px;
  padding-right: 38px;
  padding-left: 38px;
  flex-direction: column;
  border: none;
  align-items: center;
  color: white;
`;

const StyledToClarifyButton = styled.button`
  background-color: white;
  z-index: 300;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  padding-top: 11px;
  padding-bottom: 13px;
  padding-right: 38px;
  padding-left: 38px;
  border: none;
  color: black;
  align-items: center;
`;

type Props = {
  task: any;
  acceptTask: (params: any) => void;
};

const Component = ({ task, acceptTask }: Props) => {
  return (
    <div className="card flex justify-start">
      <StyledContainer>
        <StyledTaskTitle>Task View</StyledTaskTitle>
        <StyledTaskDescriptionTitle>
          <b>{/* <u>Description </u> */}</b>
          You have selected the task:
          <br />
          <b>{task.title}</b>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          What should be the status of this task?
        </StyledTaskDescriptionTitle>

        <StyledButtonsTaskView>
          <StyledToClarifyButton
            onClick={() =>
              acceptTask({
                status: "clarification_needed",
                taskId: task.task_id,
              })
            }>
            <b>For Clarification</b>
          </StyledToClarifyButton>

          <StyledInProgressButton
            onClick={() =>
              acceptTask({ status: "in_progress", taskId: task.task_id })
            }>
            <b>Open (start working)</b>
          </StyledInProgressButton>
        </StyledButtonsTaskView>
      </StyledContainer>
    </div>
  );
};

export default Component;
