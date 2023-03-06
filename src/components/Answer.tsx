import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

type AnswerProps = {
  text: string
  isCorrect: boolean
  showAnswer: boolean
  onClick?: MouseEventHandler
}

const AnswerStyled = styled.li<{
  isCorrect: boolean
  showAnswer: boolean
}>`
  color: ${({ isCorrect, showAnswer }) =>
    (showAnswer && isCorrect && 'green') ||
    (showAnswer && !isCorrect && 'red')};
`

export const Answer = ({
  text,
  isCorrect,
  showAnswer,
  onClick,
}: AnswerProps) => {
  return (
    <AnswerStyled
      onClick={onClick}
      isCorrect={isCorrect}
      showAnswer={showAnswer}
    >
      {text}
    </AnswerStyled>
  )
}
