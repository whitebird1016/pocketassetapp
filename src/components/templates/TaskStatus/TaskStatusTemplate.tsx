import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import WhiteButtonLarge from "../../organisms/WhiteButtonLarge";
import WhiteButtonSmall from "../../organisms/WhiteButtonSmall";
import { useRecoilState } from "recoil";
import { authState, initialAuthState } from "../../../state/atoms";

const StyledInnerContainer = styled.span`
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  flex-wrap: nowrap;
  // background-color: blue;
`;

const StyledInnerHeader = styled.span`
  display: flex;
  // margin-top: -0.5%;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;

  // background-color: green;
  color: white;
  font-size: 12px;
  margin-right: 0px;

  .fname {
    font-size: 40px;
    font-weight: bold;
  }
`;

const StyledWhiteButtonTaskStatus = styled.div`
  background-color: #f6f6f6;
  // z-index: 200;
  border-radius: 50px;
  cursor: pointer;
  width: fit-content;
  height: 40px;
  border: none;
  margin-top: -5%;
  color: black;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  justify-content: center;
`;

const Component = ({
  label,
  onClick,
  className,
  needClarificationTasks = [],
  completedTasks = [],
  forReviewTasks = [],
}: any) => {
  const [auth, setAuth] = useRecoilState(authState);

  return (
    <>
      <StyledInnerContainer>
        <div className="w-[320px] h-[300px] pt-[20] bg-[#806AD2] rounded-[10] pb-[30] mb-[20] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <StyledInnerHeader>
            <span className="date ml-[30] mt-[5%]">WEDNESDAY, MAY 4</span>
            <br />
            <br />
            <span className="fname ml-[30] mt-[-8%]">
              {auth.user_name || ""}
            </span>

            <div className="flex justify-center flex-row text-center w-[100%] mt-[120px]">
              <Link to="/profile" className="no-underline">
                <StyledWhiteButtonTaskStatus>
                  VIEW PROFILE
                </StyledWhiteButtonTaskStatus>
              </Link>
            </div>
          </StyledInnerHeader>
        </div>

        <div className="w-[320] h-[125] pt-[20] bg-[#806AD2] rounded-[10] pb-[30] mb-[20] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <StyledInnerHeader>
            <span className="accomplished ml-[30]">COMPLETED</span>
            <div className="totalAccomplished ml-[30] text-[36px] font-bold mt-[5%]">
              <div className="w-[100%]">{completedTasks.length}</div>
              <span className="absolute -mt-[20%] ml-[62%] w-[100vw]">
                {/* <WhiteButtonSmall
                  label={"VIEW ALL"}
                  onClick={undefined}
                  className={""}
                /> */}
              </span>
            </div>
          </StyledInnerHeader>
        </div>

        <div className="w-[320] h-[125] pt-[20] bg-[#806AD2] rounded-[10] pb-[30] mb-[20] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <StyledInnerHeader>
            <span className="accomplished ml-[30]">CLARIFICATION</span>
            <div className="totalAccomplished ml-[30] text-[36px] font-bold mt-[5%]">
              <div className="w-[100%]">{needClarificationTasks.length}</div>
              {/* <span className="absolute -mt-[20%] ml-[68%] w-[100vw]">
                <WhiteButtonSmall
                  label={"VIEW ALL"}
                  onClick={undefined}
                  className={""}
                />
              </span> */}
            </div>
          </StyledInnerHeader>
        </div>

        <div className="w-[320] h-[125] pt-[20] bg-[#806AD2] rounded-[10] pb-[30] mb-[20] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <StyledInnerHeader>
            <span className="accomplished ml-[30]">REVIEW</span>
            <div className="totalAccomplished ml-[30] text-[36px] font-bold mt-[5%]">
              <div className="w-[100%]">{forReviewTasks.length}</div>
              {/* <span className="absolute -mt-[20%] ml-[68%] w-[100vw]">
                <WhiteButtonSmall
                  label={"VIEW ALL"}
                  onClick={undefined}
                  className={""}
                />
              </span> */}
            </div>
          </StyledInnerHeader>
        </div>
      </StyledInnerContainer>
    </>
  );
};

export default Component;
function Button(Button: any) {
  throw new Error("Function not implemented.");
}
