import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container/container'
import { HeaderUser } from '@/components/ui/header/headerUser/headerUser'
import { Typography } from '@/components/ui/typography'

import s from './header.module.scss'

type PropsBase = {
  isAuthenticated: boolean
}

type AuthenticatedProps = {
  avatar: string | undefined
  email: string | undefined
  isAuthenticated: true
  name: string | undefined
} & PropsBase

type UnauthenticatedProps = {
  avatar?: string | undefined
  email?: string | undefined
  isAuthenticated: false
  name?: string | undefined
} & PropsBase

type Props = AuthenticatedProps | UnauthenticatedProps

export const Header = ({ avatar, email, isAuthenticated, name }: Props) => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapp}>
          <Link to={'/'}>
            <Typography className={s.logoText} variant={'h1'}>
              FlashCards
            </Typography>
          </Link>
          {isAuthenticated && <HeaderUser avatar={avatar} email={email} name={name} />}
          {!isAuthenticated && (
            <Button as={Link} to={'/login'} variant={'secondary'}>
              Sign In
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
