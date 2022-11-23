import { Box } from "@mui/material";
import { ComponentWrapper } from "./FormError.style";

interface Props {
  top?: any;
  children?: any;
  sx?: any;
  mt?: any;
  isAbsolute?: boolean;
}

const FormError = ({ children, isAbsolute, ...props }: Props) => {
  return (
    <Box {...props}>
      {isAbsolute ? (
        <div style={{ position: "absolute", bottom: -30 }}>
          <ComponentWrapper> {children}</ComponentWrapper>
        </div>
      ) : (
        <ComponentWrapper>{children}</ComponentWrapper>
      )}
    </Box>
  );
};

export default FormError;
