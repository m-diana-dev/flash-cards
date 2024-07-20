import { useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/sing-in'
import { useLoginMutation } from '@/services/auth/auth.services'

import s from './login-page.module.scss'

export const LoginPage = () => {
  const [login] = useLoginMutation()

  const navigate = useNavigate()
  const loginHandler = (data: FormValues) => {
    login(data).then(_ => {
      navigate('/')
    })
  }

  return (
    <div className={s.LoginPage}>
      <SignIn onSubmit={loginHandler} />
    </div>
  )
}
