import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { UserUpdate } from '@/services/auth/auth.types'

import s from './personal-information.module.scss'

import { PersonalInformationInfo } from './persolan-information-info/personal-information-info'
import { PersonalInformationAvatar } from './personal-information-avatar/personal-information-avatar'
import {
  PersonalInformationForm,
  ProfileEditValues,
} from './personal-information-form/personal-information-form'

type PersonalInformationProps = {
  deleteAccount?: () => void
  editModeDefault?: boolean
  email: string
  img: string
  logout?: () => void
  name: string
  updateUserHandler?: (data: UserUpdate) => void
}

export const PersonalInformation = ({
  deleteAccount,
  editModeDefault = false,
  email,
  img,
  logout,
  name,
  updateUserHandler,
}: PersonalInformationProps) => {
  const [editMode, setEditMode] = useState<boolean>(editModeDefault)

  const onSubmit = (data: ProfileEditValues) => {
    updateUserHandler?.({ name: data.name })
    setEditMode(false)
  }

  return (
    <Card className={s.PersonalInformation}>
      <Typography as={'h1'} className={s.Title} variant={'h1'}>
        Personal Information
      </Typography>
      <PersonalInformationAvatar
        editMode={editMode}
        img={img}
        name={name}
        updateUserHandler={updateUserHandler}
      />
      {editMode ? (
        <PersonalInformationForm name={name} onSubmit={onSubmit} />
      ) : (
        <PersonalInformationInfo
          deleteAccount={deleteAccount}
          email={email}
          logout={logout}
          name={name}
          setEditMode={setEditMode}
        />
      )}
    </Card>
  )
}
