import { Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Questions } from '../types/group'
import { Question } from './Question'

type QuestionsListProps = {
  questions: Questions
}

const QuestionsListWrapper = styled.div`
  width: 80%;
  margin: 40px auto;
`

const TopButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const QuestionsList = ({ questions = [] }: QuestionsListProps) => {
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(questions?.[0] ?? {})

  useEffect(() => {
    setQuestion(questions?.[0] ?? [0])
    setIndex(0)
  }, [questions])

  const nextQuestionHandle = () => {
    let i = index + 1
    if (questions[i] !== undefined) {
      setQuestion(questions[i])
      setIndex(i)
    }
  }
  const prevQuestionHandle = () => {
    let i = index - 1
    if (questions[i] !== undefined) {
      setQuestion(questions[i])
      setIndex(i)
    }
  }

  return (
    <QuestionsListWrapper>
      <TopButtonWrapper>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={e => prevQuestionHandle()}
        >
          Назад
        </Button>
        <Typography variant="h6">Вопрос №{index + 1}</Typography>
      </TopButtonWrapper>
      <Question
        questionId={question.id}
        question={question.question}
        correctAnswerKey={question.correct_answer}
        answers={question.answers || {}}
        image={question.image}
        nextQuestionHandle={nextQuestionHandle}
      />
    </QuestionsListWrapper>
  )
}
