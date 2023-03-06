import { Button } from '@mui/material'
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
      <Question
        id={question.id}
        question={question.question}
        correctAnswerKey={question.correct_answer}
        answers={question.answers || {}}
        image={question.image}
      />
      <Button onClick={e => prevQuestion()}>Назад</Button>
      <Button onClick={e => nextQuestion()}>Далее</Button>
    </QuestionsListWrapper>
  )
}
