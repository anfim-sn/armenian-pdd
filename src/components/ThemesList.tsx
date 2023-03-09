import { Typography } from '@mui/material'
import styled from 'styled-components'
import { GroupWithQuestons } from '../types/group'
import { Theme } from './Theme'

const ThemeListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

type ThemeListProps = {
  groups: GroupWithQuestons[]
  handleGroup: Function
  selectedGroupId: number
}

export const ThemesList = ({
  groups,
  handleGroup,
  selectedGroupId,
}: ThemeListProps) => {
  return (
    <ThemeListStyled>
      <Typography variant="h5">Темы</Typography>
      {groups.map(({ groupId, groupName, questions }) => (
        <Theme
          key={groupId}
          groupId={groupId}
          handleTheme={handleGroup}
          isSelected={groupId === selectedGroupId}
        >
          {groupName} ({questions.length})
        </Theme>
      ))}
    </ThemeListStyled>
  )
}
