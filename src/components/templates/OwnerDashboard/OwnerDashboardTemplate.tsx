import React from "react";
import styled from "styled-components";
import { Box, Grid, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useRecoilState } from "recoil";
import { authState } from "../../../state/atoms";

import HandNFT from "../../../assets/images/handnft.png";
import NoNFT from "../../../assets/images/NoNft.png";

import { PlusIcon } from "../../../assets/svg";
import TaskItem from "../../organisms/TaskItem";

import ownerStatuses from "../../../assets/ownerStatuses";
import paStatuses from "../../../assets/paStatuses";

const allStatuses = { ...ownerStatuses, ...paStatuses };

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 40,
  borderRadius: 60,
  boxShadow: "0px 4px 1px rgba(0, 0, 0, 0.1)",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#FFF",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 60,
    backgroundColor: "#E0848D",
  },
}));

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;

  @media only screen and (max-width: 1099px) {
    width: 100%;
  }
`;

const StyledHeader = styled.div`
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 1099px) {
    margin-left: 5%;
  }
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

const ShadowedContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 1;
  border-radius: 10px;
`;

const EnergyContainer = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 1;
  border-radius: 10px;

  @media only screen and (max-width: 760px) {
    justify-content: flex-end !important;
    .eng-img {
      left: 10px !important;
      height: 120px;
      width: 80px;
    }
    .eng-div {
      width: 70% !important;

      .text-5xl {
        font-size: 24px !important;
      }
    }
  }
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #806ad2;
  border-radius: 50px;
  width: 45px;
  height: 45px;
`;

const OptionsButton = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 30px;

  border: 1px solid #806ad2;
  border-radius: 20px;

  ${({ selected }) =>
    selected
      ? `
        background-color: #806ad2;
        color: white;
        `
      : `  color: #000000;`}

  font-family: Inter;
  font-weight: 400;
  font-size: 15px;
  text-align: center;
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

type Props = {
  tasks: Array<any>;
  nft: any;
  handleDeleteTask: (taskId: string) => void;
  handleFavoriteTask: (task: any) => void;
  energy?: number;
  handleSwitchFetchedTasks: () => void;
  isFavorites: boolean;
};

const Component = ({
  tasks,
  nft,
  handleDeleteTask,
  handleFavoriteTask,
  energy = 0,
  handleSwitchFetchedTasks,
  isFavorites,
}: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const statuses = ["completed", "draft", "published", "none"];
  console.log("tasks :>> ", tasks);
  // const tasks = [
  //   {
  //     title: "Make my day, please!",
  //     description: "Description of taks",
  //     status: "published",
  //     energy_assigned: 2,
  //     category: "categories-not-yet-defined",
  //     owner_id: "335057471652495952",
  //     created_date: 1656053998922,
  //     task_id: "335329518091764304",
  //     rating: "4",
  //     feedback: "Hi",
  //   },
  //   {
  //     title: "Edit Vacation Videos",
  //     description: "I need my vacation videos edited",
  //     status: "published",
  //     energy_assigned: 4,
  //     category: "categories-not-yet-defined",
  //     owner_id: "335057471652495952",
  //     created_date: 1656054256436,
  //     task_id: "335329788108472913",
  //     rating: "5",
  //     feedback: "Hi",
  //   },
  //   {
  //     title: "Publish Wedding Videos",
  //     description: "I need my vacation videso edited",
  //     status: "published",
  //     energy_assigned: 5,
  //     category: "categories-not-yet-defined",
  //     owner_id: "335057471652495952",
  //     created_date: 1656054256436,
  //     task_id: "123123123123",
  //     rating: "3",
  //     feedback: "Hi",
  //   },
  // ];

  return (
    <StyledContainer className="bg-mainBg">
      <StyledBoardWrapper>
        <StyledCardsWrapper>
          <LeftBox
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <Grid
              className=" items-center justify-center"
              style={{ flex: 0.25 }}>
              <EnergyContainer className="flex relative bg-buttonBorder h-full w-full p-4 items-center justify-center">
                <img
                  src={HandNFT}
                  className="absolute bottom-0.5 left-8 eng-img"
                />
                <div className="flex flex-col w-3/6 eng-div ">
                  <span className="text-white font-inter font-bold text-base mb-1">
                    ENERGY
                  </span>
                  <span className="text-white font-inter font-bold text-5xl mb-2">
                    {energy} / 20
                  </span>
                  <BorderLinearProgress
                    variant="determinate"
                    value={(energy / 20) * 100}
                  />
                </div>
              </EnergyContainer>
            </Grid>
            <Grid style={{ flex: 0.7 }}>
              <ShadowedContainer className="flex flex-col justify-start bg-tableGrey w-full h-full p-6 ">
                <div className="w-full grid md:grid-cols-2 h-max">
                  <div className="flex h-max items-center gap-3 justify-between md:justify-start">
                    <div className="font-inter text-2xl text-black font-bold my-2 ">
                      Your Tasks
                    </div>
                    <AddButton
                      className="hover:cursor-pointer w-[55] h-[55] md:w-[45] md:h-[45]"
                      onClick={() => navigate("/tasks/create")}>
                      <PlusIcon className="w-[20] h-[20] md:w-[18] md:h-[18]" />
                    </AddButton>
                  </div>
                  <div className="flex self-center flex-row gap-3 md:justify-end">
                    <OptionsButton
                      className="hover:cursor-pointer"
                      onClick={() => {}}>
                      Drafts
                    </OptionsButton>
                    <OptionsButton
                      className="hover:cursor-pointer"
                      selected={isFavorites}
                      onClick={handleSwitchFetchedTasks}>
                      Favorites
                    </OptionsButton>
                  </div>
                </div>
                <TaskItemsContainer>
                  {tasks.map((task) => {
                    const isTrashDisabled=!(statuses.includes(task.status))
                    return (
                      <TaskItem
                        title={task.title}
                        energy={task.energy_assigned}
                        status={task.status}
                        onStarClick={() => handleFavoriteTask(task)}
                        onPenClick={() =>
                          navigate(`/tasks/view/${task.task_id}`)
                        }
                        onTrashClick={
                          !isTrashDisabled
                            ? () => handleDeleteTask(task.task_id)
                            : undefined
                        }
                        isTrashDisabled={isTrashDisabled}
                      />
                    );
                  })}
                </TaskItemsContainer>
              </ShadowedContainer>
            </Grid>
          </LeftBox>
          <RightBox>
            <ShadowedContainer className="bg-nftBg w-full h-full">
              {nft ? (
                <p className="font-Inter text-2xl text-black font-bold my-2">
                  NFT
                </p>
              ) : (
                <div className="flex flex-col justify-evenly items-center h-full">
                  <div className="flex align-center justify-center h-full">
                    <div className="flex self-center items-center justify-center flex-col">
                      <img src={NoNFT} className="w-52 h-48 self-center" />
                      <div className="p-4 font-inter font-medium text-black text-xl text-center">
                        You haven’t chosen a Pocket Assistant NFT at the moment.
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center mb-3">
                    <div
                      className="flex text-xl font-semibold  bg-buttonBorder w-11/12 h-14 rounded-lg text-white items-center justify-center hover:cursor-pointer"
                      onClick={() => {}}>
                      Choose an NFT
                    </div>
                  </div>
                </div>
              )}
            </ShadowedContainer>
          </RightBox>
        </StyledCardsWrapper>
      </StyledBoardWrapper>
    </StyledContainer>
  );
};

export default Component;
