import './App.css'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
import { QuestionsStatisticService } from './services/QuestionsStatisticService'
import { ServicesProvider } from './contexts/ServiceContext'
import { Header } from './components/Header'
import { MenuRouter } from './routers/MenuRouter'
import { BrowserRouter } from 'react-router-dom'

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

const App = () => {
  return (
    <ServicesProvider
      value={{ questionStatisticService: QuestionsStatisticService }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyled />
          <Header />
          <main className="App">
            <MenuRouter />
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </ServicesProvider>
  )
}

export default App
