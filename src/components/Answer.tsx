import { Button } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

type AnswerProps = {
  text: string
  isCorrect: boolean
  showAnswer: boolean
  onClick?: MouseEventHandler
}

const AnswerStyled = styled.div<{
  isCorrect: boolean
  showAnswer: boolean
}>`
  color: ${({ isCorrect, showAnswer }) =>
    (showAnswer && isCorrect && 'green') ||
    (showAnswer && !isCorrect && 'red') ||
    'white'};
`

export const Answer = ({
  text,
  isCorrect,
  showAnswer,
  onClick,
}: AnswerProps) => {
  return (
    <Button variant="outlined" sx={{ width: '100%', mt: 2 }} onClick={onClick}>
      <AnswerStyled isCorrect={isCorrect} showAnswer={showAnswer}>
        {text}
      </AnswerStyled>
    </Button>
  )
}
