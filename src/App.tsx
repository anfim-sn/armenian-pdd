import React, { useEffect, useState } from 'react'
import './App.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
import { ThemesList } from './components/ThemesList'
import { GroupWithQuestons, Questions } from './types/group'
import { questions } from './data/questions'
import { QuestionsList } from './components/QuestionsList'
import { groupsByTheme } from './data/groupsByTheme'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

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
`

const themes = Object.entries(groupsByTheme)
const normalizedQuestions = questions.map(elem => {
  const questionEntry = Object.entries(elem)
  return {
    ...elem,
    answers: questionEntry.reduce((acc, cur) => {
      const result = {}
      if (cur[0].startsWith('answer_')) {
        Object.assign(acc, { [cur[0]]: cur[1] })
      }
      return acc
    }, {}),
  }
})

const groupsWithQuestions = themes.map((theme): GroupWithQuestons => {
  const themeId = parseInt(theme[0])
  return {
    groupId: themeId,
    groupName: theme[1].title,
    questions: normalizedQuestions.filter(elem => elem.group == themeId),
  }
})

const App = () => {
  const [groupQuestions, setGroupQuestions] = useState(
    groupsWithQuestions?.[0].questions ?? {}
  )

  const handleGroup = (id: number) => {
    console.log(id)

    setGroupQuestions(
      groupsWithQuestions.find(elem => elem.groupId === id)?.questions ?? []
    )
  }

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
  )
}

export default App
