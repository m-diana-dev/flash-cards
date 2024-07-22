import { useNavigate } from 'react-router-dom'

import { ForgotPassword, FormValues } from '@/components/auth/forgot-password/forgot-password'
import { useRecoverPasswordMutation } from '@/services/auth/auth.services'

import s from './forgot-password.module.scss'

export const ForgotPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()

  const forgotPasswordHandler = (data: FormValues) => {
    recoverPassword(data).then(() => {
      navigate('/check-email', { state: { email: data.email } })
    })
  }

  return (
    <div className={s.ForgotPasswordPage}>
      <ForgotPassword onSubmit={forgotPasswordHandler} />
    </div>
  )
}
