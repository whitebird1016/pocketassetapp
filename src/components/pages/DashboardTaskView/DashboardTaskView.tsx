import React, { useState, useMemo, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "../../organisms/Modal";
import {
  TextField,
  Button,
  Divider,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Formik, Form, useFormikContext } from "formik";
import { useQuery, useMutation } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import { CommentSchema } from "./validation";
import {
  authState,
  defaultDeliveryState,
  taskState,
} from "../../../state/atoms";
import { getUserById } from "../../../services/users";
import { SnackbarContext } from "../../../state/hooks";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  XButtonSmall,
  PaperClipIcon,
} from "../../../assets/svg";
import {
  addTaskComment,
  getTaskById,
  setTaskStatus,
  updateTask,
} from "../../../services/tasks";
import paStatuses, { paTaskViewStatuses } from "../../../assets/paStatuses";
import ownerStatuses from "../../../assets/ownerStatuses";
import HTMLTextRender from "../../organisms/HTMLTextRender";
import FileUpload from "../../organisms/FileUpload";
import { SelectionState } from "draft-js";

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

const StyledContainer = styled.div`
  margin-top: 3%;
  margin-bottom: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  min-width: 1100px;
  width: 100%;
  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
  }
  .shadowed {
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #ffdea0;
  .title-status {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-indent: 5px;
    color: #000000;
  }
`;

const FormContainer = styled.div`
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 960px;
  @media only screen and (max-width: 960px) {
    width: 100% !important;
  }
`;

const FormStyle = styled.div`
  justify-content: center;
  align-items: center;
  width: 960px;
  @media only screen and (max-width: 960px) {
    width: 100% !important;
  }
`;

const StyledPurpleButton = styled(Button)`
  border-radius: 50px;
  cursor: pointer;
  width: fit-content;
  height: 40px;
  border: none;
  text-transform: none;
  display: flex;
  justify-content: center;
  color: white;
  padding: 10px 30px;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 50px;
`;

const URLContainer = styled.div`
  .MuiFilledInput-input {
    padding-top: 10px !important;
  }
`;

const CommentsContainer = styled.div`
  width: 960px;
  @media only screen and (max-width: 960px) {
    width: 100% !important;
  }
`;

const AutoSubmitForm = () => {
  // Grab values and submitForm from context
  const [activeTask] = useRecoilState(taskState);
  const { values, submitForm } = useFormikContext();

  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    // Attachments have been added
    if (
      values.delivery.attachments.length !==
      activeTask.delivery.attachments.length
    ) {
      console.log("attachments changed");
      console.log(values);
      submitForm();
    }
    // if (values.attachments.length === 6) {
    //}
  }, [values.delivery.attachments]);
  return null;
};

const Component = () => {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [submitAfterUpload, setSubmitAfterUpload] = useState(false);
  // const { setFieldValue, values } = useFormikContext()
  const navigate = useNavigate();
  const { taskId } = useParams();
  const setSnackbar = useContext(SnackbarContext);

  let statusValues: Array<any> = [];
  const [activeTask, setActiveTask] = useRecoilState(taskState);

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  /*
  useEffect(() => {
  }, [submitAfterUpload])
  */

  let id = activeTask.task_id;
  const {
    mutate: rejectTaskSubmission,
    isLoading: isTaskBeingRejected,
    error: taskRejectionError,
  } = useMutation(
    "rejectTaskSubmission",
    () => {
      return setTaskStatus(auth.accessToken, {
        id,
        status: "task_cancelled",
      });
    },
    {
      onSuccess: (resp) => {
        if (resp.success) {
          setSnackbar({
            title: "Success",
            content: "Success. You are no longer assigned to this task",
            type: "success",
          });
          navigate("/");
          // refetch(); Do not refecth because the state will be in-progress which will change what is being shown on the page
        } else {
          setSnackbar({
            title: "Alert!",
            content: "Could not remove you from the task",
            type: "warning",
          });
        }
      },
      onError: (e, variables) => {
        console.log("error", e);
        console.log(variables);
        setSnackbar({
          title: "Error",
          content: "Error with request. Please try again.",
          type: "error",
        });
      },
    },
  );

  const {
    data: taskData,
    isLoading: isloadingTask,
    refetch,
  } = useQuery(
    ["fetchingTask", auth.accessToken, taskId],
    () => {
      if (auth.accessToken && taskId) {
        return getTaskById(auth.accessToken, taskId, true);
      }
    },
    {
      onSuccess: (resp) => {
        if (
          !resp.task.delivery ||
          !resp.task.delivery.description ||
          !resp.task.delivery.attachments
        ) {
          // Adding empty delivery object if delivery is empty
          resp.task.delivery = Object.assign({}, defaultDeliveryState);
          console.log("assigned default delivery");
          console.log(resp);
        }
        // Adding empty rows for the empty input fields to be shown
        resp.task.delivery.urls = resp.task.delivery.urls.concat("");
        resp.task.delivery.videos = resp.task.delivery.videos.concat("");
        console.log("fetched task (again?)", resp.task);
        setActiveTask(resp.task);
      },
      onError: () => {
        setSnackbar({
          title: "Error",
          content: "Failed to fetch the task. Please try again.",
          type: "error",
        });
        navigate("/");
      },
    },
  );

  const {
    mutate: mutateSubmitComment,
    isLoading: isSubmittingComment,
    error,
  } = useMutation(
    ["submitComment", auth.accessToken, taskId],
    (comment: any) => {
      return addTaskComment(auth.accessToken, comment, taskId);
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
    mutate: mutateChangeTaskState,
    isLoading: changeTaskLoading,
    error: changeTaskError,
  } = useMutation(
    "changePATaskState",
    async (status: string) => {
      if (["clarification_ended"].includes(status)) {
        let result = await getUserById(auth.accessToken, auth.user_id);
        let tempUser = result.user;
        if (!tempUser.activeTasks || tempUser.activeTasks.length < 2) {
          return setTaskStatus(auth.accessToken, {
            id: taskId,
            status,
          });
        } else {
          return Promise.reject({
            message:
              "You already have 2 open tasks. Please, finish one of those first.",
          });
        }
      } else {
        return Promise.reject("Unexpected state change request");
      }
    },
    {
      onSuccess: (resp: any) => {
        // console.log("resp", resp);
        if (resp.success) {
          setSnackbar({
            title: "Success",
            content:
              "The task is now assigned to you and you can start working on it.",
            type: "success",
          });
        } else {
          setSnackbar({
            title: "Alert!",
            content:
              "Failed when trying to assign the task. Please, try again.",
            type: "error",
          });
        }
        navigate("/dashboard");
      },
      onError: (e: any, variables: any) => {
        console.log("error", e);
        let content = e.message
          ? e.message
          : "Failed to assign the task. Please, try again.";
        setSnackbar({
          title: "Error",
          content,
          type: "error",
        });
      },
    },
  );

  const {
    mutate: deliverTask,
    isLoading: isUpdatingTask,
    error: updateTaskError,
  } = useMutation(
    ["updateTask", auth.accessToken, taskId],
    async ({ task, doSubmit, toDashboard }: any) => {
      console.log("sending these attachments for update");
      console.log([...task.delivery.attachments]);
      let result = await updateTask(auth.accessToken, task, taskId);
      if (!doSubmit) {
        return result;
      }
      return setTaskStatus(auth.accessToken, {
        id: taskId,
        status: "submitted",
      });
    },
    {
      onSuccess: (resp, variables) => {
        setSnackbar({
          title: "Success",
          content: variables.doSubmit
            ? "Task successfully submitted for review."
            : "Task successfully updated!",
          type: "success",
        });
        // Need to update the state with the values that were submitted
        // Shallow copying the object from state so as to not be mutating it
        let updatedTask = Object.assign({}, activeTask);
        updatedTask.delivery = variables.task.delivery; // This updates the values
        console.log("after saving delivery");
        console.log([...updatedTask.delivery.attachments]);

        // Need to re-add empty rows since they have been clened up during submission
        // Dont need this anymore because in the update method removal of blank last item is done in a copied object and does not affect the state object that was copied above
        // updatedTask.delivery.urls = updatedTask.delivery.urls.concat("");
        // updatedTask.delivery.videos = updatedTask.delivery.videos.concat("");

        setActiveTask(updatedTask);
        if (variables.toDashboard) {
          navigate("/dashboard");
        }
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: variables.doSubmit
            ? "Failed to submit task for review."
            : "Failed to save the task!",
          type: "error",
        });
      },
    },
  );

  // const task = taskData?.task || {};

  for (const [value, name] of Object.entries(paTaskViewStatuses)) {
    statusValues.push({ value, name });
  }

  return (
    <StyledContainer>
      <FormContainer className="flex flex-col justify-center">
        <FormStyle className="mx-auto bg-white shadow-lg">
          <TaskHeader>
            <div className="title-status ml-9 font-bold text-black shadow-none">
              {activeTask.status
                ? ownerStatuses[activeTask.status]?.toUpperCase() ||
                  paStatuses[activeTask.status]?.toUpperCase() ||
                  ""
                : ""}
            </div>
            <div className="hover:cursor-pointer mr-10">
              <Link to="/dashboard">
                <XButtonSmall />
              </Link>
            </div>
          </TaskHeader>
          {/* <Divider light className="w-full" /> */}

          <Box className="my-4 mx-10">
            <Grid container rowGap={3}>
              <Grid container columnGap={2}>
                <Grid item xs={7}>
                  <div className="text-[40px] font-bold leading-[48px]">
                    {activeTask.title}
                  </div>
                </Grid>
              </Grid>
              <Grid container columnGap={2}>
                <Grid item xs={2}>
                  <div className="text-base font-bold ">Assigned by:</div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <span>{activeTask.holder_name}</span>
                </Grid>
              </Grid>

              <Grid container columnGap={2}>
                <Grid item xs={2}>
                  <div className="text-base font-bold ">Published date:</div>
                </Grid>
                <Grid item xs={7}>
                  <span className="text-[#F6AC1D]">
                    {new Date(activeTask.date).toDateString()}
                  </span>
                </Grid>
              </Grid>

              <Grid container columnGap={4}>
                <Grid item xs={7}>
                  <b className="text-[16px] ">Description:</b>
                </Grid>
                <Grid item xs={11}>
                  <div className=" -mt-[5]">
                    <HTMLTextRender
                      htmlString={activeTask.description?.replaceAll(
                        "<br/>",
                        "\n",
                      )}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container rowGap={2} columnGap={2}>
                <Grid item xs={11}>
                  <div className="text-base font-bold ">Attachments:</div>
                </Grid>
                {activeTask.attachments?.map((file, index) => {
                  let fileName = file.substr(file.lastIndexOf("/") + 1);
                  return (
                    <Grid item key={index}>
                      <div className="bg-[#fdfdfd] mb-3 p-[9] w-[fit-content] pl-[20] pr-[20] cursor-pointer rounded-[5px] h-fit">
                        <a href={file} target="_blank">
                          {fileName}
                          <span className="relative float-left mr-[5px]">
                            <PaperClipIcon />
                          </span>
                        </a>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>

              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                rowSpacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{
                  width: "calc(100% - 50px) !important",
                  alignSelf: " center",
                }}>
                <Grid item xs={12} md={6}>
                  <div className="text-black font-bold font-inter mb-2">
                    Video URLs:
                  </div>
                  {activeTask.videos?.map((url, index) => (
                    <div className="mb-3 flex items-center" key={index}>
                      <iframe
                        className="rounded-md mr-5"
                        width="344"
                        height="188"
                        src={
                          "https://www.youtube.com/embed/" + url.substring(17)
                        }
                        title="YouTube video player"
                        frameBorder={"0"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    </div>
                  ))}
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="text-black font-bold font-inter mb-2">
                    Website URLs:
                  </div>
                  {activeTask.urls?.map((url, index) => (
                    <Grid item>
                      <div className="relative bg-[#fdfdfd] text-sm mb-3 p-[9] pt-[5] h-[35] text-ellipsis overflow-hidden cursor-pointer rounded-[5px]">
                        <a
                          href={url.includes("http") ? url : `https://${url}`}
                          target="_blank"
                          className="whitespace-nowrap">
                          {url}
                        </a>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {["in_progress", "submitted"].includes(activeTask.status) &&
                !isloadingTask && (
                  <Formik
                    initialValues={{
                      delivery: activeTask.delivery, // || defaultDeliveryState,
                      /*
                      delivery: {
                        attachments: activeTask.delivery.attachments
                          ? activeTask.delivery.attachments
                          : defaultDeliveryState.attachments,
                        description: activeTask.delivery.description,
                        urls: activeTask.delivery?.urls
                          ? [...activeTask.delivery.urls, ""]
                          : defaultDeliveryState.urls,
                        videos: activeTask.delivery?.videos
                          ? [...activeTask.delivery.videos, ""]
                          : defaultDeliveryState.videos,
                      },
                      */
                    }}
                    onSubmit={(values, formikHelpers) => {
                      // Used when submit is triggered in useEffect in child component - will update task after file upload
                      deliverTask({
                        task: values,
                        doSubmit: false,
                        toDashboard: false,
                      });
                    }}>
                    {({
                      values,
                      errors,
                      setFieldValue,
                      resetForm,
                      handleSubmit,
                    }) => {
                      return (
                        <Grid container rowGap={2}>
                          <Grid item xs={12}>
                            <div className="mt-[30] mb-[20]">
                              <span className="text-[20px] font-bold ">
                                YOUR OUTPUT
                              </span>
                            </div>
                            <Form onSubmit={handleSubmit}>
                              <Grid container columnGap={2} rowGap={2}>
                                <Grid container rowGap={2} columnGap={2}>
                                  <Grid item xs={11}>
                                    <div className="text-base font-bold ">
                                      Attachments:
                                    </div>
                                  </Grid>
                                  {activeTask.delivery?.attachments?.map(
                                    (file, index) => {
                                      let fileName = file.substr(
                                        file.lastIndexOf("/") + 1,
                                      );
                                      return (
                                        <Grid item key={index}>
                                          <div className="relative bg-[#fdfdfd] text-sm mb-3 p-[9] pl-[30] pt-[5] h-[35] w-[155] text-ellipsis overflow-hidden cursor-pointer rounded-[5px]">
                                            <a
                                              href={file}
                                              target="_blank"
                                              className="whitespace-nowrap">
                                              {fileName}
                                            </a>
                                            <div className="absolute left-[10] top-[8]">
                                              <PaperClipIcon className="h-[14] w-[14]" />
                                            </div>
                                          </div>
                                        </Grid>
                                      );
                                    },
                                  )}
                                </Grid>
                                <Grid item xs={11}>
                                  <FileUpload
                                    onFinishUploading={(attachments) => {
                                      // let task = Object.assign({}, activeTask);
                                      // task.delivery.attachments = [...task.delivery.attachments, ...attachments];
                                      // setActiveTask(task);
                                      // updateTask(task);

                                      setFieldValue("delivery.attachments", [
                                        ...values.delivery?.attachments,
                                        ...attachments,
                                      ]);
                                      // setSubmitAfterUpload(true); // Setting the value so that it can be picked up in UseEffects hook
                                      // Cannot call submit direclty here because the `values` will not yet contain the resulf of setFieldValue since it is an async method that relies on setState
                                    }}
                                  />
                                </Grid>

                                <Grid container className="grid lg:grid-cols-2">
                                  <div>
                                    <label className="block mb-3 font-bold text-black ">
                                      Video URLs
                                    </label>
                                    {values.delivery.videos
                                      .slice(0, -1)
                                      .map((url, index) => (
                                        <div
                                          className="mb-3 flex items-center"
                                          key={index}>
                                          <iframe
                                            className="rounded-md mr-5"
                                            width="344"
                                            height="188"
                                            src={
                                              "https://www.youtube.com/embed/" +
                                              url.substring(17)
                                            }
                                            title="YouTube video player"
                                            frameBorder={"0"}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>
                                          <div
                                            className="cursor-pointer"
                                            onClick={(event) => {
                                              setFieldValue(
                                                "delivery.videos",
                                                (values.delivery.videos = [
                                                  ...values.delivery.videos.slice(
                                                    0,
                                                    index,
                                                  ),
                                                  ...values.delivery.videos.slice(
                                                    index + 1,
                                                  ),
                                                ]),
                                              );
                                            }}>
                                            <MinusCircleIcon />
                                          </div>
                                        </div>
                                      ))}
                                    {values.delivery.videos.length >= 1 && (
                                      <div className="mb-3 flex items-center">
                                        <TextField
                                          sx={{ width: 360 }}
                                          multiline={false}
                                          rows={1}
                                          className="bg-[#fdfdfd] w-4/5 mr-5 m-0 rounded-md"
                                          variant="filled"
                                          size="small"
                                          value={
                                            values.delivery.videos[
                                              values.delivery.videos.length - 1
                                            ]
                                          }
                                          InputProps={{
                                            disableUnderline: true,
                                          }}
                                          onChange={(event) => {
                                            setFieldValue(
                                              `delivery.videos[${
                                                values.delivery.videos.length -
                                                1
                                              }]`,
                                              event.target.value,
                                            );
                                          }}
                                          inputProps={{
                                            style: { padding: "10px 12px" },
                                          }}
                                        />
                                        <div
                                          className="cursor-pointer"
                                          onClick={() => {
                                            let url =
                                              values.delivery.videos[
                                                values.delivery.videos.length -
                                                  1
                                              ];
                                            if (
                                              url.indexOf("https://youtu.be/") >
                                              -1
                                            ) {
                                              setFieldValue(
                                                "delivery.videos",
                                                values.delivery.videos.concat([
                                                  "",
                                                ]),
                                              );
                                            } else {
                                              alert(
                                                "Not a valid YouTube share link",
                                              );
                                            }
                                          }}>
                                          <PlusCircleIcon />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <label className="block mb-3 font-bold text-black ">
                                      Website URLs
                                    </label>
                                    {values.delivery.urls.map((url, index) => (
                                      <div
                                        className="mb-3 flex items-center"
                                        key={index}>
                                        <TextField
                                          sx={{ width: 360 }}
                                          multiline={false}
                                          rows={1}
                                          className="bg-[#fdfdfd] w-4/5 mr-5 m-0 rounded-md"
                                          variant="filled"
                                          size="small"
                                          value={url}
                                          InputProps={{
                                            disableUnderline: true,
                                          }}
                                          onChange={(event) => {
                                            setFieldValue(
                                              `delivery.urls[${index}]`,
                                              event.target.value,
                                            );
                                          }}
                                          inputProps={{
                                            style: { padding: "10px 12px" },
                                          }}
                                        />
                                        {index ===
                                        values.delivery.urls.length - 1 ? (
                                          <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                              setFieldValue(
                                                "delivery.urls",
                                                values.delivery.urls.concat([
                                                  "",
                                                ]),
                                              );
                                            }}>
                                            <PlusCircleIcon />
                                          </div>
                                        ) : (
                                          <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                              const urls = [
                                                ...values.delivery.urls.slice(
                                                  0,
                                                  index,
                                                ),
                                                ...values.delivery.urls.slice(
                                                  index + 1,
                                                ),
                                              ];
                                              setFieldValue(
                                                "delivery.urls",
                                                urls,
                                              );
                                            }}>
                                            <MinusCircleIcon />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </Grid>

                                <Grid container columnGap={2} rowGap={2}>
                                  <Grid item xs={11}>
                                    <div className="font-bold text-black  font-base">
                                      Description
                                    </div>
                                  </Grid>
                                  <Grid item xs={11}>
                                    <TextField
                                      fullWidth
                                      placeholder="Add description here"
                                      multiline={true}
                                      rows={4}
                                      variant="filled"
                                      value={values.delivery?.description}
                                      onChange={(event) => {
                                        setFieldValue(
                                          `delivery.description`,
                                          event.target.value,
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={11}
                                    className="flex flex-row items-center mb-[30] gap-[5]">
                                    {["in_progress", "submitted"].includes(
                                      activeTask.status,
                                    ) && (
                                      <>
                                        <Button
                                          variant="contained"
                                          onClick={() => {
                                            deliverTask({
                                              task: values,
                                              doSubmit: false,
                                              toDashboard: true,
                                            });
                                          }}
                                          disabled={
                                            changeTaskLoading ||
                                            isUpdatingTask ||
                                            rejected ||
                                            isTaskBeingRejected
                                          }
                                          className="hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6">
                                          Save
                                        </Button>
                                        <Button
                                          variant="contained"
                                          onClick={() => {
                                            deliverTask({
                                              task: values,
                                              doSubmit: true,
                                              toDashboard: true,
                                            });
                                          }}
                                          disabled={
                                            changeTaskLoading ||
                                            isUpdatingTask ||
                                            activeTask.status === "submitted" ||
                                            isTaskBeingRejected
                                          }
                                          className={`
                                            ${
                                              activeTask.status === "submitted"
                                                ? "hidden "
                                                : ""
                                            }
                                            hover:cursor-pointer bg-[#806AD2] w-48 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6 ml-4 
                                            shadow-none`}>
                                          Submit for approval
                                        </Button>
                                      </>
                                    )}
                                    <Button
                                      variant="contained"
                                      onClick={handleReject}
                                      disabled={
                                        changeTaskLoading ||
                                        isUpdatingTask ||
                                        activeTask.status === "submitted" ||
                                        isTaskBeingRejected
                                      }
                                      className={`
                                      ${
                                        activeTask.status === "submitted"
                                          ? "hidden "
                                          : ""
                                      }
                                        hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6 ml-4`}>
                                      Reject Task
                                    </Button>
                                    <Button
                                      style={{ textTransform: "none" }}
                                      className="text-black font-bold ml-4 mt-3 w-12 h-12"
                                      variant="text"
                                      disabled={
                                        changeTaskLoading || isUpdatingTask
                                      }
                                      onClick={() => navigate(-1)}>
                                      Cancel
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <AutoSubmitForm></AutoSubmitForm>
                            </Form>
                          </Grid>
                        </Grid>
                      );
                    }}
                  </Formik>
                )}
              {activeTask.status === "clarification_needed" && (
                <StyledPurpleButton
                  variant="contained"
                  className="bg-[#EF6775]"
                  disabled={changeTaskLoading || isUpdatingTask}
                  onClick={() => mutateChangeTaskState("clarification_ended")}>
                  Clarification Done
                </StyledPurpleButton>
              )}
            </Grid>
          </Box>
        </FormStyle>
        <CommentsContainer
          className="flex flex-col w-[960] min-h-[120] bg-commentBg rounded h-50 mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] justify-center items-center"
          style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
          <div className="flex w-full pl-[40px] pr-[80px] md:pr-[115px] flex-col">
            <span className="font-inter font-bold text-base mb-3 mt-6">
              Comments:
            </span>
            <Formik
              initialValues={{ comment: "" }}
              validationSchema={CommentSchema}
              onSubmit={(values, formikHelpers) => {
                mutateSubmitComment({
                  text: values.comment,
                  role: "pa",
                  user_id: auth.user_id,
                });
                formikHelpers.resetForm();
              }}>
              {({ values, errors, setFieldValue, resetForm, handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <TextField
                      id="comment-field"
                      name="comment-field"
                      label="Add a comment"
                      type="text"
                      variant="filled"
                      className="w-full"
                      value={values.comment}
                      onChange={(event) => {
                        setFieldValue("comment", event.target.value);
                      }}
                      error={!!errors.comment}
                    />
                    <div className="flex justify-end">
                      <StyledButton
                        variant="contained"
                        type="submit"
                        disabled={isSubmittingComment}
                        className="hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6">
                        Post
                      </StyledButton>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>

          <div className="flex w-4/5 flex-col mt-10">
            {activeTask.comments &&
              activeTask.comments.length > 0 &&
              activeTask.comments
                .map((cmt, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full flex-col"
                      style={{
                        marginBottom: index === 0 ? 60 : 20,
                      }}>
                      <div>
                        <span className="font-bold font-inter text-xs mr-3">
                          {cmt.role === "nft"
                            ? "Task Owner"
                            : "Personal Assistant"}
                        </span>
                        <span className="font-inter text-xs">
                          {new Date(cmt.created_date).toDateString()}
                        </span>
                      </div>
                      <div>
                        <span>{cmt.text}</span>
                      </div>
                    </div>
                  );
                })
                .reverse()}
          </div>
        </CommentsContainer>
      </FormContainer>
      <Modal
        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        open={rejectModal}
        onClose={closeRejectModal}>
        <div style={{ width: 450 }}>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <Typography fontWeight={700} fontFamily="Inter">
              Do you wish to remove yourself from this task without having
              finished it? Your rating will be unaffected but you will receive
              -2 points for doing so.
            </Typography>
          </div>
          <ConfirmButton
            variant="contained"
            onClick={handleConfirmReject}
            fullWidth>
            Yes, reject the task
          </ConfirmButton>
          <CancelButton variant="contained" onClick={closeRejectModal} fullWidth>
            No, Cancel
          </CancelButton>
        </div>
      </Modal>
      
    </StyledContainer>
  );
  function handleReject() {
    setRejectModal(true);
  }
  function closeRejectModal() {
    setRejectModal(false);
  }
  function handleConfirmReject() {
    rejectTaskSubmission();
  }
};

export default Component;