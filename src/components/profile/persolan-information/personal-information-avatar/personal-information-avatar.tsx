import { useEffect, useState } from 'react'

import Edit from '@/assets/images/icons/Edit'
import { Typography } from '@/components/ui/typography'
import { UserUpdate } from '@/services/auth/auth.types'
import clsx from 'clsx'

import scommon from '../personal-information.module.scss'
import s from './personal-information-avatar.module.scss'

type Props = {
  editMode: boolean
  img: string
  name: string
  updateUserHandler?: (data: UserUpdate) => void
}
export const PersonalInformationAvatar = ({ editMode, img, name, updateUserHandler }: Props) => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(img)

  useEffect(() => {
    if (avatar) {
      const newPreview = URL.createObjectURL(avatar)

      updateUserHandler?.({ avatar: avatar, name })
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [avatar])

  return (
    <div className={s.Avatar}>
      {preview ? (
        <img alt={'avatar'} src={preview} />
      ) : (
        <div className={s.NoAvatar}>
          <Typography as={'span'} variant={'h1'}>
            {name?.[0]}
          </Typography>
        </div>
      )}

      {!editMode && (
        <button className={clsx(scommon.ButtonEdit, s.ButtonEdit)}>
          <input
            accept={'image/png, image/jpeg'}
            className={s.ButtonEditInput}
            onChange={e => setAvatar(e.target.files?.[0] ?? null)}
            type={'file'}
          />
          <Edit />
        </button>
      )}
    </div>
  )
}
