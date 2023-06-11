import React from "react";
import { createRoot } from "react-dom/client";
import { theme } from "@src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import "@pages/popup/index.css";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { ThemeProvider } from "@mui/material/styles";
import { Popup } from "./popup";

refreshOnUpdate("pages/popup");

function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Popup />
      </CssBaseline>
    </ThemeProvider>
  );
}

init();
