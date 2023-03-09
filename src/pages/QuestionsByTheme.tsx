import { useState } from 'react'
import { QuestionsList } from '../components/QuestionsList'
import { ThemesList } from '../components/ThemesList'
import { groupsByTheme } from '../data/groupsByTheme'
import { questions } from '../data/questions'
import { GroupWithQuestons } from '../types/group'

const themes = Object.entries(groupsByTheme)
const normalizedQuestions = questions.map(elem => {
  const questionEntry = Object.entries(elem)
  return {
    ...elem,
    answers: questionEntry.reduce((acc, cur) => {
      const result = {}
      if (cur[0].startsWith('answer_')) {
        Object.assign(acc, { [cur[0]]: cur[1] })
      }
      return acc
    }, {}),
  }
})

const groupsWithQuestions = themes.map((theme): GroupWithQuestons => {
  const themeId = parseInt(theme[0])
  return {
    groupId: themeId,
    groupName: theme[1].title,
    questions: normalizedQuestions.filter(elem => elem.group == themeId),
  }
})
export const QuestionsByTheme = () => {
  const [selectedGroup, setSelectedGroup] = useState(
    groupsWithQuestions.find(elem => elem.groupId === 1) ?? null
  )
  const [groupQuestions, setGroupQuestions] = useState(
    groupsWithQuestions.find(elem => elem.groupId === 1)?.questions ?? []
  )

  const handleGroup = (id: number) => {
    setSelectedGroup(
      groupsWithQuestions.find(elem => elem.groupId === id) ?? null
    )

    setGroupQuestions(
      groupsWithQuestions.find(elem => elem.groupId === id)?.questions ?? []
    )
  }

  return (
    <div>
      <ThemesList
        groups={groupsWithQuestions}
        handleGroup={handleGroup}
        selectedGroup={selectedGroup}
      />
      <QuestionsList questions={groupQuestions} />
    </div>
  )
}
