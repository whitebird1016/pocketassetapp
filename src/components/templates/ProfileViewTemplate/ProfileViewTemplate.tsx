import React from "react";
import styled from "styled-components";
import WalletIcon from "../../../assets/images/WalletIcon.png";
import RatingStars from "../../../assets/images/RatingStars.png";
import EnergyBar from "../../../assets/images/EnergyBar.png";
import AccomplishIcon from "../../../assets/images/AccomplishIcon.png";
import WhiteButtonLarge from "../WhiteButtonLarge";
import WhiteButtonSmall from "../WhiteButtonSmall";

const StyledInnerContainer = styled.span`
  display: flex;
  align-content: center;
  flex-direction: column;
  justifycontent: center;
  flex-wrap: nowrap;
  margin-top: 6%;
  // background-color: blue;
`;

const StyledAddress = styled.p`
  margin-top: 0%;
  // margin-left: 60%;
  // background-color: white;
  width: 127px;
  height: 19px;
  color: white;
  // border-radius: 50px;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: wrap;
  overflow: hidden;
  // padding-bottom: 20px;
  // padding-top: 5px;
  // padding-left: 10px;
  // padding-right: 10px;
`;

const StyledInnerHeader = styled.span`
  display: flex;
  // margin-top: -0.5%;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  // position: absolute;
  //margin-left: 30px;
  // background-color: green;
  color: white;
  font-size: 12px;
  // margin-right: 0px;

  .fname {
    font-size: 40px;
    font-weight: bold;
  }
`;

const StyledBlock = styled.span`
  display: flex;
  // margin-top: -0.5%;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  // position: absolute;
  // background-color: pink;
  color: white;
  // margin-left: 30px;
  font-size: 12px;
  // margin-right: 0px;
  .fname {
    font-size: 40px;
    font-weight: bold;
  }
`;

const StyledPhoto = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Component = ({ label, onClick, className }: Props) => {
  return (
    <>
      <StyledInnerContainer>
        <div className="max-w-[528] min-h-[450] pt-[10] bg-[#806AD2] rounded-[10] pb-[30] mb-[20] flex flex-col w-full">
          <StyledPhoto>
            <StyledInnerHeader>
              {/* <span className="date" style={{ marginLeft: 30 }}>
              WEDNESDAY, MAY 4
            </span> */}
              <br />
              <br />
              <span className="fname ml-[40]">John Doe</span>
              <span className="date ml-[40]">jdoe@gmail.com</span>
              <StyledAddress className="publicAddress ml-[40]">
                0x55F0A4d97841EF7e158706A9EE2724F12dEabD03
              </StyledAddress>
            </StyledInnerHeader>
            <span className="w-[100] h-[100]  bg-[white] rounded-[50%]  mr-[40]"></span>
          </StyledPhoto>
          <StyledBlock>
            <span className="w-[215] h-[100] bg-[white] rounded-[10] flex items-center	justify-between p-1">
              <div>
                <div className="text-[black] text-[14px] w-[50%] ml-[7%] mt-[5%]">
                  TOTAL EARNING
                </div>
                <div className="text-[black] text-[30px] w-[50%] ml-[7%] font-bold">
                  $219
                </div>
              </div>
              <img src={WalletIcon} />
            </span>
            <span className="w-[215] h-[100] bg-[white] rounded-[10]  flex items-center	justify-between p-1">
              <div>
                <div className="text-[black] text-[14px] w-[50%] ml-[7%] mt-[5%] ">
                  SATISFACTION SCORE
                </div>
                <div className="text-[black] text-[30px] w-[50%] ml-[7%] font-bold ">
                  89%
                </div>
              </div>
              <img src={RatingStars} />
            </span>
            <span className="h-[100] w-[215] bg-[white] rounded-[10] flex items-center	justify-between p-1">
              <div>
                <div className="text-[black] text-[14px] w-[50%] ml-[7%] mt-[5%]">
                  ENERGY CONSUMED
                </div>
                <div className="text-[black] text-[30px] w-[50%] ml-[7%] font-bold">
                  128
                </div>
              </div>
              <img src={EnergyBar} />
            </span>
            <span className=" h-[100] bg-[white] rounded-[10] w-[215] flex items-center	justify-between p-1">
              <div>
                <div className="text-[black] text-[14px] w-[50%] ml-[7%] mt-[5%]">
                  TASKS ACCOMPLISHED
                </div>
                <div className="text-[black] text-[30px] w-[50%] ml-[7%] font-bold">
                  94
                </div>
              </div>
              <img src={AccomplishIcon} />
            </span>
          </StyledBlock>
        </div>
      </StyledInnerContainer>
    </>
  );
};

export default Component;
