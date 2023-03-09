import { Accordion, AccordionDetails, Typography } from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GroupWithQuestons } from '../types/group'
import { Theme } from './Theme'

const AccordionStyled = styled(Accordion)`
  && {
    color: #fff;
    background-color: transparent;
    border-bottom: 1px solid #ffffff;
  }
`

const AccordionSummary = styled(MuiAccordionSummary).attrs({
  expandIcon: <span>▶</span>,
})`
  flex-direction: row-reverse;

  & .MuiAccordionSummary-content {
    margin: 20px 0;
  }

  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(90deg);
  }
  & .MuiAccordionSummary-expandIconWrapper {
    margin-right: 5px;
    color: #fff;
  }
`

type ThemeListProps = {
  groups: GroupWithQuestons[]
  handleGroup: Function
  selectedGroup: GroupWithQuestons | null
}

export const ThemesList = ({
  groups,
  handleGroup,
  selectedGroup,
}: ThemeListProps) => {
  const [expanded, setExpanded] = useState(false)

  const [title, setTitle] = useState('')

  useEffect(() => {
    if (selectedGroup?.questions.length === undefined) return

    let questionString = 'Вопросов'

    if (selectedGroup?.questions.length % 10 === 1) {
      questionString = 'Вопрос'
    } else if (
      selectedGroup?.questions.length % 10 > 1 &&
      selectedGroup?.questions.length % 10 < 5
    ) {
      questionString = 'Вопроса'
    }

    setTitle(
      `${selectedGroup?.groupName} (${selectedGroup?.questions.length} ${questionString})`
    )
  }, [selectedGroup?.groupId])

  const handleTheme = (groupId: number) => {
    handleGroup(groupId)
    setExpanded(false)
  }

  return (
    <AccordionStyled expanded={expanded} onChange={e => setExpanded(!expanded)}>
      <AccordionSummary>
        <Typography variant="h5">
          <span style={{ color: '#A0A0A0' }}>Темы: </span> {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {groups.map(({ groupId, groupName, questions }) => (
          <Theme
            key={groupId}
            groupId={groupId}
            handleTheme={handleTheme}
            isSelected={groupId === selectedGroup?.groupId}
          >
            {groupName} ({questions.length})
          </Theme>
        ))}
      </AccordionDetails>
    </AccordionStyled>
  )
}
