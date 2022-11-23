import React, {
  useState,
  useMemo,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import TinderCard from "react-tinder-card";
import { useQuery, useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Counter from "../../../components/organisms/Counter";
import TaskCardTemplate from "../../templates/TaskCard";
import TaskViewTemplate from "../../templates/TaskView";
import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";
import { Energy } from "../../../assets/svg";

import {
  StyledContainer,
  StyledCardContainer,
  StyledCardTitle,
  StyledTaskTitle,
  StyledAddress,
  StyledCardInfo,
  StyledCardInfoText,
  StyledCardMainContainer,
  CancelButton,
  StyledCardLeftButton,
  StyledCardRightButton,
  StyledButtonGroup,
  StyledClarifyButton,
  StyledProgressButton,
  StyledCardBox,
  StyledCardInfoText2,
} from "./TaskCards.style";
import { changeTaskStatus, getTasksByStatus } from "../../../services/tasks";
import {
  getTasksTimeout,
  setTasksTimeout,
  getUserById,
  setIgnoreTask,
} from "../../../services/users";
import { XButton, CheckButton } from "../../../assets/svg";

// const Component = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [auth, setAuth] = useRecoilState(authState);
//   const [waitForRightSwipe, setWaitForRightSwipe] = useState<boolean>(false);
//   const [isSwiping, setIsSwiping] = useState<boolean>(false);
//   const setSnackbar = useContext(SnackbarContext);
//   const navigate = useNavigate();

//   // increase current index and show card
//   // const goBack = async () => {
//   //   if (!canGoBack) return;
//   //   const newIndex = currentIndex + 1;
//   //   updateCurrentIndex(newIndex);
//   //   await childRefs[newIndex].current.restoreCard();
//   // };

//   const {
//     data: userTimeout,
//     isLoading: userTimeoutLoading,
//     refetch: refetchUserTimeout,
//   } = useQuery(["fetchingUserTimeout", auth.accessToken], () => {
//     if (auth.accessToken) {
//       return getTasksTimeout(auth.accessToken);
//     }
//   });

//   const {
//     data: taskData,
//     isLoading,
//     refetch,
//   } = useQuery(
//     ["fetchingTasksPublished", auth.accessToken],
//     () => {
//       if (auth.accessToken) {
//         return getTasksByStatus(auth.accessToken, "published");
//       }
//     },
//     {
//       onSuccess: (resp) => {
//         setCurrentIndex(resp?.tasks?.length - 1);
//       },
//       onError: () => {
//         setSnackbar({
//           title: "Error",
//           content: "Failed to fetch the tasks. Please try again.",
//           type: "error",
//         });
//         navigate("/");
//       },
//     },
//   );

//   const {
//     mutate: mutateSetTimeout,
//     isLoading: isSettingTimeout,
//     error: errorSettingTimeout,
//   } = useMutation(
//     ["setTaskTimeout", auth.accessToken],
//     () => {
//       return setTasksTimeout(auth.accessToken);
//     },
//     {
//       onSuccess: (resp, variables) => {
//         refetchUserTimeout();
//         console.log("userTimeout :>> ", userTimeout);
//       },
//       onError: (e, variables) => {
//         console.log("error", e);
//         setSnackbar({
//           title: "Error",
//           content: "Error with tasks.",
//           type: "error",
//         });
//         navigate("/");
//       },
//     },
//   );

//   const {
//     mutate: mutateAcceptTask,
//     isLoading: isAcceptingTask,
//     error,
//   } = useMutation(
//     ["acceptTask", auth.accessToken],
//     async ({ status, taskId }: any) => {
//       let { user: tempUser } = await getUserById(
//         auth.accessToken,
//         auth.user_id,
//       );
//       // let tempUser = result.user;
//       if (status === "in_progress") {
//         if (tempUser.activeTasks && tempUser.activeTasks.length > 1) {
//           return Promise.reject({
//             message:
//               "You already have 2 open tasks. Please, finish one of those first.",
//           });
//         }
//       } else if (status === "clarification_needed") {
//         if (
//           tempUser.tasksBeingClarified &&
//           tempUser.tasksBeingClarified.length >= 3
//         ) {
//           return Promise.reject({
//             message:
//               "You already have 3 tasks that needs clarification. Please, get one of those clarifed before adding more.",
//           });
//         }
//       }
//       return changeTaskStatus(auth.accessToken, taskId, status);
//     },
//     {
//       onSuccess: (resp, variables) => {
//         setSnackbar({
//           title: "Success",
//           content: "The task was successfully assigned to you.",
//           type: "success",
//         });
//         navigate("/", { replace: true });
//       },
//       onError: (e: any, variables: any) => {
//         console.log("error", e);
//         let content = e.message
//           ? e.message
//           : "Failed to assign the task. Please, try again.";
//         setSnackbar({
//           title: "Error",
//           content: content,
//           type: "error",
//         });
//       },
//     },
//   );

//   const [tasks, setTasks] = useState(taskData?.tasks || []);
//   console.log(tasks);
//   useEffect(() => {
//     const ignoreTasks = JSON.parse(localStorage.getItem("ignore_tasks"));
//     if (taskData?.tasks !== undefined || tasks.length < 0) {
//       setTasks(taskData?.tasks);
//     }
//     if (tasks.length > 0) {
//       setTasks(
//         tasks.filter((item) => {
//           return !ignoreTasks.includes(item.task_id);
//         }),
//       );
//     }
//   }, [localStorage.getItem("ignore_tasks"), taskData?.tasks]);
//   useEffect(() => {
//     if (currentIndex === -1) {
//       mutateSetTimeout();
//     }
//   }, [currentIndex]);

//   const childRefs: any = useMemo(
//     () =>
//       Array(tasks.length)
//         .fill(0)
//         .map((i) => React.createRef()),
//     [tasks],
//   );
//   const outOfFrame = (name, idx) => {
//     if (!waitForRightSwipe) {
//       setWaitForRightSwipe(true);
//     }
//     console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
//     // handle the case in which go back is pressed before card goes outOfFrame
//     currentIndexRef.current >= idx && childRefs[idx]?.current?.restoreCard();
//     // TODO: when quickly swipe and restore multiple times the same card,
//     // it happens multiple outOfFrame events are queued and the card disappear
//     // during latest swipes. Only the last outOfFrame event should be considered valid
//   };

//   const swipe = useCallback(
//     async (dir) => {
//       try {
//         if (canSwipe && currentIndex < tasks.length) {
//           setWaitForRightSwipe(false);
//           await childRefs?.[currentIndex]?.current?.swipe(dir); // Swipe the card!
//         }
//       } catch (e: any) {
//         console.log(e);
//       }
//     },
//     [childRefs, currentIndex],
//   );

//   const updateCurrentIndex = (val) => {
//     setCurrentIndex(val);
//     currentIndexRef.current = val;
//   };

//   const swiped = (direction, task_id, index) => {
//     if (direction === "right" && !selectedTask) {
//       setSelectedTask(task_id);
//     }
//     if (direction === "left") {
//       const ignoreTasks = JSON.parse(localStorage.getItem("ignore_tasks"));
//       ignoreTasks.push(task_id);
//       console.log(ignoreTasks);
//       localStorage.setItem("ignore_tasks", JSON.stringify(ignoreTasks));
//     }
//     updateCurrentIndex(index - 1);
//   };

//   // used for outOfFrame closure
//   const currentIndexRef = useRef(currentIndex);

//   const canGoBack = currentIndex < tasks.length - 1;

//   const canSwipe = currentIndex >= 0 && !isSwiping && !selectedTask;

//   const handleSwipe = (direction: "right" | "left") => () => swipe(direction);

//   if (userTimeoutLoading || isLoading || isAcceptingTask || isSettingTimeout) {
//     return (
//       <div
//         className="flex items-center justify-center"
//         style={{ height: "80%" }}>
//         <CircularProgress color="inherit" />
//       </div>
//     );
//   }

//   console.log("Selected task", selectedTask, waitForRightSwipe);
//   return (
//     <>
//       <StyledContainer>
//         {!selectedTask && !userTimeout.timeout_ended && (
//           <div className="card flex justify-start">
//             <StyledCardContainer>
//               <StyledTaskTitle>You have viewed all tasks</StyledTaskTitle>
//               <div className="text-sm md:text-lg text-white text-left font-medium mt-2 ">
//                 Please wait for a period of time for the tasks to become
//                 available again.
//               </div>
//               {userTimeout?.seconds_left && (
//                 <Counter time={userTimeout.seconds_left} />
//               )}
//               <CancelButton
//                 variant="contained"
//                 onClick={() => navigate("/")}
//                 fullWidth>
//                 Return to Dashboard
//               </CancelButton>
//             </StyledCardContainer>
//           </div>
//         )}
//         {(!selectedTask || (selectedTask && !waitForRightSwipe)) &&
//           userTimeout.timeout_ended && (
//             <div className="cardContainer relative flex self-start justify-center flex-row">
//               {tasks?.length > 0 &&
//                 tasks.map((task, index) => (
//                   <TinderCard
//                     ref={childRefs[index]}
//                     className="swipe"
//                     key={task.task_id}
//                     preventSwipe={["up", "down"]}
//                     onSwipe={(dir) => swiped(dir, task.task_id, index)}
//                     onSwipeRequirementUnfulfilled={() => setIsSwiping(true)}
//                     onCardLeftScreen={() => {
//                       outOfFrame(task.task_id, index);
//                     }}>
//                     <TaskCardTemplate
//                       {...task}
//                       setIsSwiping={setIsSwiping}
//                       canSwipe={canSwipe}
//                       handleSwipe={handleSwipe}
//                     />
//                   </TinderCard>
//                 ))}
//               <div className="flex invisible absolute bottom-[13%] z-0 self-center md:visible">
//                 <button
//                   className="bg-[#ffffff] h-[70px] w-[70px] rounded-[50%] cursor-pointer border-[transparent] mr-4"
//                   onClick={handleSwipe("left")}>
//                   <XButton />
//                 </button>
//                 <button
//                   className="bg-[#6F5ACD] h-[70px] w-[70px] rounded-[50%] cursor-pointer border-[transparent] ml-4"
//                   onClick={handleSwipe("right")}>
//                   <CheckButton />
//                 </button>
//               </div>
//               {/* <button
//                 className="bg-[#ffffff] h-[70px] w-[70px] rounded-[50%] cursor-pointer border-[transparent] -mt-9 z-50"
//                 style={{ marginLeft: "450px" }}
//                 onClick={() => {
//                   navigate("/");
//                 }}>
//                 <XButton />
//               </button> */}
//             </div>
//           )}

//         {selectedTask && waitForRightSwipe && tasks?.length > 0 && (
//           <div className="cardContainer flex self-start justify-center flex-row">
//             <TaskViewTemplate
//               task={tasks.find((task) => task.task_id === selectedTask)}
//               acceptTask={mutateAcceptTask}
//             />
//             <button
//               className="bg-[#ffffff] h-[70px] w-[70px] rounded-[50%] cursor-pointer border-[transparent] -ml-7 -mt-9 "
//               onClick={() => {
//                 setSelectedTask(null);
//                 setWaitForRightSwipe(false);
//               }}>
//               <XButton />
//             </button>
//           </div>
//         )}
//       </StyledContainer>
//     </>
//   );
// };

// export default Component;

const Component = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const [auth, setAuth] = useRecoilState(authState);
  const setSnackbar = useContext(SnackbarContext);
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setCardTasks] = useState([]);
  const {
    data: userTimeout,
    isLoading: userTimeoutLoading,
    refetch: refetchUserTimeout,
  } = useQuery(["fetchingUserTimeout", auth.accessToken], () => {
    if (auth.accessToken) {
      return getTasksTimeout(auth.accessToken);
    }
  });

  const {
    data: taskData,
    isLoading,
    refetch,
  } = useQuery(
    ["fetchingTasksPublished", auth.accessToken],
    () => {
      if (auth.accessToken) {
        return getTasksByStatus(auth.accessToken, "published");
      }
    },
    {
      onSuccess: (resp) => {
        setCardTasks(
          resp?.tasks.filter((task) => new Date() - new Date(task.date) > -1),
        );
        setCurrentIndex(resp?.tasks?.length - 1);
      },
      onError: () => {
        setSnackbar({
          title: "Error",
          content: "Failed to fetch the tasks. Please try again.",
          type: "error",
        });
        navigate("/");
      },
    },
  );

  const {
    mutate: mutateSetTimeout,
    isLoading: isSettingTimeout,
    error: errorSettingTimeout,
  } = useMutation(
    ["setTaskTimeout", auth.accessToken],
    () => {
      return setTasksTimeout(auth.accessToken);
    },
    {
      onSuccess: (resp, variables) => {
        refetchUserTimeout();
        console.log("userTimeout :>> ", userTimeout);
      },
      onError: (e, variables) => {
        console.log("error", e);
        setSnackbar({
          title: "Error",
          content: "Error with tasks.",
          type: "error",
        });
        navigate("/");
      },
    },
  );

  const {
    mutate: mutateAcceptTask,
    isLoading: isAcceptingTask,
    error,
  } = useMutation(
    ["acceptTask", auth.accessToken],
    async ({ status, taskId }: any) => {
      let { user: tempUser } = await getUserById(
        auth.accessToken,
        auth.user_id,
      );
      // let tempUser = result.user;
      if (status === "in_progress") {
        if (tempUser.activeTasks && tempUser.activeTasks.length > 1) {
          return Promise.reject({
            message:
              "You already have 2 open tasks. Please, finish one of those first.",
          });
        }
      } else if (status === "clarification_needed") {
        if (
          tempUser.tasksBeingClarified &&
          tempUser.tasksBeingClarified.length >= 3
        ) {
          return Promise.reject({
            message:
              "You already have 3 tasks that needs clarification. Please, get one of those clarifed before adding more.",
          });
        }
      }
      return changeTaskStatus(auth.accessToken, taskId, status);
    },
    {
      onSuccess: (resp, variables) => {
        setSnackbar({
          title: "Success",
          content: "The task was successfully assigned to you.",
          type: "success",
        });
        navigate("/", { replace: true });
      },
      onError: (e: any, variables: any) => {
        console.log("error", e);
        let content = e.message
          ? e.message
          : "Failed to assign the task. Please, try again.";
        setSnackbar({
          title: "Error",
          content: content,
          type: "error",
        });
      },
    },
  );

  const { mutate: mutateSetIgnoreTask, error: errorSetIgnoreTask } =
    useMutation(
      ["setIgnoreTask", auth.accessToken],
      (ignored_tasks: any) => {
        return setIgnoreTask(auth.accessToken, ignored_tasks);
      },
      {
        onSuccess: (resp, variables) => {
          console.log("Ignore_task", resp);
        },
        onError: (e, variables) => {
          console.log("error", e);
          setSnackbar({
            title: "Error",
            content: "Error with tasks.",
            type: "error",
          });
          navigate("/");
        },
      },
    );

  useEffect(() => {
    if (currentIndex === -1) {
      mutateSetTimeout();
    }
  }, [currentIndex]);

  const childRefs = useMemo(
    () =>
      Array(tasks.length)
        .fill(0)
        .map(() => React.createRef()),
    [tasks],
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < tasks.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, task, index) => {
    if (direction === "right" && !selectedTask) {
      setSelectedTask(task);
    }
    if (direction === "left" && !selectedTask) {
      mutateSetIgnoreTask({ ignored_tasks: task.task_id });
    }
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    currentIndexRef.current >= idx && childRefs[idx]?.current?.restoreCard();

    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < tasks.length) {
      childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      // await childRefs?.[currentIndex]?.current?.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      {userTimeoutLoading ||
      isLoading ||
      isAcceptingTask ||
      isSettingTimeout ? (
        <div
          className="flex items-center justify-center"
          style={{ height: "80%" }}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <StyledContainer>
          {!selectedTask && !userTimeout.timeout_ended && (
            <StyledCardContainer>
              <StyledCardTitle>
                <StyledTaskTitle>You have viewed all tasks. </StyledTaskTitle>
              </StyledCardTitle>
              <StyledCardInfo>
                <StyledCardInfoText>
                  Please wait for a period of time for the tasks to become
                  available again.
                </StyledCardInfoText>
                <StyledCardInfoText>
                  {userTimeout?.seconds_left && (
                    <Counter time={userTimeout.seconds_left} />
                  )}
                </StyledCardInfoText>
              </StyledCardInfo>
              <CancelButton
                variant="contained"
                fullWidth
                onClick={() => navigate("/")}>
                Return to Dashboard
              </CancelButton>
            </StyledCardContainer>
          )}
          {!selectedTask && userTimeout.timeout_ended && (
            <>
              <StyledCardMainContainer>
                {tasks.map((task, index) => (
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    preventSwipe={["up", "down"]}
                    key={task.task_id}
                    onSwipe={(dir) => swiped(dir, task, index)}
                    onCardLeftScreen={() => outOfFrame(task.task_id, index)}>
                    <StyledCardContainer>
                      <StyledCardTitle>
                        <StyledTaskTitle id="scrollstyle">
                          {task.title}
                        </StyledTaskTitle>
                        {task.holder_name && (
                          <StyledAddress>{task.holder_name}</StyledAddress>
                        )}
                      </StyledCardTitle>
                      <StyledCardInfo>
                        <StyledCardInfo>
                          <StyledCardInfoText className="underline">
                            Description
                          </StyledCardInfoText>
                          <StyledCardInfoText
                            className="overflow-y-auto overflow-x-visible	 hover:overflow-y-scroll h-20 "
                            id="scrollstyle">
                            {task.description}
                          </StyledCardInfoText>
                        </StyledCardInfo>
                        <StyledCardInfo>
                          <StyledCardInfoText className="underline">
                            Energy
                          </StyledCardInfoText>
                          <StyledCardInfoText>
                            {Array.from(
                              { length: task.energy_assigned },
                              (index) => (
                                <Energy />
                              ),
                            )}
                          </StyledCardInfoText>
                        </StyledCardInfo>
                        <StyledCardInfo>
                          <StyledCardInfoText className="underline">
                            Attachments
                          </StyledCardInfoText>
                          <StyledCardInfoText>
                            {/* {task.attachments?.map((file) => {
                              let fileName = file.substr(
                                file.lastIndexOf("/") + 1,
                              );
                              return <div className="mr-[5]">{fileName}</div>;
                            })} */}
                          </StyledCardInfoText>
                        </StyledCardInfo>
                      </StyledCardInfo>
                    </StyledCardContainer>
                  </TinderCard>
                ))}
              </StyledCardMainContainer>
              <StyledButtonGroup>
                <StyledCardLeftButton onClick={() => swipe("left")}>
                  <XButton />
                </StyledCardLeftButton>
                <StyledCardRightButton onClick={() => swipe("right")}>
                  <CheckButton />
                </StyledCardRightButton>
              </StyledButtonGroup>
            </>
          )}
          {selectedTask && tasks?.length > 0 && (
            <StyledCardContainer>
              <StyledCardInfo className="gap-5">
                <StyledCardTitle className="justify-center">
                  <StyledCardInfoText2>TASK VIEW</StyledCardInfoText2>
                </StyledCardTitle>
                <StyledCardBox>
                  <StyledCardInfoText2>
                    You have selected the task:
                    <StyledCardInfoText2 className="font-bold">
                      {selectedTask.title}
                    </StyledCardInfoText2>
                  </StyledCardInfoText2>
                  <StyledCardInfoText2>
                    this task is expected to be completed in
                  </StyledCardInfoText2>
                  <StyledCardInfoText2>
                    What should be the status of this task?
                  </StyledCardInfoText2>
                </StyledCardBox>
                <StyledCardTitle>
                  <StyledClarifyButton
                    onClick={() =>
                      mutateAcceptTask({
                        status: "clarification_needed",
                        taskId: selectedTask.task_id,
                      })
                    }>
                    To clarify
                  </StyledClarifyButton>
                  <StyledProgressButton
                    onClick={() =>
                      mutateAcceptTask({
                        status: "in_progress",
                        taskId: selectedTask.task_id,
                      })
                    }>
                    In progress
                  </StyledProgressButton>
                </StyledCardTitle>
              </StyledCardInfo>
            </StyledCardContainer>
          )}
          {/* <button
                className="bg-[#ffffff] h-[70px] w-[70px] rounded-[50%] cursor-pointer border-[transparent] -ml-7 -mt-9 "
                onClick={() => {
                  setSelectedTask(null);
                }}>
                <XButton />
              </button> */}
        </StyledContainer>
      )}
    </>
  );
};
export default Component;
