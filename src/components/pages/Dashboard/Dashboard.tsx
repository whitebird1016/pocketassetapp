import React, { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { Box, Grid, InputAdornment } from "@mui/material";
import { ExpandButton, AttachmentIcon, EnergyIcon } from "../../../assets/svg";

import TaskStatusTemplate from "../../templates/TaskStatus";
import TaskItemAssistant from "../../organisms/TaskItemAssistant";
import { authState } from "../../../state/atoms";
import { getTasksByPAId } from "../../../services/tasks";

const StyledPurpleButton = styled.span`
  background-color: #6f5acd;
  border-radius: 50px;
  cursor: pointer;
  height: 40px;
  border: none;
  color: white;
  padding-bottom: 9px;
  padding-top: 9px;
  padding-left: 30px;
  padding-right: 30px;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;

  @media only screen and (max-width: 1099px) {
    width: 100%;
  }
`;

const ShadowedContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 1;
  border-radius: 10px;
`;

const StyledBoardWrapper = styled.div`
  display: flex;
  min-height: 800px;
  height: 80%;
  min-width: 1100px;
  width: 75%;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
  }
`;

const LeftBox = styled(Box)`
  flex: 0.68;
  @media screen and (max-width: 760px) {
    flex: 1;
    row-gap: 16px;
    margin-bottom: 16px;
  }
`;

const RightBox = styled(Box)`
  flex: 0.3;
  @media screen and (max-width: 760px) {
    flex: 1;
    padding-bottom: 20px;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  justify-content: space-between;
  margin: 38px 0 30px;

  @media only screen and (max-width: 760px) {
    flex-direction: column;
    padding: 0 2%;
  }
`;

const StyledHeader = styled.div`
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 1099px) {
    margin-left: 5%;
  }
`;

const TaskItemsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  > div {
    margin-bottom: 25px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

const Component = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  const { data: taskData, isLoading } = useQuery(
    ["fetchingTasks", auth.accessToken, auth.user_id],
    () => {
      if (auth.accessToken && auth.user_id) {
        return getTasksByPAId(auth.accessToken, auth.user_id);
      }
    },
  );

  const tasks = taskData?.tasks || [];

  const inProgressTasks = tasks.filter((task) => task.status === "in_progress");
  const needClarificationTasks = tasks.filter(
    (task) => task.status === "clarification_needed",
  );
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const forReviewTasks = tasks.filter((task) => task.status === "submitted");

  return (
    <>
      <StyledContainer className="bg-mainBg">
        <StyledBoardWrapper>
          <StyledHeader>
            <p className="font-Inter text-4xl text-black font-bold mb-2 mt-10">
              Dashboard
            </p>
          </StyledHeader>
          <StyledCardsWrapper>
            <LeftBox
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <Grid style={{ flex: 0.7 }}>
                <ShadowedContainer className="flex flex-col justify-start bg-tableGrey w-full h-full p-6">
                  <div className="flex flex-row font-inter text-2xl text-black font-bold my-2 mt-[5%]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8 py-1">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                        />
                      </svg>
                    </div>
                    <div className="task-title">OPEN</div>
                  </div>
                  {inProgressTasks.length === 0 ? (
                    <TaskItemsContainer>
                      <span className="font-medium text-lg">
                        You have no tasks to work on at the moment.
                        <br />
                        <br />
                        Find a new task to earn more!
                      </span>
                    </TaskItemsContainer>
                  ) : (
                    <TaskItemsContainer>
                      {inProgressTasks?.map((task, index) => {
                        return (
                          <TaskItemAssistant
                            key={index}
                            title={task.title}
                            energy={task.energy_assigned}
                            onPenClick={() => navigate(`/task/${task.task_id}`)}
                          />
                        );
                      })}
                    </TaskItemsContainer>
                  )}
                  <div className="flex flex-row font-inter text-2xl bg-purple-200 font-bold my-2 mt-[5%]">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-8 h-8 py-1">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div>CLARIFICATION</div>
                  </div>
                  {needClarificationTasks.length === 0 ? (
                    <TaskItemsContainer>
                      <span className="font-medium text-lg">
                        You have no tasks for clarification at the moment.
                      </span>
                    </TaskItemsContainer>
                  ) : (
                    <TaskItemsContainer>
                      {needClarificationTasks?.map((task, index) => {
                        return (
                          <TaskItemAssistant
                            key={index}
                            title={task.title}
                            energy={task.energy_assigned}
                            onPenClick={() => navigate(`/task/${task.task_id}`)}
                          />
                        );
                      })}
                    </TaskItemsContainer>
                  )}
                  {forReviewTasks.length > 0 && (
                    <>
                      <div className="flex flex-row font-inter text-2xl text-black font-bold my-2 mt-[5%]">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8 py-1">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        </div>
                        <div>UNDER REVIEW</div>
                      </div>
                      <TaskItemsContainer>
                        {forReviewTasks?.map((task, index) => {
                          return (
                            <TaskItemAssistant
                              key={index}
                              title={task.title}
                              energy={task.energy_assigned}
                              onPenClick={() =>
                                navigate(`/task/${task.task_id}`)
                              }
                            />
                          );
                        })}
                      </TaskItemsContainer>
                    </>
                  )}
                  <div className="self-end my-6">
                    <StyledPurpleButton onClick={() => navigate("/tasks")}>
                      <b>Find Tasks</b>
                    </StyledPurpleButton>
                  </div>
                </ShadowedContainer>
              </Grid>
            </LeftBox>
            <RightBox>
              <TaskStatusTemplate
                needClarificationTasks={needClarificationTasks}
                completedTasks={completedTasks}
                forReviewTasks={forReviewTasks}
              />
            </RightBox>
          </StyledCardsWrapper>
        </StyledBoardWrapper>
      </StyledContainer>
    </>
  );
};

export default Component;
