import {
  UserDropdown,
  UserDropdownProps,
} from '@/components/layout/header/user-dropdown/user-dropdown'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container/container'
import { Logo } from '@/images/icons/dropDown/Logo'

import s from './header.module.scss'

export type HeaderProps =
  | ({
      isAuthenticated: false
    } & Partial<UserDropdownProps>)
  | ({
      isAuthenticated: true
    } & UserDropdownProps)

export const Header = ({ email, isAuthenticated, name, photo, photoDesc }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Container>
        <div className={s.content}>
          <a href={'/'}>
            <Logo />
          </a>
          {isAuthenticated && (
            <UserDropdown email={email} name={name} photo={photo} photoDesc={photoDesc} />
          )}
          {!isAuthenticated && (
            <Button as={'a'} href={'/sign-in'} variant={'secondary'}>
              Sign In
            </Button>
          )}
        </div>
      </Container>
    </header>
  )
}
