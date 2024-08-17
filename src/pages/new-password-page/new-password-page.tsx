import { useLocation, useNavigate } from 'react-router-dom'

import { CreatePassword, FormValues } from '@/components/auth/create-password/create-password'
import { useResetPasswordMutation } from '@/services/auth/auth.services'

import s from './new-password-page.module.scss'

export const NewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()

  const location = useLocation()
  const navigate = useNavigate()

  const resetPasswordHandler = (data: FormValues) => {
    resetPassword({ ...data, token: location.pathname.replace('/new-password/', '') }).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className={s.NewPasswordPage}>
      <CreatePassword onSubmit={resetPasswordHandler} />
    </div>
  )
}
