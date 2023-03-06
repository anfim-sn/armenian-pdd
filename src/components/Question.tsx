import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Answer } from './Answer'

const ImagePlaceholder = styled.div`
  width: 500px;
  height: 300px;
  border: 2px solid #606060;
  color: #606060;
  font-size: 25px;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

type QuestionProps = {
  id: number
  question: string
  correctAnswerKey: string
  answers: Record<string, string>
  image: string
}

export const Question = ({
  id,
  question,
  correctAnswerKey,
  answers,
  image,
}: QuestionProps) => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [answerState, setAnswerState] = useState('')
  const [selectedAnswerKey, setSelectedAnswerKey] = useState('')

  useEffect(() => {
    setIsAnswered(false)
    setAnswerState('')
    setSelectedAnswerKey('')
  }, [id])

  const handleAnswer = (answerKey: string) => () => {
    setSelectedAnswerKey(answerKey)
    setIsAnswered(true)

    if (answerKey === correctAnswerKey) {
      setAnswerState('Правильно')
    } else {
      setAnswerState('Неверно')
    }
  }

  const handleShowCorrectAnswer = () => {
    setIsAnswered(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {image ? (
        <img
          src={'./assets/images/pddticket/small/' + image}
          style={{ height: '300px', margin: '0 auto' }}
        />
      ) : (
        <ImagePlaceholder>Вопрос без изображения</ImagePlaceholder>
      )}
      <Typography variant="h5">
        {question} {answerState && (answerState === 'Правильно' ? '✅' : '❌')}
      </Typography>
      <ul>
        {Object.entries(answers)
          .filter(([_, answerText]) => answerText !== '')
          .map(([answerKey, answerText]) => {
            const isCorrect = correctAnswerKey === answerKey
            const isSelected = selectedAnswerKey === answerKey
            const showAnswer = isCorrect || isSelected
            return (
              <Answer
                key={answerKey}
                text={answerText}
                isCorrect={isCorrect}
                showAnswer={isAnswered && showAnswer}
                onClick={!isAnswered ? handleAnswer(answerKey) : undefined}
              />
            )
          })}
      </ul>
      <Button onClick={handleShowCorrectAnswer} disabled={isAnswered}>
        Показать правильный ответ
      </Button>
    </div>
  )
}
