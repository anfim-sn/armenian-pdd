import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Menu } from './Menu'

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background: #282c34;
  color: #fff;
`

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
`

export const Header = () => {
  return (
    <HeaderStyled className="App-header">
      <Logo to={'/'}>Armenian PDD</Logo>
      <Menu />
    </HeaderStyled>
  )
}
