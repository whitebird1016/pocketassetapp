import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import CreateTaskTemplate from "../../templates/CreateTask";

import { createTask } from "../../../services/tasks";
import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";
import { taskState, defaultTaskState } from "../../../state/atoms";
import { Task } from "../../../interfaces/Task";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Component = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [activeTask, setActiveTask] = useRecoilState(taskState);

  setActiveTask(defaultTaskState);

  const setSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();

  const {
    mutate: mutateCreateTask,
    isLoading,
    error,
  } = useMutation(
    "createTask",
    (values: any) => {
      return createTask(auth.accessToken, values.task, values.isPublish);
    },
    {
      onSuccess: (resp) => {
        console.log("resp", resp);

        setSnackbar({
          title: "Success",
          content: "Successfully created new task.",
          type: "success",
        });
        navigate("/tasks/view/" + resp.id);
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Failed to create task. Please try again.",
          type: "error",
        });
      },
    },
  );

  return (
    <StyledContainer className="bg-mainBg flex justify-center items-center">
      <CreateTaskTemplate handleSubmit={mutateCreateTask} mode="create" />
    </StyledContainer>
  );
};

export default Component;
