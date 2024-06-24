import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form/form-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personal-information-form.module.scss'

type Props = {
  name: string
  onSubmit: (data: ProfileEditValues) => void
}

export type ProfileEditValues = z.infer<typeof profileSchema>

const profileSchema = z.object({
  name: z.string().min(2),
})

export const PersonalInformationForm = ({ name, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileEditValues>({ resolver: zodResolver(profileSchema) })

  const onSubmitForm = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={s.Form} onSubmit={onSubmitForm}>
      <FormInput
        control={control}
        defaultValue={name}
        error={errors.name?.message}
        label={'Nickname'}
        name={'name'}
        placeholder={''}
      />
      <Button className={s.Button} fullWidth>
        Save Changes
      </Button>
    </form>
  )
}
