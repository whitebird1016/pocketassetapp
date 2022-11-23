import React from "react";
import { MenuItem, SvgIcon, Typography } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import { BigNumber } from "ethers";
import { authState } from "../../../state/atoms";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { updateNotifications } from "../../../services/notification";
import { Envelope } from "../../../assets/svg";
import { ForkLeft } from "@mui/icons-material";
type shortTime = {
  value: Number;
  suffix: string;
};
type notificationsObject = {
  timeStamp: string;
  archived: boolean;
  task_id: string;
  user_id: string;
  message: string;
  notification_id: string;
  lapsed?: shortTime;
};
type Props = MenuProps & {
  notifOptions: notificationsObject[];
  mutate: (string) => any;
};
const Component = ({ notifOptions, ...props }: Props) => {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  const onClick = (id: string) => {
    if (auth.accessToken) props.mutate(id);
  };
  if (notifOptions) {
    notifOptions.forEach((option) => {
      const time = BigNumber.from(option.timeStamp).div(1000);
      const timeNow = BigNumber.from(Date.now()).div(1000);
      let timeDiff = timeNow.sub(time);
      let current: shortTime = {
        value: timeDiff.toNumber(),
        suffix: "s",
      };
      if (timeDiff.gt(60)) {
        timeDiff = timeDiff.div(60);
        if (timeDiff.gt(60)) {
          timeDiff = timeDiff.div(60);
          if (timeDiff.gt(24)) {
            timeDiff = timeDiff.div(24);
            if (timeDiff.gt(7)) {
              if (timeDiff.gt(30)) {
                current.suffix = "m";
              } else {
                timeDiff = timeDiff.div(7);
                current.suffix = "w";
              }
            } else {
              current.suffix = "d";
            }
          } else current.suffix = "h";
        } else current.suffix = "m";
        current.value = timeDiff.toNumber();
      }
      option.lapsed = current;
    });
  }
  function redirect(task_id: string) {
    navigate("/tasks/view/" + task_id);
  }
  return (
    <Menu
      className="shadow rounded-md"
      {...props}
      sx={{
        overflow: "visible",
        mt: 1.2,
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}>
      <Typography
        sx={{
          mr: 2,
          mb: 1,
          fontSize: "0.875rem",
          textAlign: "right",
          textDecoration: "underline",
          color: "#000000",
        }}>
        <a className="text-black">Mark all as read</a>
      </Typography>
      {notifOptions
        .slice(0)
        .reverse()
        .map((option, index) => {
          const tstamp = option.timeStamp;
          if (option.archived) return;
          return (
            <div key={index}>
              {option.lapsed && (
                <MenuItem
                  sx={{
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                  disableRipple
                  key={option.timeStamp}>
                  <div
                    flex-direction="row"
                    style={{
                      display: "flex",
                      alignItems: "start",
                    }}>
                    <SvgIcon component={Envelope} className="" />
                    <Typography
                      display="flex"
                      sx={{
                        mx: "5px",
                        float: "right",
                        fontSize: "15px",
                        width: "328px",
                        whiteSpace: "normal",
                        color: "#000000",
                      }}>
                      {option.message}
                    </Typography>
                  </div>
                  <div
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}>
                    <Typography
                      sx={{
                        ml: "29px",
                        float: "left",
                        fontSize: "10px",
                        color: "#8E8E8E",
                      }}>
                      {option.lapsed.value.toString() +
                        option.lapsed.suffix +
                        " ago"}
                    </Typography>
                    <Typography
                      key={option.notification_id}
                      onClick={() => onClick(option.notification_id)}
                      sx={{
                        textDecorationLine: "underline",
                        float: "right",
                        fontSize: "10px",
                        color: "#8E8E8E",
                        "&:hover": {
                          fontWeight: "bold",
                          color: "#806AD2",
                        },
                      }}>
                      Mark as Read
                    </Typography>
                    <Typography
                      key={option.notification_id}
                      onClick={() => redirect(option.task_id)}
                      sx={{
                        marginRight: "5px",
                        textDecorationLine: "underline",
                        float: "right",
                        fontSize: "10px",
                        color: "#8E8E8E",
                        "&:hover": {
                          fontWeight: "bold",
                          color: "#806AD2",
                        },
                      }}>
                      View Task
                    </Typography>
                  </div>
                </MenuItem>
              )}
            </div>
          );
        })}
      {notifOptions
        .slice(0)
        .reverse()
        .map((option, index) => {
          const tstamp = option.timeStamp;
          if (!option.archived) return;
          return (
            <div key={index}>
              {option.lapsed && (
                <MenuItem disableRipple key={option.timeStamp}>
                  <div flex-direction="column">
                    <Typography
                      sx={{
                        fontSize: "15px",
                        width: "328px",
                        whiteSpace: "normal",
                        color: "#000000",
                      }}>
                      {option.message}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: "#8E8E8E",
                      }}>
                      {option.lapsed.value.toString() +
                        option.lapsed.suffix +
                        " ago"}
                    </Typography>
                  </div>
                </MenuItem>
              )}
            </div>
          );
        })}
    </Menu>
  );
};

export default Component;
