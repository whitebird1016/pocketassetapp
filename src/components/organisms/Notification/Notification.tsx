import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationMenu from "./NotificationMenu";
import { authState } from "../../../state/atoms";
import { useQuery, useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { getNotifications, updateNotifications } from "../../../services/notification";

type Props = {
  notifOptions?: notificationsObject[];
};
type notificationsObject = {
  timeStamp: string,
  archived: boolean,
  task_id: string,
  user_id: string,
  message: string,
  notifications_id: string
}

const Component = ({ notifOptions }: Props) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { data: notificationsData, refetch } = useQuery(
    ["notificationData", auth.accessToken, getNotifications],
    () => {
      if (auth.accessToken) {
        return getNotifications(auth.accessToken);
      }
    },
  );
  const {mutate:mutateNotification} = useMutation(
    ["UpdateData", updateNotifications],
    (id:string)=>{
    return updateNotifications(auth.accessToken,id);
  },{
    onSuccess:()=>refetch(),
  }
    );
  const notifications = notificationsData?.notifications || [];

  const newNotifications = `You have ${notifications.length} notifications`;
  const noNotifications = "No new notifications";

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        title={notifications.length ? newNotifications : noNotifications}>
        <IconButton onClick={handleOpen}>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "#806ad2",
              },
            }}
            badgeContent={notifications.length}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <NotificationMenu
        id="notification-custom-menu"
        MenuListProps={{
          "aria-labelledby": "notification-custom-menu",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        notifOptions={notifications}
        mutate={mutateNotification}
      />
    </div>
  );
};

export default Component;
