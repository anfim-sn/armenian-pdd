import styled from 'styled-components'

type ThemeProps = {
  children: React.ReactNode
  groupId: number
  handleTheme: Function
  isSelected: boolean
}

const ThemeStyled = styled.li<{ isSelected: boolean }>`
  list-style: none;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    color: #a0a0a0;
  }

  ${({ isSelected }) => isSelected && { textDecoration: 'underline' }}
`

export const Theme = ({
  children,
  groupId,
  handleTheme,
  isSelected,
}: ThemeProps) => {
  return (
    <ThemeStyled isSelected={isSelected} onClick={e => handleTheme(groupId)}>
      {children}
    </ThemeStyled>
  )
}
