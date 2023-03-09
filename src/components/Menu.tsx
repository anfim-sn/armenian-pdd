import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const MenuStyled = styled.ul`
  display: flex;
  gap: 20px;
`

const MenuButton = styled(NavLink)`
  && {
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    padding: 5px 8px;
    text-decoration: none;
  }

  &:hover {
    background: #59acff39;
  }

  &.active {
    border-bottom: 1px solid #59acff;
    color: #59acff;
  }
`

export const Menu = () => {
  return (
    <MenuStyled>
      <MenuButton to="/">Вопросы по темам</MenuButton>
      <MenuButton to="/laws">Правила</MenuButton>
      <MenuButton to="/signs">Знаки</MenuButton>
    </MenuStyled>
  )
}
