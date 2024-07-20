import { useNavigate } from 'react-router-dom'

import { FormValues, SignUp } from '@/components/auth/sing-up'
import { useSignupMutation } from '@/services/auth/auth.services'

import s from './signup-page.module.scss'

export const SignupPage = () => {
  const navigate = useNavigate()
  const [signup] = useSignupMutation()

  const loginHandler = (data: Omit<FormValues, 'confirmPassword'>) => {
    signup(data).then(_ => {
      navigate('/login')
    })
  }

  return (
    <div className={s.SignupPage}>
      <SignUp onSubmit={loginHandler} />
    </div>
  )
}
