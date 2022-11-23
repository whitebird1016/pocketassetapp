import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import { DropzoneArea } from "material-ui-dropzone";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";

import { authState } from "../../../state/atoms";
import { taskState } from "../../../state/atoms";
import { uploadFiles } from "../../../services/upload";
import { Task } from "../../../interfaces/Task";
import { SnackbarContext } from "../../../state/hooks";

const StyledItemContainer = styled.div``;

type Props = {
  onFinishUploading: (attachments: string[]) => void;
};
const Component = ({ onFinishUploading }: Props) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [uploadCount, setuploadCount] = useState(0);
  const [debounceKey] = useDebounce(uploadCount, 1000);

  const setSnackbar = useContext(SnackbarContext);
  const [filesToUpload, setFilesToUpload] = useState([] as File[]);
  //var filesAdded: File[] = [];

  const handleUploadClick = async (component) => {
    if (filesToUpload?.length >= 1) {
      console.log("my files: ", filesToUpload);
      const result = await uploadFiles(filesToUpload, auth.accessToken);

      setuploadCount(uploadCount + 1); // force component to re-render
      setFilesToUpload([] as File[]); // cear the state

      // Update the task object after upload
      if (result.success) {
        onFinishUploading(result.uploaded);
      } else {
        setSnackbar({
          title: "Error",
          content: "Failed to upload file/s. Please try again.",
          type: "error",
        });
      }
    } else {
      setSnackbar({
        title: "Error",
        content: "No files to upload.",
        type: "error",
      });
    }
  };

  return (
    <StyledItemContainer>
      <DropzoneArea
        key={debounceKey}
        onChange={(files) => {
          setFilesToUpload(files);
        }}
        showFileNames={true}
      />
      <Button
        className="hover:cursor-pointer bg-[#806AD2] w-40 mt-3 h-12 text-white font-bold rounded-full normal-case w-max-content font-inter p-0.5 pl-6 pr-6"
        variant="contained"
        onClick={handleUploadClick}
        disabled={filesToUpload.length === 0}>
        Upload
      </Button>
    </StyledItemContainer>
  );
};

export default Component;
