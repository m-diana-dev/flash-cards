import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './personal-information.module.scss'

import { PersonalInformationInfo } from './persolan-information-info/personal-information-info'
import { PersonalInformationAvatar } from './personal-information-avatar/personal-information-avatar'
import {
  PersonalInformationForm,
  ProfileEditValues,
} from './personal-information-form/personal-information-form'

type PersonalInformationProps = {
  editModeDefault?: boolean
  email: string
  img: string
  name: string
}

export const PersonalInformation = ({
  editModeDefault = false,
  email,
  img,
  name,
}: PersonalInformationProps) => {
  const [editMode, setEditMode] = useState<boolean>(editModeDefault)
  const [nickname, setNickname] = useState<string>(name)

  const onSubmit = (data: ProfileEditValues) => {
    setNickname(data.name)
    setEditMode(false)
  }

  return (
    <Card className={s.PersonalInformation}>
      <Typography as={'h1'} className={s.Title} variant={'h1'}>
        Personal Information
      </Typography>
      <PersonalInformationAvatar editMode={editMode} img={img} />
      {editMode ? (
        <PersonalInformationForm name={nickname} onSubmit={onSubmit} />
      ) : (
        <PersonalInformationInfo email={email} name={nickname} setEditMode={setEditMode} />
      )}
    </Card>
  )
}
