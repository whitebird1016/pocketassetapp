import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button as MaterialButton, Box } from "@mui/material";

import DropdownMenu from "../DropdownMenu";
import NotificationMenu from "../Notification";
import LogoImage from "../../../assets/images/HDAO-Logo.png";
import MoonImage from "../../../assets/images/moon.png";

import {
  ArrowDownIcon,
  NavbarMobileIcon,
  NavbarMobileClose,
} from "../../../assets/svg";

const StyledLeftContainer = styled.div`
  @media only screen and (max-width: 1030px) {
    display: none;
  }
`;

const StyledRightContainer = styled.div`
  @media only screen and (max-width: 1030px) {
    display: none;
  }
`;

const StyledLogo = styled.img`
  width: 32px;
  height 32px;
  `;

const StyledButton = styled.div`
  background-color: rgba(156, 39, 176, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;

  p {
    text-align: center;
    padding: 9px 11px;
    margin: 0px;
  }

  &:hover {
    cursor: pointer;
  }

  // @media only screen and (max-width: 1030px) {
  //   display: none;
  // }
`;

const StyledMoonButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }

  img {
    padding: 9px 18px;
  }

  // @media only screen and (max-width: 1030px) {
  //   display: none;
  // }
`;

type Props = {
  role?: "owner" | "pa";
  dropdownButtonName?: string;
  dropdownOptions?: Array<{
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
};

const Component = ({ role, dropdownButtonName, dropdownOptions }: Props) => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => () => {
    navigate(route);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-mainBg mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4 ">
      <div className="mr-5 ml-5 relative flex items-center justify-between p-3">
        <div className="inline-flex  no-underline  items-center ">
          <StyledLogo
            src={LogoImage}
            onClick={navigateTo("/")}
            className="hover:cursor-pointer"
          />
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <p
              className="text-xl text-black text-center font-bungee pl-1 hover:cursor-pointer"
              onClick={navigateTo("/")}>
              POCKET ASSISTANTS
            </p>
          </Box>
        </div>
        <ul className="items-center hidden space-x-8 lg:flex">
          <StyledRightContainer className="flex items-center">
            {role && dropdownOptions ? (
              <div className="flex items-center">
                <StyledButton className="ml-5 bg-button w-14 h-10 justify-center border">
                  <NotificationMenu />
                </StyledButton>

                <MaterialButton
                  aria-controls={open ? "user-custom-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className="pl-2 ml-5 bg-button min-w-14 h-10 justify-center border"
                  onClick={handleDropdownClick}
                  endIcon={
                    <div className="pr-1 justify-center">
                      <ArrowDownIcon />
                    </div>
                  }>
                  <div className="text-headerText text-xs font-inter font-bold">
                    {dropdownButtonName}
                  </div>
                </MaterialButton>
                <DropdownMenu
                  id="user-custom-menu"
                  MenuListProps={{
                    "aria-labelledby": "user-custom-menu",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleDropdownClose}
                  dropdownOptions={dropdownOptions}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <a
                  className="no-underline text-sm tracking-wide text-black font-inter font-medium hover:text-secondary hover:cursor-pointer"
                  onClick={navigateTo("/")}>
                  How it works
                </a>
                <a
                  className="no-underline text-sm tracking-wide text-black font-inter font-medium hover:text-secondary hover:cursor-pointer ml-7"
                  onClick={navigateTo("/")}>
                  FAQs
                </a>
                <StyledButton
                  className="ml-7"
                  onClick={navigateTo("/owner-login")}>
                  <p className="text-secondary font-inter font-medium">
                    Connect Wallet
                  </p>
                </StyledButton>

                <StyledButton
                  className="ml-7 bg-button"
                  onClick={navigateTo("/login")}>
                  <p className="text-black font-inter font-medium">PA Login</p>
                </StyledButton>
              </div>
            )}
            <StyledMoonButton
              className="ml-5 bg-white border"
              onClick={() => {}}>
              <img src={MoonImage} />
            </StyledMoonButton>
          </StyledRightContainer>
        </ul>
        <div className="lg:hidden">
          <div className="flex items-center">
            {!role ? (
              <>
                <StyledButton
                  className="ml-7"
                  onClick={navigateTo("/owner-login")}>
                  <p className="text-secondary font-inter font-medium">
                    Connect Wallet
                  </p>
                </StyledButton>
                <StyledButton
                  className="ml-7 bg-button"
                  onClick={navigateTo("/login")}>
                  <p className="text-black font-inter font-medium">PA Login</p>
                </StyledButton>
              </>
            ) : (
              <div className="flex items-center">
                <StyledButton className="ml-5 bg-button w-14 h-10 justify-center border">
                  <NotificationMenu />
                </StyledButton>

                <MaterialButton
                  aria-controls={open ? "user-custom-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  className="pl-2 ml-5 bg-button min-w-14 h-10 justify-center border"
                  onClick={handleDropdownClick}
                  endIcon={
                    <div className="pr-1 justify-center">
                      <ArrowDownIcon />
                    </div>
                  }>
                  <div className="text-headerText text-xs font-inter font-bold">
                    {dropdownButtonName}
                  </div>
                </MaterialButton>
                <StyledMoonButton
                  className="ml-5 bg-white border"
                  onClick={() => {}}>
                  <img src={MoonImage} />
                </StyledMoonButton>
              </div>
            )}
            <StyledButton
              className="ml-7 bg-mainBg"
              onClick={() => setIsMenuOpen(true)}>
              <NavbarMobileIcon />
            </StyledButton>
          </div>
          {isMenuOpen && (
            <div className="absolute top-1 left-0 w-full">
              <div className="p-3 bg-white z-10 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2"
                      onClick={() => setIsMenuOpen(false)}>
                      <NavbarMobileClose />
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-5">
                    {role && dropdownOptions ? (
                      <div className="flex items-left">
                        <div>
                          <DropdownMenu
                            id="user-custom-menu"
                            MenuListProps={{
                              "aria-labelledby": "user-custom-menu",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleDropdownClose}
                            dropdownOptions={dropdownOptions}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5 ">
                        <div className="ml-7">
                          <a
                            onClick={navigateTo("/")}
                            className="no-underline text-sm tracking-wide text-black font-inter font-medium hover:text-secondary hover:cursor-pointer">
                            How it works
                          </a>
                        </div>
                        <div className="ml-7">
                          <a
                            onClick={navigateTo("/")}
                            className="no-underline text-sm tracking-wide text-black font-inter font-medium hover:text-secondary hover:cursor-pointer">
                            FAQs
                          </a>
                        </div>

                        <StyledMoonButton
                          className="ml-5 bg-white border"
                          onClick={() => {}}>
                          <img src={MoonImage} />
                        </StyledMoonButton>
                      </div>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Component;
