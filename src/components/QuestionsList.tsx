import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Questions } from '../types/group'
import { Question } from './Question'

type QuestionsListProps = {
  questions: Questions
}

const QuestionsListWrapper = styled.div`
  margin-top: 40px;
`

export const QuestionsList = ({ questions = [] }: QuestionsListProps) => {
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questions?.[0] ?? {})

  useEffect(() => {
    setQuestion(questions?.[0] ?? [0])
  }, [questions])

  const nextQuestion = () => {
    let i = index + 1
    if (questions[i] !== undefined) {
      setQuestion(questions[i])
      setIndex(i)
    }
  }
  const prevQuestion = () => {
    let i = index - 1
    if (questions[i] !== undefined) {
      setQuestion(questions[i])
      setIndex(i)
    }
  }

  return (
    <QuestionsListWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" sx={{ m: 1 }} onClick={e => prevQuestion()}>
          Назад
        </Button>
        <Typography variant="h6">Вопрос №{index + 1}</Typography>
        <Button variant="contained" sx={{ m: 1 }} onClick={e => nextQuestion()}>
          Далее
        </Button>
      </div>
      <Question
        id={question.id}
        question={question.question}
        correctAnswerKey={question.correct_answer}
        answers={question.answers || {}}
        image={question.image}
      />
    </QuestionsListWrapper>
  )
}
