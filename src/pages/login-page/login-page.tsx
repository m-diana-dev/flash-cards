import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormValues, SignIn } from '@/components/auth/sing-in'
import { errorHandler } from '@/helpers/errorHandler'
import { useLoginMutation } from '@/services/auth/auth.services'

import s from './login-page.module.scss'

export const LoginPage = () => {
  const [login, { error }] = useLoginMutation()

  useEffect(() => {
    if (error) {
      errorHandler(error)
    }
  }, [error])

  const navigate = useNavigate()
  const loginHandler = (data: FormValues) => {
    login(data).then(data => {
      if (!data.error) {
        navigate('/')
      }
    })
  }

  return (
    <div className={s.LoginPage}>
      <SignIn onSubmit={loginHandler} />
    </div>
  )
}
