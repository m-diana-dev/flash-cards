import { ChangeEvent, useState } from 'react'

import Edit from '@/images/icons/Edit'
import clsx from 'clsx'

import scommon from '../personal-information.module.scss'
import s from './personal-information-avatar.module.scss'

type Props = {
  editMode: boolean
  img: string
}
export const PersonalInformationAvatar = ({ editMode, img }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(img)
  const onChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={s.Avatar}>
      <img alt={'avatar'} src={imageSrc} />
      {!editMode && (
        <button className={clsx(scommon.ButtonEdit, s.ButtonEdit)}>
          <input
            accept={'image/png, image/jpeg'}
            className={s.ButtonEditInput}
            onChange={onChangeInputFile}
            type={'file'}
          />
          <Edit />
        </button>
      )}
    </div>
  )
}
