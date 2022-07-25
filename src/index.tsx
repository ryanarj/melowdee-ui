import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SignUpPage from "./pages/signUpPage";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <SignUpPage />
  </React.StrictMode>,
  document.getElementById("root")
);