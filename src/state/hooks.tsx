import React from "react";

import Snackbar from "../components/organisms/Snackbar";
import { createContext, useCallback, useState } from "react";

interface ISnackbar {
  open?: boolean;
  title: string;
  content: string;
  type: "success" | "warning" | "info" | "error";
}

interface ISnackbarContextProvider {
  children: React.ReactNode;
}

export const SnackbarContext = createContext<
  ({ title, content, type }: ISnackbar) => void
>(() => {});

const SnackbarContextProvider = ({ children }: ISnackbarContextProvider) => {
  const [snackbarOpen, setSnackbarOpen] = useState<ISnackbar["open"]>(false);
  const [snackbarTitle, setSnackbarTitle] = useState<ISnackbar["title"]>("");
  const [snackbarContent, setSnackbarContent] =
    useState<ISnackbar["content"]>("");
  const [snackbarType, setSnackbarType] =
    useState<ISnackbar["type"]>("success");

  const onClose = () => {
    setSnackbarOpen(false);
  };

  const addSnackbarMessage = useCallback(
    ({ title, content, type }: ISnackbar) => {
      setSnackbarOpen(true);
      setSnackbarTitle(title);
      setSnackbarContent(content);
      setSnackbarType(type);
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={addSnackbarMessage}>
      {children}
      <Snackbar
        open={snackbarOpen ? snackbarOpen : false}
        title={snackbarTitle}
        content={snackbarContent}
        type={snackbarType}
        onClose={onClose}
      />
    </SnackbarContext.Provider>
  );
};

// export { SnackbarContext, SnackbarContextProvider }

// export const DependenciesContext = React.createContext<Dependencies | null>(
//   null,
// );

// export const useDependencies = (): Dependencies => {
//   const context = React.useContext(DependenciesContext);
//   if (!context) {
//     throw new Error(`Context not instantiated`);
//   }
//   return context;
// };

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

const Provider = ({ children }: Props): React.ReactElement => {
  return <SnackbarContextProvider>{children}</SnackbarContextProvider>;
};

export default Provider;
