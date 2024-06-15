import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form/form-textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sing-up.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string().min(3, 'Password has to be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(3, 'Password has to be at least 3 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormType = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (data: SignUpFormType) => void
}

export const SignUp = (props: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <Card className={s.card}>
        <Typography className={s.title} variant={'h1'}>
          Sign Up
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <FormInput
              control={control}
              error={errors.email?.message}
              label={'Email'}
              name={'email'}
              placeholder={'Email'}
            />
            <FormInput
              control={control}
              error={errors.password?.message}
              label={'Password'}
              name={'password'}
              placeholder={'Password'}
              type={'password'}
            />
            <FormInput
              control={control}
              error={errors.confirmPassword?.message}
              label={'Confirm Password'}
              name={'confirmPassword'}
              placeholder={'Confirm Password'}
              type={'password'}
            />
          </div>
          <Button className={s.button} fullWidth type={'submit'}>
            Sign Up
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography className={s.signIn} variant={'link1'}>
          Sign In
        </Typography>
      </Card>
    </>
  )
}
