import React from "react";
import containstyle from "styled-components";
import { useNavigate } from "react-router-dom";

const LeaderBoard = containstyle.div`
width:100%
`;

const LeaderboardHeader = containstyle.div`
  align-items: center;
`;

const GradientBox = containstyle.div`
display: flex;
`;

const leaderboardbackground = [
  "linear-gradient(to right,#f8bf99, #f59cdc)",
  "linear-gradient(to right,#ca70ed, #ea6dd1)",
  "linear-gradient(to right,#7c76ff, #e0a1ff)",
  "linear-gradient(to right,#806AD2, #806AD2)",
  "linear-gradient(to right,#806AD2, #806AD2)",
];

const LeaderboardData = [
  {
    rank: 1,
    name: "You",
    completedTasks: "128 tasks completed",
    points: "+50 points",
  },
  {
    rank: 2,
    name: "Joel Everett",
    completedTasks: "117 tasks completed",
    points: "+42 points",
  },
  {
    rank: 3,
    name: "Violet Mclean",
    completedTasks: "87 tasks completed",
    points: "+36 points",
  },
  {
    rank: 4,
    name: "Jayda Kulinski",
    completedTasks: "79 tasks completed",
    points: "+32 points",
  },
];

const Component = () => {
  const navigate = useNavigate();
  return (
    <LeaderBoard className="antialiased bg-mainBg">
      <LeaderboardHeader className="ml-20 mb-10">
        <p className="font-Inter text-xs text-black">
          <span
            className=" text-black hover:cursor-pointer"
            onClick={() => navigate("/")}>
            PA Dashboard
          </span>
          {" >"} Leaderboard
        </p>
        <p className="font-Inter sm:text-[14px] lg:text-4xl text-black font-bold my-2">
          Leaderboard
        </p>
      </LeaderboardHeader>

      <div className="container mt-5 px-8 mb-20 mx-auto sm:px-12 xl:px-5">
        <h3 className="ml-4 font-Inter sm:text-[14px] lg:text-[32px] leading-[38.73px] font-bold sm:text-xl md:text-2xl">
          Top Task Takers
        </h3>
        {LeaderboardData.map((data, i) => (
          <div className="mb-4">
            <GradientBox
              style={{ backgroundImage: leaderboardbackground[i] }}
              key={i}
              className="flex justify-between p-6 lg:h-[75px] sm:h-[35px] lg:w-[846px] sm:w-[80%] mx-auto rounded-lg shadow-xl">
              <div className="flex justify-center items-center">
                <span className="flex mr:5 justify-center items-center text-white font-inter font-bold sm:text-[14px] lg:text-4xl">
                  {data.rank}
                </span>
                <div className="flex flex-col items-center sm:mx-3 md:mx-4 lg:mx-5 sm:ml-10 lg:ml-20">
                  <img
                    className="w-[50px] place-items-center h-[50px] rounded-full object-cover shadow-lg"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="avatar"
                  />
                </div>
                <div className="flex flex-col sm:mb-5 sm:ml-5 sm:mt-[12px] items-left lg:mx-5">
                  <div className="whitespace-nowrap text-white font-gilroy font-bold sm:text-[14px] lg:text-[32px]">
                    {data.name}
                  </div>
                  <div
                    style={{ marginTop: "-12px", position: "relative" }}
                    className="text-white font-bold text-[14px] font-inter">
                    {data.completedTasks}
                  </div>
                </div>
              </div>

              <span className="text-white lg:text-[14px] sm:text-[12px] font-inter font-bold">
                {data.points}
              </span>
            </GradientBox>
          </div>
        ))}
      </div>
    </LeaderBoard>
  );
};

export default Component;
