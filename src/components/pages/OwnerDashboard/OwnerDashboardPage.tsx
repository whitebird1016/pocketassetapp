import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Typography, Button, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";

import OwnerDashboardTemplate from "../../templates/OwnerDashboard";
import Modal from "../../organisms/Modal";
import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";
import { getTasksByOwnerId, deleteTask } from "../../../services/tasks";

import { TemplateSchema } from "./validation";
import { createTask } from "../../../services/tasks";

const StyledContainer = styled.div`
  height: calc(100% - 64px);
`;

const ConfirmButton = styled(Button)`
  background-color: #e8735a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid transparent;
  color: white;

  &:hover {
    background-color: #e8735a;
  }
`;

const CancelButton = styled(Button)`
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid transparent;
  color: #1a1a25;
  margin-top: 10px;

  &:hover {
    background: #e8e8e8;
  }
`;

const StyledFormWrapper = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Component = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [fetchFavorites, setFetchFavorites] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFavoriteTemplate, setShowFavoriteTemplate] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState("");
  const [taskToTemplate, setTaskToTemplate] = useState({});
  const navigate = useNavigate();
  const setSnackbar = useContext(SnackbarContext);

  const {
    data: tasksData,
    isLoading: isLoading,
    refetch,
  } = useQuery(["fetchingOwnerTasks", auth.accessToken, fetchFavorites], () => {
    if (auth.accessToken) {
      return getTasksByOwnerId(auth.accessToken, auth.user_id, fetchFavorites);
    }
  });

  const {
    mutate: mutateDeleteTask,
    isLoading: deletingTask,
    error,
  } = useMutation(
    "deleteTask",
    (taskId: string) => {
      return deleteTask(auth.accessToken, taskId);
    },
    {
      onSuccess: () => {
        setSnackbar({
          title: "Success",
          content: "Successfully deleted task.",
          type: "success",
        });
        refetch();
      },
      onError: (e, variables) => {
        setSnackbar({
          title: "Error",
          content: "Failed to delete task. Please try again.",
          type: "error",
        });
      },
      onSettled: () => {
        setTaskToDelete("");
        setShowConfirmation(false);
      },
    },
  );

  const {
    mutate: mutateTemplateTask,
    isLoading: isTemplatingTask,
    error: templateError,
  } = useMutation(
    "templateTask",
    (values: any) => {
      return createTask(auth.accessToken, values, false);
    },
    {
      onSuccess: (resp) => {
        setSnackbar({
          title: "Success",
          content: "Successfully set as favorite.",
          type: "success",
        });
      },
      onError: (e, variables) => {
        setSnackbar({
          title: "Error",
          content: "Failed to favorite task. Please try again.",
          type: "error",
        });
      },
      onSettled: () => {
        setTaskToTemplate({});
        setShowFavoriteTemplate(false);
      },
    },
  );

  const tasks = tasksData?.tasks || [];

  return (
    <StyledContainer className="text-title bg-mainBg">
      <OwnerDashboardTemplate
        tasks={tasks}
        nft={null}
        handleDeleteTask={handleDeleteTask}
        handleFavoriteTask={handleFavoriteTask}
        energy={auth?.energy}
        handleSwitchFetchedTasks={handleSwitchFetchedTasks}
        isFavorites={fetchFavorites}
      />
      <Modal
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        open={showConfirmation}
        onClose={closeModal}>
        <div style={{ width: 450 }}>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <Typography fontWeight={700} fontFamily="Inter">
              Are you sure you want to delete this task?
            </Typography>
          </div>
          <ConfirmButton
            variant="contained"
            onClick={handleConfirmDelete}
            fullWidth>
            Yes, delete the task
          </ConfirmButton>
          <CancelButton variant="contained" onClick={closeModal} fullWidth>
            No, Cancel
          </CancelButton>
        </div>
      </Modal>
      <Modal
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        open={showFavoriteTemplate}
        onClose={cancelFavorite}>
        <Formik
          initialValues={{ title: "" }}
          validationSchema={TemplateSchema}
          onSubmit={(values) => {
            mutateTemplateTask({ ...values, ...taskToTemplate });
          }}>
          {({ values, errors, handleChange, handleSubmit }) => {
            return (
              <div style={{ width: 450 }}>
                <div style={{ textAlign: "left" }}>
                  <Typography fontWeight={700} fontFamily="Inter">
                    Favorite this Task
                  </Typography>

                  <StyledFormWrapper onSubmit={handleSubmit}>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      variant="filled"
                      style={{
                        width: "80%",
                        paddingBottom: errors?.title ? 18 : 30,
                      }}
                      onChange={handleChange}
                      error={!!errors.title}
                      helperText={errors?.title}
                    />
                    <ConfirmButton
                      variant="contained"
                      type="submit"
                      onClick={() => {}}
                      fullWidth
                      disabled={isTemplatingTask}>
                      Set as Favorite
                    </ConfirmButton>
                    <CancelButton
                      variant="contained"
                      onClick={cancelFavorite}
                      fullWidth>
                      No, Cancel
                    </CancelButton>
                  </StyledFormWrapper>
                </div>
              </div>
            );
          }}
        </Formik>
      </Modal>
    </StyledContainer>
  );

  function cancelFavorite() {
    setShowFavoriteTemplate(false);
  }

  function closeModal() {
    setShowConfirmation(false);
  }

  function handleSwitchFetchedTasks() {
    if (!isLoading) {
      setFetchFavorites(!fetchFavorites);
      refetch();
    }
  }

  function handleFavoriteTask(task: any) {
    const taskToTemplate: any = { ...task, is_template: true };
    delete taskToTemplate.delivery;
    delete taskToTemplate.comments;
    delete taskToTemplate.assistant_id;
    delete taskToTemplate.title;

    setTaskToTemplate(taskToTemplate);
    setShowFavoriteTemplate(true);
  }

  function handleDeleteTask(taskId: string) {
    setTaskToDelete(taskId);
    setShowConfirmation(true);
  }

  function handleConfirmDelete() {
    mutateDeleteTask(taskToDelete);
  }
};

export default Component;
