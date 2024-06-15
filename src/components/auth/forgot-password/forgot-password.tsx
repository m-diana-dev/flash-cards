import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form/form-textField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'
export type FormValues = z.infer<typeof passwordFormSchema>

const passwordFormSchema = z.object({
  email: z.string().email(),
})

type Props = {
  onSubmit: (data: FormValues) => void
}
export const ForgotPassword = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(passwordFormSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.Card}>
      <Typography as={'h1'} className={s.Title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <form onSubmit={onSubmitForm}>
        <FormInput
          autoComplete={'email'}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={''}
        />
        <Typography as={'div'} className={s.Label} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.Button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography as={'div'} className={s.Note} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <Button as={'a'} className={s.Link} href={'#'} variant={'link'}>
        Try logging in
      </Button>
    </Card>
  )
}
