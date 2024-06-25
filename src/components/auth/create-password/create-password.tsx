import { useForm } from 'react-hook-form'

import { passwordSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form/form-input'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-password.module.scss'

export type FormValues = z.infer<typeof createPasswordFormSchema>

const createPasswordFormSchema = z.object({
  password: passwordSchema,
})

type Props = {
  onSubmit: (data: FormValues) => void
}

export const CreatePassword = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(createPasswordFormSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <Card className={s.Card}>
      <Typography as={'h1'} className={s.Title} variant={'h1'}>
        Create new password
      </Typography>
      <form onSubmit={onSubmitForm}>
        <FormInput
          autoComplete={'password'}
          className={s.Input}
          control={control}
          label={'Password'}
          name={'password'}
          variant={'password'}
        />
        <Typography as={'div'} className={s.Label} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button className={s.Button} fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
