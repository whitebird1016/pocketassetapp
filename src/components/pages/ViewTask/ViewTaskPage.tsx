import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  addTaskComment,
  getTaskById,
  updateTask,
  addRatingData,
} from "../../../services/tasks";
import { Task } from "../../../interfaces/Task";
import ViewTaskTemplate from "../../templates/ViewTask";

import { setTaskStatus } from "../../../services/tasks";
import { authState } from "../../../state/atoms";
import { taskState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";
import { Button, Typography, TextField } from "@mui/material";
import Modal from "../../organisms/Modal";
import Rating from "@mui/material/Rating";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: #e8e8e8;
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

const Component = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const setSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [rejectModal, setRejectModal] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showRating, setShowRating] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(2);
  const [ratedescription, setRateDescription] = React.useState<String | null>(
    "",
  );
  const [activeTask, setActiveTask] = useRecoilState<Task>(taskState);

  let { id } = useParams();

  const {
    data: tasksData,
    isLoading: isValidatingUser,
    refetch,
  } = useQuery(
    ["fetchingTask", auth.accessToken],
    () => {
      if (auth.accessToken) {
        return getTaskById(auth.accessToken, id, true);
      }
    },
    {
      onSuccess: (resp) => {
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
    mutate: mutateChangeTaskState,
    isLoading,
    error,
  } = useMutation(
    "changeTaskState",
    (data: any) => {
      if (["published", "draft"].includes(data.state)) {
        return setTaskStatus(auth.accessToken, { id, status: data.state });
      } else {
        return Promise.reject("Unexpected state change request");
      }
    },
    {
      onSuccess: (resp, data) => {
        if (resp.success) {
          setSnackbar({
            title: "Success",
            content:
              data.state === "draft"
                ? "Your task is now set to draft."
                : "Your task is now published!",
            type: "success",
          });
          navigate("/");
        } else {
          setSnackbar({
            title: "Alert!",
            content: resp.message,
            type: "warning",
          });
        }
      },
      onError: (e, variables) => {
        console.log("error", e);
        console.log(variables);
        setSnackbar({
          title: "Error",
          content: "Failed to publish the task. Please try again.",
          type: "error",
        });
      },
    },
  );

  const {
    mutate: completeTask,
    isLoading: isTaskCompleting,
    error: completeTaskError,
  } = useMutation(
    "completeTask",
    () => {
      return setTaskStatus(auth.accessToken, { id, status: "completed" });
    },
    {
      onSuccess: (resp) => {
        if (resp.success) {
          setSnackbar({
            title: "Success",
            content: "Task is completed!",
            type: "success",
          });
          refetch();
          setShowRating(true);
        } else {
          setSnackbar({
            title: "Alert!",
            content: "Task could not be completed.",
            type: "warning",
          });
        }
      },
      onError: (e, variables) => {
        console.log("error", e);
        console.log(variables);
        setSnackbar({
          title: "Error",
          content: "Failed to publish the task. Please try again.",
          type: "error",
        });
      },
    },
  );

  const {
    mutate: rejectTaskSubmission,
    isLoading: isTaskBeingRejected,
    error: taskRejectionError,
  } = useMutation(
    "rejectTaskSubmission",
    () => {
      return setTaskStatus(auth.accessToken, {
        id,
        status: "submission_rejected",
      });
    },
    {
      onSuccess: (resp) => {
        if (resp.success) {
          setSnackbar({
            title: "Success",
            content: "The submission was sucessfully rejected!",
            type: "success",
          });
          setRejected(true);
          navigate("/");
          // refetch(); Do not refecth because the state will be in-progress which will change what is being shown on the page
        } else {
          setSnackbar({
            title: "Alert!",
            content: "The submission could not be rejected.",
            type: "warning",
          });
        }
      },
      onError: (e, variables) => {
        console.log("error", e);
        console.log(variables);
        setSnackbar({
          title: "Error",
          content: "Failed to reject the submission. Please try again.",
          type: "error",
        });
      },
    },
  );

  const {
    mutate: mutateSubmitComment,
    isLoading: isSubmittingComment,
    error: commentError,
  } = useMutation(
    ["submitComment", auth.accessToken, id],
    (comment: any) => {
      return addTaskComment(auth.accessToken, comment, id);
    },
    {
      onSuccess: (resp, variables) => {
        console.log("variables", variables, resp);
        setSnackbar({
          title: "Success",
          content: "Comment posted.",
          type: "success",
        });
        refetch();
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Unable to post comment",
          type: "error",
        });
      },
    },
  );

  const {
    mutate: mutateAddRating,
    isLoading: isAddRating,
    error: addRatingError,
  } = useMutation(
    ["addRating", auth.accessToken, id],
    (ratingdata: any) => {
      return addRatingData(auth.accessToken, ratingdata, id);
    },
    {
      onSuccess: (resp, variables) => {
        console.log("variables", variables, resp);
        // resp.task.rating = !resp.task.rating ? [] : resp.task.rating;
        // setActiveTask(resp.task);
        setSnackbar({
          title: "Success",
          content: "Rating posted.",
          type: "success",
        });
        refetch();
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Unable to post comment",
          type: "error",
        });
      },
    },
  );

  const {
    mutate: mutateUpdateTask,
    isLoading: isUpdatingTask,
    error: updateTaskError,
  } = useMutation(
    ["updateTask", auth.accessToken, id],
    (task: any) => {
      return updateTask(auth.accessToken, task, task.task_id);
    },
    {
      onSuccess: (resp, variables) => {
        setSnackbar({
          title: "Success",
          content: "Successfully uploaded files to task.",
          type: "success",
        });
        refetch();
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Unable to upload file to task.",
          type: "error",
        });
      },
    },
  );

  return (
    <StyledContainer className="bg-mainBg flex justify-center items-center">
      <Modal
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        open={rejectModal}
        onClose={closeModal}>
        <div style={{ width: 450 }}>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <Typography fontWeight={700} fontFamily="Inter">
              Do you wish to remove the current assistant from your task and let
              the task become available for other assistants instead?
            </Typography>
          </div>
          <ConfirmButton
            variant="contained"
            onClick={handleConfirmReject}
            fullWidth>
            Yes, reject the submission
          </ConfirmButton>
          <CancelButton variant="contained" onClick={closeModal} fullWidth>
            No, Cancel
          </CancelButton>
        </div>
      </Modal>
      <Modal
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        open={showRating}
        onClose={() => {
          setShowRating(false);
        }}>
        <div style={{ width: 450 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              padding: "20px",
            }}>
            <Typography fontWeight={700} fontFamily="Inter" fontSize="20px">
              How was the quality of the PA’s work?
            </Typography>
            <Rating
              name="size-large"
              defaultValue={0}
              sx={{ fontSize: "50px" }}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Typography fontWeight={700} fontFamily="Inter" fontSize="16px">
              Let us know your feedback below:
            </Typography>
            <TextField
              fullWidth
              placeholder="Add description here"
              multiline={true}
              rows={4}
              sx={{ height: "200px" }}
              variant="filled"
              onChange={(event) => {
                setRateDescription(event.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={RateModal2}
              fullWidth
              style={{ backgroundColor: "#806AD2" }}>
              Rate now
            </Button>
          </div>
        </div>
      </Modal>
      <ViewTaskTemplate
        handleSubmit={mutateChangeTaskState}
        submitComment={mutateSubmitComment}
        isSubmittingComment={isSubmittingComment}
        updateTask={mutateUpdateTask}
        completeTask={completeTask}
        showRatingModal={showRatingModal}
        addRating={mutateAddRating}
        isTaskCompleting={isTaskCompleting}
        rejectTaskSubmission={handleReject}
        isTaskBeingRejected={isTaskBeingRejected}
        holder_id={auth?.user_id}
        submissionRejected={rejected}
      />
    </StyledContainer>
  );
  function closeModal() {
    setRejectModal(false);
  }
  function handleReject() {
    setRejectModal(true);
  }
  function handleConfirmReject() {
    rejectTaskSubmission();
  }
  function showRatingModal() {
    setShowRating(true);
  }
  function RateModal2() {
    const ratingdata = { rating: rating, feedback: ratedescription };
    mutateAddRating(ratingdata);
    setShowRating(false);
  }
};

export default Component;
