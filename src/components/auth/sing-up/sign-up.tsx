import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { emailSchema, passwordSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: passwordSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: FormValues) => void
}

export const SignUp = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <>
      <Card className={s.card}>
        <Typography className={s.title} variant={'h1'}>
          Sign Up
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
          <FormInput
            className={s.input}
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            variant={'password'}
          />
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Typography className={s.caption} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={Link} className={s.signIn} to={'/sign-in'} variant={'link1'}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
