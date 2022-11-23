import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { RecoilRoot } from "recoil";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.css";
import App from "./App";
import HooksProvider from "./state/hooks";

const activeChainId = ChainId.Polygon;
const container = document.getElementById("app");

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThirdwebProvider desiredChainId={activeChainId}>
        <RecoilRoot>
          <HooksProvider>
            <App />
          </HooksProvider>
        </RecoilRoot>
      </ThirdwebProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("app"),
);
