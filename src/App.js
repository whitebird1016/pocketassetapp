import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import RootNavigator from "./navigators";

function Copyright() {
  return (
    <Typography
      className="bg-mainBg flex justify-center"
      style={{ marginTop: "5%" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://humandao.org/">
        humanDAO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const App = () => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              retry: 0,
              suspense: false,
              refetchOnReconnect: false,
              refetchOnWindowFocus: false,
              refetchOnMount: true,
            },
          },
        })
      }>
      <RootNavigator />
      {/* TODO: temp disable, will reintegrate soon <Copyright /> */}
    </QueryClientProvider>
  );
};

export default App;
