import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { emailSchema, passwordSchema, rememberMeSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormCheckbox } from '@/components/ui/form/form-checkbox'
import { FormInput } from '@/components/ui/form/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: rememberMeSchema,
})

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (data: FormValues) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Sign In
        </Typography>
        <form onSubmit={onSubmitForm}>
          <FormInput className={s.input} control={control} label={'Email'} name={'email'} />
          <FormInput
            className={s.input}
            control={control}
            label={'Password'}
            name={'password'}
            variant={'password'}
          />
          <FormCheckbox
            className={s.checkbox}
            control={control}
            label={'Remember me'}
            name={'rememberMe'}
          />
          <Typography
            as={Link}
            className={s.recoverPassword}
            to={'/forgot-password'}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography className={s.caption} variant={'body2'}>
          {`Don't have an account?`}
        </Typography>
        <Typography as={Link} className={s.signUp} to={'/sign-up'} variant={'link1'}>
          Sign Up
        </Typography>
      </Card>
    </>
  )
}
