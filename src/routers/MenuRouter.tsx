import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import { Laws } from '../pages/Laws'
import { QuestionsByTheme } from '../pages/QuestionsByTheme'

export const MenuRouter = () => (
  <Routes>
    <Route path="/" element={<QuestionsByTheme />} />
    <Route path="/laws" element={<Laws />} />
  </Routes>
)
