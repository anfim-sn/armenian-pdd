import React from "react";
import "./App.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    font-family: "Roboto", sans-serif;
  }

  body {
    background: #282c34;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <div className="App">
        <header className="App-header">
          <h1>Armenian PDD</h1>
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
