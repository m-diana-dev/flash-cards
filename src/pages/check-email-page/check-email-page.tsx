import { useLocation } from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email/check-email'

import s from './check-email-page.module.scss'

export const CheckEmailPage = () => {
  const location = useLocation()

  return (
    <div className={s.CheckEmailPage}>
      <CheckEmail email={location.state.email} />
    </div>
  )
}
