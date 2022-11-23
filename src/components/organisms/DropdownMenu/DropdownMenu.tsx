import React from "react";
import styled from "styled-components";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha } from "@mui/material/styles";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: "5px",
    minWidth: 180,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      p: {
        paddingLeft: "15px",
        margin: 0,
        fontFamily: "Inter",
        fontSize: "15px",
        color: "#000",
      },

      "&:active": {
        backgroundColor: "white",
      },
    },
  },
}));

type Props = MenuProps & {
  dropdownOptions: Array<{
    name: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
};

const Component = ({ dropdownOptions, ...props }: Props) => {
  return (
    <StyledMenu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}>
      {dropdownOptions.map((option) => {
        const Icon = option.icon;
        return (
          <MenuItem
            onClick={() => {
              props.onClose("false");
              option.onClick();
            }}
            disableRipple
            key={option.name}>
            {option.icon}
            <p>{option.name}</p>
          </MenuItem>
        );
      })}
    </StyledMenu>
  );
};

export default Component;
