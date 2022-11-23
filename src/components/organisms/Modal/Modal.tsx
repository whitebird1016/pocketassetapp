import React from "react";
import { Box, Modal as ModalMui, ModalProps, Typography } from "@mui/material";
import Close from "@mui/icons-material/Close";

/** Component Element */
import {
  ComponentWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
} from "./Modal.style";

interface Props extends Omit<ModalProps, "onClose" | "title"> {
  title?: string;
  subTitle?: React.ReactNode;
  onClose: Function;
  type?: string;
}

const Modal = ({ title, subTitle, children, open, onClose, type }: Props) => {
  return (
    <ModalMui
      open={open}
      onClose={() => onClose()}
      sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <ComponentWrapper>
        <ModalHeader title={title}>
          {title && <ModalTitle>{title}</ModalTitle>}
          <ModalCloseButton onClick={() => onClose()}>
            <Close fontSize="medium" />
          </ModalCloseButton>
        </ModalHeader>
        {subTitle && (
          <Box px="10px" mb="1rem">
            {subTitle}
          </Box>
        )}
        <ModalBody>{children}</ModalBody>
      </ComponentWrapper>
    </ModalMui>
  );
};

export default Modal;
