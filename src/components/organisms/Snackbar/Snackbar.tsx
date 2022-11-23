import styled from "styled-components";
import { Snackbar as MaterialSnackBar, Slide } from "@mui/material";

interface Props {
  title: string;
  content: string;
  open: boolean;
  onClose: Function;
  type: "error" | "success" | "warning" | "info";
}

const slideTransition = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const ComponentWrapper = styled.div``;

export const StyledContainer = styled.div`
  background: white;
  width: 478px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledSnackbarHeader = styled.div`
  display: flex;
  align-items: vertical;
  justify-content: space-between;
  padding: 2rem 1rem 0rem 1rem;
`;

export const StyledSnackbarContent = styled.div`
  padding: 2rem 1rem 4rem 1rem;
`;

const Snackbar: React.FC<Props> = ({
  title,
  content,
  open,
  onClose,
  type = "info",
}) => {
  const containerClass = `border-${type} border-l-4`;

  return (
    <MaterialSnackBar
      sx={{
        backgroundColor: "transparent",
      }}
      autoHideDuration={3500}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      ContentProps={{
        elevation: 2,
      }}
      TransitionComponent={slideTransition}
      onClose={() => onClose()}
      key={"topright"}>
      <StyledContainer
        className={containerClass}
        style={{ borderLeftStyle: "solid" }}>
        <StyledSnackbarHeader>
          <div className="font-bold font-inter text-xl">{title}</div>
          {/* <Close
            fontSize="small"
            sx={{ cursor: "pointer" }}
            onClick={() => onClose()}
          /> */}
        </StyledSnackbarHeader>
        <StyledSnackbarContent>
          <div className="font-inter text-sm">{content}</div>
        </StyledSnackbarContent>
      </StyledContainer>
    </MaterialSnackBar>
  );
};

export default Snackbar;
