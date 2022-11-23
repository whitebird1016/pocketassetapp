import React, { useRef } from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import FileUpload from "../../organisms/FileUpload";
import HTMLTextRender from "../../organisms/HTMLTextRender";
import { Task } from "../../../interfaces/Task";
import { taskState, TaskTypes } from "../../../state/atoms";
import { CommentSchema } from "./validation";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";

import {
  TextField,
  MenuItem,
  Stack,
  Select,
  Divider,
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { PaperClipIcon, Pen, Energy } from "../../../assets/svg";
import ownerStatuses from "../../../assets/ownerStatuses";
import paStatuses from "../../../assets/paStatuses";

const allStatuses = { ...ownerStatuses, ...paStatuses };

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  min-width: 1100px;
  width: 100%;

  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
  }
`;

const TaskWrapper = styled.div`
  min-width: 1100px;
  width: 75%;
  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
  }
`;

const CreateTaskHeader = styled.div`
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 1099px) {
    margin-left: 5%;
  }
`;

const FormContainer = styled.div`
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const FormStyle = styled.div`
  justify-content: center;
  align-items: center;

  width: 960px;

  @media only screen and (max-width: 960px) {
    width: 100% !important;
  }
`;

const Header = styled.div`
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const CommentsContainer = styled.div`
  width: 960px;

  @media only screen and (max-width: 960px) {
    width: 100% !important;
  }
`;

const Body = styled.div``;

const StyledButton = styled(Button)`
  text-transform: none;
  border-radius: 50px;
`;

const URLContainer = styled.div`
  .MuiFilledInput-input {
    padding-top: 10px !important;
  }
`;

type Props = {
  handleSubmit: (values: any) => void;
  showRatingModal: (values: any) => void;
  addRating: (values: any) => void;
  submitComment: (values: any) => void;
  isSubmittingComment: boolean;
  holder_id: string | null;
  updateTask: (task: any) => void;
  completeTask: () => void;
  isTaskCompleting: boolean;
  rejectTaskSubmission: () => void;
  isTaskBeingRejected: boolean;
  submissionRejected: boolean;
};

const Component = ({
  handleSubmit,
  submitComment,
  isSubmittingComment,
  holder_id = "",
  updateTask,
  completeTask,
  isTaskCompleting,
  rejectTaskSubmission,
  isTaskBeingRejected,
  submissionRejected,
  addRating,
  showRatingModal,
}: Props) => {
  const navigate = useNavigate();

  //Datepicker
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [activeTask, setActiveTask] = useRecoilState<Task>(taskState);
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(2);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  // State to store uploaded file
  const [file, setFile] = React.useState("");
  const inputRef = useRef(null);
  const handleFileChange = (event) => {
    setFile(event.target.files && event.target.files[0]);
  };

  /*
  const isStatusChangePossible = function () {
    return ["draft", "submitted"].includes(activeTask.status);
  };
  */

  const isEditAllowed = () => {
    return ["draft"].includes(activeTask.status);
  };

  const handleEditClick = function () {
    navigate("/tasks/edit/" + activeTask.task_id);
  };

  // Upload file preview.
  const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  };

  const handleFinishUploading = (attachments: string[]) => {
    let task = Object.assign({}, activeTask);
    task.attachments = [...task.attachments, ...attachments];
    setActiveTask(task);
    updateTask(task);
  };

  return (
    <StyledContainer className="antialiased bg-mainBg">
      <TaskWrapper>
        <CreateTaskHeader className="mb-10">
          <p className="font-Inter text-xs text-black">
            <span
              className=" text-black hover:cursor-pointer hover:underline"
              onClick={() => navigate("/")}>
              Owner Dashboard
            </span>
            {" >"} View Task{" "}
          </p>
          <p className="font-Inter text-4xl text-black font-bold my-2">
            View Task
          </p>
        </CreateTaskHeader>

        <FormContainer className="flex flex-col justify-center">
          <FormStyle className="bg-white shadow-lg">
            <Header className="px-10 flex justify-between bg-[#ffdea0]">
              <div className="text-xl font-bold">
                {activeTask.status
                  ? allStatuses[activeTask.status]
                  : activeTask.status}
              </div>
              {isEditAllowed() ? (
                <div onClick={handleEditClick} className="cursor-pointer">
                  <Pen></Pen>
                </div>
              ) : null}
            </Header>
            {/* <Divider light className="w-full" /> */}
            <Box ml="40px" mr="40px">
              <h2>{activeTask.title}</h2>
              <Grid container rowGap={2}>
                <Grid container columnGap={2}>
                  <Grid item xs={2}>
                    <div className="text-base font-bold ">Date</div>
                  </Grid>
                  <Grid item xs={7}>
                    <span className="text-base">
                      {new Date(activeTask.date || Date.now()).toDateString()}
                    </span>
                  </Grid>
                </Grid>
                <Grid container columnGap={2}>
                  <Grid item xs={2}>
                    <div className="text-base font-bold ">Task Type</div>
                  </Grid>
                  <Grid item xs={7}>
                    <span className="text-base">
                      {
                        TaskTypes.find(
                          (type) => type.value === activeTask?.category || "",
                        )?.name
                      }
                    </span>
                  </Grid>
                </Grid>
                <Grid container columnGap={2}>
                  <Grid item xs={2}>
                    <div className="text-base font-bold ">Topic</div>
                  </Grid>
                  <Grid item xs={7}>
                    <span className="text-base">{activeTask?.topic}</span>
                  </Grid>
                </Grid>
                <Grid container columnGap={2}>
                  <Grid item xs={2}>
                    <div className="text-base font-bold ">Energy</div>
                  </Grid>
                  <Grid item xs={7}>
                    <span className="text-base">
                      {new Array(activeTask?.energy_assigned || 0)
                        .fill(null)
                        .map(() => (
                          <Energy className="mr-[10]" />
                        ))}
                    </span>
                  </Grid>
                </Grid>
                <Grid container columnGap={2}>
                  <Grid item xs={11}>
                    <div className="text-base font-bold ">Description</div>
                  </Grid>
                  <Grid item xs={11}>
                    <HTMLTextRender
                      key={activeTask.task_id}
                      htmlString={activeTask?.description?.replaceAll(
                        "<br/>",
                        "\n",
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="text-black text-sm font-bold font-inter mb-2">
                    Video URLs
                  </div>
                  {activeTask?.videos?.map((url, index) => (
                    <div className="mb-3 flex items-center" key={index}>
                      <iframe
                        className="rounded-md mr-5 w-full h-[180] md:w-[344] md:h-[180]"
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
                  <div className="text-black text-sm font-bold font-inter mb-2">
                    Website URLs
                  </div>
                  {activeTask?.urls?.map((url, index) => (
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
                <Grid container rowGap={2} columnGap={2}>
                  <Grid item xs={11}>
                    <div className="text-base font-bold ">Attachments</div>
                  </Grid>
                  {activeTask.attachments?.map((file) => {
                    let fileName = file.substr(file.lastIndexOf("/") + 1);
                    return (
                      <Grid item>
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
                  })}
                </Grid>
                {activeTask?.status === "draft" && (
                  <Grid container>
                    <Grid item xs={11}>
                      <FileUpload onFinishUploading={handleFinishUploading} />
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Stack className="mb-10 mt-10 " spacing={2} direction="row">
                {activeTask?.status === "draft" ? (
                  !loading ? (
                    <Button
                      style={{ textTransform: "none" }}
                      className="bg-[#806AD2] w-40 h-12 text-white font-bold rounded-full"
                      variant="contained"
                      onClick={async () => {
                        setLoading(true);
                        handleSubmit({ state: "published" });
                      }}>
                      Publish task
                    </Button>
                  ) : (
                    <Button
                      style={{
                        display: "flex",
                        textTransform: "none",
                        backgroundColor: "rgb(0,0,0,0.5)",
                        gap: "10px",
                      }}
                      className="bg-[#806AD2] w-40 h-12 text-white font-bold rounded-full"
                      variant="contained">
                      <div> Publish task</div>
                      <CircularProgress size="30px" />
                    </Button>
                  )
                ) : null}
                {activeTask?.status === "published" ? (
                  !loading ? (
                    <Button
                      style={{ textTransform: "none" }}
                      className="bg-[#806AD2] w-40 h-12 text-white font-bold rounded-full gap-4	"
                      variant="contained"
                      onClick={async () => {
                        setLoading(true);
                        handleSubmit({ state: "draft" });
                      }}>
                      Set task to Draft
                    </Button>
                  ) : (
                    <Button
                      style={{
                        display: "flex",
                        textTransform: "none",
                        backgroundColor: "rgb(0,0,0,0.5)",
                        gap: "15px",
                      }}
                      className="bg-sky-500/[.06] w-60 h-12 text-white font-bold rounded-full"
                      variant="contained">
                      <div>Set task to Draft</div>
                      <CircularProgress size="30px" />
                    </Button>
                  )
                ) : null}
                <Button
                  style={{ textTransform: "none" }}
                  className="text-black font-bold"
                  variant="text"
                  onClick={async () => {
                    navigate("/");
                  }}>
                  Back
                </Button>
              </Stack>
            </Box>
          </FormStyle>
          <CommentsContainer
            className="flex flex-col w-[960] min-h-[120] bg-commentBg rounded h-50 mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] justify-center items-center"
            style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
            <div className="flex w-full pl-[40px] pr-[40px] flex-col">
              <span className="font-inter font-bold text-base mb-3 mt-6">
                Comments:
              </span>
              <Formik
                initialValues={{ comment: "" }}
                validationSchema={CommentSchema}
                onSubmit={(values, formikHelpers) => {
                  setLoading2(true);
                  setTimeout(() => {
                    submitComment({
                      text: values.comment,
                      role: "nft",
                      user_id: holder_id,
                    });
                    formikHelpers.resetForm();
                    setLoading2(false);
                  }, 1000);
                }}>
                {({
                  values,
                  errors,
                  setFieldValue,
                  resetForm,
                  handleSubmit,
                }) => {
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
                        {/**
                        <div
                          onClick={() => resetForm}
                          className="hover:cursor-pointer bg-[transparent] text-black border-0 w-max-content font-inter mt-3 p-0.5 mr-5">
                          Cancel
                        </div>
                        */}
                        {!loading2 ? (
                          <StyledButton
                            variant="contained"
                            type="submit"
                            disabled={isSubmittingComment}
                            className="hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6">
                            Post
                          </StyledButton>
                        ) : (
                          <Button
                            style={{
                              display: "flex",
                              textTransform: "none",
                              backgroundColor: "rgb(0,0,0,0.5)",
                              gap: "20px",
                            }}
                            className="hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 "
                            variant="contained">
                            <div>Post</div>
                            <CircularProgress size="30px" />
                          </Button>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>

            <div className="flex w-4/5 flex-col mt-10">
              {activeTask?.comments &&
                activeTask.comments.length > 0 &&
                activeTask.comments
                  .map((cmt, index) => {
                    return (
                      <div
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

          {["submitted", "completed"].includes(activeTask?.status) && (
            <FormStyle className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white shadow-lg mb-8">
              <Header className="px-10 flex justify-between bg-[#ffdea0]">
                <div className="text-xl font-bold">Output</div>
              </Header>
              {/* <Divider light className="w-full" /> */}
              <Box ml="40px" mb="30px">
                <Grid container columnGap={2}>
                  <Grid item xs={11} md={6}>
                    <Grid container rowGap={2} mt="20px">
                      <Grid item xs={12}>
                        <div className="font-bold text-base">Progress</div>
                      </Grid>
                      {!!activeTask?.delivery?.description && (
                        <Grid item xs={12}>
                          <div className="text-base">
                            {activeTask?.delivery?.description}
                          </div>
                        </Grid>
                      )}

                      <Grid
                        item
                        xs={12}
                        className="bg-mainBg px-2 py-3 rounded">
                        <Grid container rowGap={2}>
                          <Grid
                            container
                            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                            rowSpacing={{ xs: 1, sm: 2, md: 2 }}>
                            <Grid item xs={12} md={6}>
                              <div className="text-black text-sm font-bold font-inter mb-2">
                                Video URLs
                              </div>
                              {activeTask?.delivery?.videos?.map(
                                (url, index) => (
                                  <div
                                    className="mb-3 flex items-center"
                                    key={index}>
                                    <iframe
                                      className="rounded-md mr-5 w-3/4 h-[180] md:w-[200] md:h-[140]"
                                      src={
                                        "https://www.youtube.com/embed/" +
                                        url.substring(17)
                                      }
                                      title="YouTube video player"
                                      frameBorder={"0"}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen></iframe>
                                  </div>
                                ),
                              )}
                              {!activeTask?.delivery?.videos ||
                              activeTask?.delivery?.videos?.length === 0 ? (
                                <div className="mb-3 ml-10 flex items-center">
                                  Empty
                                </div>
                              ) : null}
                            </Grid>

                            <Grid item xs={12} md={6}>
                              <div className="text-black text-sm font-bold font-inter mb-2">
                                Website URLs
                              </div>
                              {activeTask?.delivery?.urls?.map((url, index) => (
                                <Grid item>
                                  <div className="relative bg-[#fdfdfd] text-sm mb-3 p-[9] pt-[5] h-[35] text-ellipsis overflow-hidden cursor-pointer rounded-[5px]">
                                    <a
                                      href={url}
                                      target="_blank"
                                      className="whitespace-nowrap">
                                      {url}
                                    </a>
                                  </div>
                                </Grid>
                              ))}
                              {!activeTask?.delivery?.urls ||
                              activeTask?.delivery?.urls?.length === 0 ? (
                                <div className="mb-3 ml-10 flex items-center">
                                  Empty
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid container rowGap={2} columnGap={2}>
                            {activeTask.delivery?.attachments?.map((file) => {
                              let fileName = file.substr(
                                file.lastIndexOf("/") + 1,
                              );
                              return (
                                <Grid item>
                                  <div className="relative bg-[#fdfdfd] text-sm mb-1 p-[9] pl-[30] pt-[5] h-[35] w-[155] text-ellipsis overflow-hidden cursor-pointer rounded-[5px]">
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
                            })}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={11} md={5} mt="20px">
                    <Grid container rowGap={2}>
                      <Grid item>
                        <div className="font-bold text-base"> Rating</div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className="bg-mainBg px-2 py-3 rounded flex flex-col items-center justify-center">
                        {activeTask.status !== "completed" ? (
                          <div>Set mark as complete</div>
                        ) : activeTask.rating === 0 || !activeTask.rating ? (
                          <Button
                            style={{ textTransform: "none" }}
                            className="text-black font-bold"
                            variant="text"
                            onClick={showRatingModal}>
                            Give Feedback
                          </Button>
                        ) : (
                          <div>
                            <Rating
                              name="size-large"
                              defaultValue={activeTask.rating}
                              sx={{ fontSize: "50px" }}
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                            />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <StyledButton
                    variant="contained"
                    type="submit"
                    onClick={completeTask}
                    disabled={
                      activeTask.status !== "submitted" ||
                      isTaskCompleting ||
                      isTaskBeingRejected ||
                      submissionRejected
                    }
                    className=" hover:cursor-pointer disabled:bg-[grey] bg-primaryButton text-white w-max-content font-inter mt-3 p-0.5 pl-6 pr-6">
                    Mark as Complete
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    type="submit"
                    onClick={rejectTaskSubmission}
                    disabled={
                      activeTask.status !== "submitted" ||
                      isTaskBeingRejected ||
                      isTaskCompleting ||
                      submissionRejected ||
                      activeTask.comments?.filter(
                        (comment) => comment.role === "nft",
                      ).length < 2
                    }
                    className=" hover:cursor-pointer disabled:bg-[grey] bg-primaryButton text-white w-max-content font-inter mt-3 p-0.5 pl-6 pr-6">
                    Reject the Submission
                  </StyledButton>
                  {submissionRejected && (
                    <div className="text-base py-2">
                      You have rejected the submission by the assistant. Please,
                      use comments to explain why, so the issue(s) can be
                      resolved.
                    </div>
                  )}
                </Grid>
                <Button
                  style={{ textTransform: "none" }}
                  className="text-black font-bold"
                  variant="text"
                  onClick={async () => {
                    navigate("/");
                  }}>
                  Back
                </Button>
              </Box>
            </FormStyle>
          )}
        </FormContainer>
      </TaskWrapper>
    </StyledContainer>
  );
};

export default Component;
