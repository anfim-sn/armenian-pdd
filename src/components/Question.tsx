import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Answer } from './Answer'

type QuestionProps = {
  id: number
  question: string
  correctAnswerKey: string
  answers: Record<string, string>
}

export const Question = ({
  id,
  question,
  correctAnswerKey,
  answers,
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
    <div>
      <p>
        Вопрос: {question} {answerState}
      </p>

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
      {!isAnswered && (
        <Button onClick={handleShowCorrectAnswer}>Показать правильный</Button>
      )}
    </div>
  )
}
