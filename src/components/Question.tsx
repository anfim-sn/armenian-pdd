import { Button, ButtonGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuestionStatisticService } from '../contexts/ServiceContext'
import { QuestionStatistic } from '../services/QuestionsStatisticService'
import { Answer } from './Answer'

//#region Styles
const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ImageStyled = styled.img`
  max-width: 500px;
  height: 300px;
  margin: 0 auto;
  object-fit: cover;
`

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
//#endregion

type QuestionProps = {
  questionId: number
  question: string
  correctAnswerKey: string
  answers: Record<string, string>
  image: string
  nextQuestionHandle: () => void
}

export const Question = ({
  questionId,
  question,
  correctAnswerKey,
  answers,
  image,
  nextQuestionHandle,
}: QuestionProps) => {
  const questionStatisticService = useQuestionStatisticService()
  const [answerResult, setAnswerResult] = useState('')
  const [selectedAnswerKey, setSelectedAnswerKey] = useState('')
  const [questionStatistic, setQuestionStatistic] = useState<QuestionStatistic>(
    questionStatisticService.getByQuestionId(questionId)
  )
  const isAnswered = answerResult !== ''

  useEffect(() => {
    setAnswerResult('')
    setSelectedAnswerKey('')
    setQuestionStatistic(questionStatisticService.getByQuestionId(questionId))
  }, [questionId])

  useEffect(() => {
    setQuestionStatistic(questionStatisticService.getByQuestionId(questionId))
  }, [selectedAnswerKey])

  const handleAnswer = (answerKey: string) => () => {
    setSelectedAnswerKey(answerKey)

    if (answerKey === correctAnswerKey) {
      setAnswerResult('Правильно')
      questionStatisticService.setQuestionStatistic(questionId, true)
    } else {
      setAnswerResult('Неверно')
      questionStatisticService.setQuestionStatistic(questionId, false)
    }
  }

  const handleShowCorrectAnswer = () => {
    setAnswerResult('Неверно')
  }

  return (
    <QuestionWrapper>
      <p>
        Статистика ответов: <span>{questionStatistic.correct}✅ </span>
        <span>{questionStatistic.incorrect}❌</span>
      </p>
      {image ? (
        <ImageStyled src={'./assets/images/pddticket/small/' + image} />
      ) : (
        <ImagePlaceholder>Вопрос без изображения</ImagePlaceholder>
      )}
      <Typography variant="h5">
        {question}{' '}
        {answerResult && (answerResult === 'Правильно' ? '✅' : '❌')}
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
      {!isAnswered ? (
        <ButtonGroup>
          <Button sx={{ width: '50%' }} onClick={handleShowCorrectAnswer}>
            Показать правильный ответ
          </Button>
          <Button sx={{ width: '50%' }} onClick={nextQuestionHandle}>
            Пропустить
          </Button>
        </ButtonGroup>
      ) : (
        <Button variant="contained" sx={{ mt: 1 }} onClick={nextQuestionHandle}>
          Далее
        </Button>
      )}
    </QuestionWrapper>
  )
}
