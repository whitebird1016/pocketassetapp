import React, { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import CreateTaskTemplate from "../../templates/CreateTask";

import { updateTask } from "../../../services/tasks";
import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";
import { Task } from "../../../interfaces/Task";
import { taskState } from "../../../state/atoms";
import { getTaskById } from "../../../services/tasks";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Component = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();

  const [activeTask, setActiveTask] = useRecoilState<Task>(taskState);

  let { id } = useParams();
  console.log("id of task: ", id);

  const { data: tasksData, isLoading: isValidatingUser } = useQuery(
    ["fetchingTask", auth.accessToken],
    () => {
      if (auth.accessToken) {
        return getTaskById(auth.accessToken, id);
      }
    },
    {
      onSuccess: (resp) => {
        console.log(resp.task);
        resp.task.videos = !resp.task.videos ? [] : resp.task.videos;
        resp.task.urls = !resp.task.urls ? [] : resp.task.urls;
        setActiveTask(resp.task);
      },
      onError: (e) => {
        console.log("error", e);
      },
    },
  );

  const {
    mutate: mutateCreateTask,
    isLoading,
    error,
  } = useMutation(
    "updateTask",
    (values: any) => {
      return updateTask(auth.accessToken, values.task, id);
    },
    {
      onSuccess: (resp) => {
        console.log("resp", resp);

        setSnackbar({
          title: "Success",
          content: "Successfully updated the task.",
          type: "success",
        });
        navigate("/tasks/view/" + id);
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Failed to update the task. Please try again.",
          type: "error",
        });
      },
    },
  );

  return (
    <StyledContainer className="bg-mainBg flex justify-center items-center">
      <CreateTaskTemplate handleSubmit={mutateCreateTask} mode="edit" />
    </StyledContainer>
  );
};

export default Component;
