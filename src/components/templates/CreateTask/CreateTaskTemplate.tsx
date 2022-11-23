import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CircularProgress from "@mui/material/CircularProgress";

import { Task } from "../../../interfaces/Task";
import { taskState, TaskTopics, TaskTypes } from "../../../state/atoms";
import {
  FormControl,
  TextField,
  MenuItem,
  Stack,
  Select,
  Divider,
  Button,
  Rating,
  Box,
  SelectChangeEvent,
  Grid,
  Tooltip,
  Switch,
  Typography,
} from "@mui/material";
import {
  EnergyBar,
  InfoCircelIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  PaperClipIcon,
  UploadIcon,
} from "../../../assets/svg";

import TextEditor from "../../organisms/TextEditor";
import FormError from "../../organisms/FormError";
import { TaskSchema } from "./validation";

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
`;

const StyledSelect = styled(Select)`
  > div {
    padding-top: 10px;
  }
`;

const StyledSwitch = styled(Switch)`
  font-family: Inter;
  .MuiSwitch-switchBase.Mui-checked {
    color: #806ad2;
    &.Mui-checked + .MuiSwitch-track {
      background-color: #806ad2;
    }
  }
`;

type Props = {
  handleSubmit: (values: any) => void;
  mode: string;
};

const Component = ({ handleSubmit, mode }: Props) => {
  const [activeTask] = useRecoilState<Task>(taskState);
  const [isPublish, setIsPublish] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  /*
  //Datepicker
  const [value, setValue] = React.useState<Date | null>(new Date());
  
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const [task, setTask] = React.useState("");

  // Handle selected task event
  const handleTask = (event: SelectChangeEvent) => {
    setTask(event.target.value);
  };

  // State to store uploaded file
  const [file, setFile] = React.useState("");
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files && event.target.files[0]);
  };
  */

  const getModeLabel = () => {
    return mode === "create" ? "Create Task" : "Edit Task";
  };

  const getCreateLabel = () => {
    return isPublish
      ? "Once published, the task can no longer be edited. You can always change the task to draft mode later to make changes as long as it has not been selected by a PA."
      : "In draft mode you can edit the task freely until you choose to publish it.";
  };

  const getModeSaveLabel = () => {
    return mode === "create" ? "Create" : "Save Task";
  };

  // Upload file preview.
  const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
  };

  return (
    <StyledContainer className="antialiased bg-mainBg">
      <TaskWrapper>
        {
          <CreateTaskHeader className="mb-10">
            <p className="font-Inter text-xs text-black">
              <span
                className=" text-black hover:cursor-pointer hover:underline"
                onClick={() => navigate("/")}>
                Owner Dashboard
              </span>
              {" > " + getModeLabel() + " "}
            </p>
            <p className="font-Inter text-4xl text-black font-bold my-2">
              {getModeLabel()}
            </p>
          </CreateTaskHeader>
        }
        <FormContainer className="flex flex-col justify-center mt-10">
          <FormStyle className="mx-auto bg-white shadow-lg">
            <Header className="px-10 flex justify-between bg-[#ffdea0]">
              <h2 className="">Task Information</h2>

              {/* <Divider light className="w-full" /> */}
            </Header>

            <Formik
              initialValues={{
                date: activeTask.date ? new Date(activeTask.date) : new Date(),
                category: activeTask.category,
                title: activeTask.title,
                energy_assigned: activeTask.energy_assigned,
                description: activeTask.description,
                topic: activeTask.topic,
                status: activeTask.status,
                attachments: activeTask.attachments,
                videos: [...activeTask.videos, ""], // ["https://www.youtube.com/embed/c80LZn-cLTs",
                urls: [...activeTask.urls, ""],
              }}
              validationSchema={TaskSchema}
              onSubmit={async (values) => {
                setLoading(true);
                setTimeout(() => {
                  handleSubmit({ task: values, isPublish });
                  setLoading(false);
                }, 1000);
              }}>
              {({ values, setFieldValue, touched, errors }) => {
                return (
                  <Form className="mt-5">
                    <Box style={{ marginLeft: "40px" }}>
                      <Grid container rowGap={3}>
                        <Grid container columnGap={2}>
                          <Grid item xs={2} className="flex items-center">
                            <div className="text-base font-bold text-black">
                              Title
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              sx={{ minWidth: 200 }}
                              className="bg-[#fdfdfd] lg:w-full rounded-md"
                              variant="filled"
                              size="small"
                              value={values.title}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  borderRadius: "0.375rem",
                                },
                              }}
                              inputProps={{
                                style: {
                                  padding: "10px 12px",
                                },
                              }}
                              onChange={(event) =>
                                setFieldValue("title", event.target.value)
                              }
                              placeholder="New task"
                            />
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>{touched.title && errors.title}</>
                            </FormError>
                          </Grid>
                        </Grid>
                        <Grid container columnGap={2}>
                          <Grid item xs={2} className="flex items-center">
                            <div className="text-base font-bold text-left text-black">
                              Schedule
                            </div>
                            <Tooltip title="Select a date on which you want the task to be shown to assistants (note, that only 'published' tasks are shown).">
                              <div className="flex items-center">
                                <InfoCircelIcon />
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={8}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                value={values.date}
                                onChange={(newValue) => {
                                  setFieldValue(
                                    "date",
                                    new Date(newValue || Date.now()),
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    inputProps={{
                                      ...params.inputProps,
                                      style: {
                                        maxWidth: "135px",
                                        padding: "10px 12px",
                                      },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </Grid>

                        <Grid container columnGap={2}>
                          <Grid item xs={2} className="flex items-center">
                            <div className="text-base font-bold text-left text-black">
                              Type
                            </div>
                            <Tooltip title="Please select a category for your task. It may be hard to choose, but this will help us improve our services.">
                              <div className="flex items-center">
                                <InfoCircelIcon />
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={8}>
                            <FormControl
                              className="bg-[#fdfdfd] rounded-md border"
                              variant="filled"
                              sx={{ minWidth: 207 }}>
                              <StyledSelect
                                disableUnderline
                                value={values.category}
                                className="rounded-md border"
                                onChange={(event) => {
                                  setFieldValue("category", event.target.value);
                                }}>
                                {TaskTypes.map((type, index) => (
                                  <MenuItem value={type.value} key={index}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </StyledSelect>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container columnGap={2}>
                          <Grid item xs={2} className="flex items-center">
                            <div className="text-base font-bold text-left text-black">
                              Topic
                            </div>
                            <Tooltip title="Your task should start with...">
                              <div className="flex items-center">
                                <InfoCircelIcon />
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={8}>
                            <FormControl
                              className="rounded-md border"
                              variant="filled"
                              sx={{ minWidth: 207 }}>
                              <StyledSelect
                                disableUnderline
                                value={values.topic}
                                className="rounded-md border"
                                onChange={(event) => {
                                  setFieldValue("topic", event.target.value);
                                }}>
                                {TaskTopics.map((type, index) => (
                                  <MenuItem value={type.value} key={index}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                              </StyledSelect>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container columnGap={2}>
                          <Grid item xs={2} className="flex items-center">
                            <div className="text-base font-bold text-left text-black">
                              Energy
                            </div>
                            <Tooltip title="Please select energy to assign (1 energy = 30 mins)">
                              <div className="flex items-center">
                                <InfoCircelIcon />
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item xs={7}>
                            <Button
                              sx={{ minWidth: 207 }}
                              style={{
                                textTransform: "none",
                                padding: "8px 0px",
                              }}
                              className="bg-[#f2f2f2] rounded-md">
                              <Rating
                                className="text-black"
                                name="energy"
                                defaultValue={values.energy_assigned}
                                getLabelText={(value: number) =>
                                  `${value} Heart${value !== 1 ? "s" : ""}`
                                }
                                icon={<EnergyBar filled />}
                                emptyIcon={<EnergyBar />}
                                onChange={(e, newVal) =>
                                  setFieldValue("energy_assigned", newVal)
                                }
                              />
                            </Button>
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>
                                {touched.energy_assigned &&
                                  errors.energy_assigned}
                              </>
                            </FormError>
                          </Grid>
                        </Grid>
                        <Grid container pt={"15px"} columnGap={3}>
                          <Grid item xs={2}>
                            <div className="block mb-2 font-bold text-black">
                              Description
                            </div>
                          </Grid>

                          <Grid item xs={11}>
                            <TextEditor
                              htmlString={values?.description}
                              onEditorChange={(string) => {
                                setFieldValue("description", string);
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid container className="grid lg:grid-cols-2">
                          <div>
                            <label className="block mb-3 font-bold text-black">
                              Video URLs
                            </label>
                            {values.videos.slice(0, -1).map((url, index) => (
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
                                      "videos",
                                      (values.videos = [
                                        ...values.videos.slice(0, index),
                                        ...values.videos.slice(index + 1),
                                      ]),
                                    );
                                  }}>
                                  <MinusCircleIcon />
                                </div>
                              </div>
                            ))}
                            <div className="mb-3 flex items-center">
                              <TextField
                                sx={{ width: 360 }}
                                multiline={false}
                                rows={1}
                                className="bg-[#fdfdfd] w-4/5 mr-5 m-0 rounded-md"
                                variant="filled"
                                size="small"
                                value={values.videos[values.videos.length - 1]}
                                InputProps={{ disableUnderline: true }}
                                onChange={(event) => {
                                  setFieldValue(
                                    `videos[${values.videos.length - 1}]`,
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
                                    values.videos[values.videos.length - 1];
                                  if (url.indexOf("https://youtu.be/") > -1) {
                                    setFieldValue(
                                      "videos",
                                      values.videos.concat([""]),
                                    );
                                  } else {
                                    alert("Not a valid YouTube share link");
                                  }
                                }}>
                                <PlusCircleIcon />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block mb-3 font-bold text-black">
                              Website URLs
                            </label>
                            {values.urls.map((url, index) => (
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
                                  InputProps={{ disableUnderline: true }}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `urls[${index}]`,
                                      event.target.value,
                                    );
                                  }}
                                  inputProps={{
                                    style: { padding: "10px 12px" },
                                  }}
                                />
                                {index === values.urls.length - 1 ? (
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setFieldValue(
                                        "urls",
                                        values.urls.concat([""]),
                                      );
                                    }}>
                                    <PlusCircleIcon />
                                  </div>
                                ) : (
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setFieldValue(
                                        "urls",
                                        (values.urls = [
                                          ...values.urls.slice(0, index),
                                          ...values.urls.slice(index + 1),
                                        ]),
                                      );
                                    }}>
                                    <MinusCircleIcon />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </Grid>
                        {mode === "create" && (
                          <Grid container>
                            <Grid
                              item
                              display="flex"
                              flexDirection="row"
                              alignItems="center">
                              <div className="font-inter text-base">Draft</div>
                              <StyledSwitch
                                checked={isPublish}
                                onChange={(_, checked) => setIsPublish(checked)}
                              />
                              <div className="font-inter text-base">
                                Publish
                              </div>
                            </Grid>
                            <Grid item xs={12} pr="10px">
                              <div className="text-sm font-inter italic">
                                *{getCreateLabel()}
                              </div>
                            </Grid>
                            <Grid item xs={12} pr="10px">
                              <div className="text-sm font-inter italic">
                                *To attach files to your task, save it in
                                "draft" mode and then add files.
                              </div>
                            </Grid>
                          </Grid>
                        )}
                        <Stack
                          className="mb-20 mt-10"
                          spacing={2}
                          direction="row">
                          {!loading ? (
                            <Button
                              style={{ textTransform: "none" }}
                              type="submit"
                              className="bg-[#806AD2] w-40 h-12 text-white font-bold rounded-full"
                              variant="contained">
                              {getModeSaveLabel()}
                            </Button>
                          ) : (
                            <Button
                              style={{
                                display: "flex",
                                textTransform: "none",
                                backgroundColor: "rgb(0,0,0,0.5)",
                                gap: "25px",
                              }}
                              className="bg-[#806AD2] w-40 h-12 text-white font-bold rounded-full"
                              variant="contained">
                              {getModeSaveLabel()}
                              <CircularProgress size="30px" />
                            </Button>
                          )}
                          <Button
                            style={{ textTransform: "none" }}
                            className="text-black font-bold"
                            variant="text"
                            onClick={() => navigate(-1)}>
                            Cancel
                          </Button>
                        </Stack>
                      </Grid>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </FormStyle>
        </FormContainer>
      </TaskWrapper>
    </StyledContainer>
  );
};

export default Component;
