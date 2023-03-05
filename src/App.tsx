import React, { useEffect, useState } from "react";
import "./App.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { ThemesList } from "./components/ThemesList";
import { GroupWithQuestons, QuestionType } from "./types/group";
import { questions } from "./data/questions";
import { QuestionsList } from "./components/QuestionsList";
import { groupsByTheme } from "./data/groupsByTheme";

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
    color: #fff;
  }
`;

const App = () => {
  const [groupQuestions, setGroupQuestions] = useState<QuestionType[]>([]);
  const [groupsWithQuestions, setGroupsWithQuestions] = useState<
    GroupWithQuestons[]
  >([]);

  const handleGroup = (id: number) => {
    setGroupQuestions(
      groupsWithQuestions.find((elem) => elem.groupId === id)?.questions ?? []
    );
  };

  useEffect(() => {
    const themes = Object.entries(groupsByTheme);
    const groupsWithQuestions = themes.map((theme): GroupWithQuestons => {
      const themeId = parseInt(theme[0]);
      return {
        groupId: themeId,
        groupName: theme[1].title,
        questions: questions.filter((elem) => elem.group == themeId),
      };
    });
    setGroupsWithQuestions(groupsWithQuestions);
    setGroupQuestions(groupsWithQuestions[0].questions);
  }, [questions]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <div className="App">
        <header className="App-header">
          <h1>Armenian PDD</h1>
        </header>
        <ThemesList groups={groupsWithQuestions} handleGroup={handleGroup} />
        <QuestionsList questions={groupQuestions} />
      </div>
    </ThemeProvider>
  );
};

export default App;
