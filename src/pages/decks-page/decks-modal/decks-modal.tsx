import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Delete from '@/assets/images/icons/Delete'
import Image from '@/assets/images/icons/Image'
import { nameDeckSchema, privatePackSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/form/form-checkbox'
import { FormInput } from '@/components/ui/form/form-input'
import { Modal } from '@/components/ui/modal'
import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './decks-modal.module.scss'

export type addDeckEditValues = { cover?: File | null } & z.infer<typeof addDeckSchema>

const addDeckSchema = z.object({
  isPrivate: privatePackSchema,
  name: nameDeckSchema,
})

type Props = {
  cleanFilter: () => void
} & ComponentPropsWithoutRef<typeof Modal>

export const DecksModal = ({ cleanFilter, onOpenChange, ...rest }: Props) => {
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  useEffect(() => {
    if (cover) {
      const newPreview = URL.createObjectURL(cover)

      if (preview) {
        URL.revokeObjectURL(preview)
      }
      setPreview(newPreview)

      return () => URL.revokeObjectURL(newPreview)
    }
  }, [cover])

  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset } = useForm<addDeckEditValues>({
    defaultValues: {
      isPrivate: true,
      name: '',
    },
    resolver: zodResolver(addDeckSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    createDeck({ ...data, cover })
    reset()
    onOpenChange?.(false)
  })

  const onClose = () => {
    reset()
    onOpenChange?.(false)
  }

  return (
    <Modal {...rest} onClose={onClose} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmitForm}>
        <ModalTitle title={'Add New Deck'} />
        <ModalMain>
          <FormInput
            className={s.PageFormInput}
            control={control}
            label={'Name Pack'}
            name={'name'}
          />
          <Button className={s.PageFormButton} fullWidth type={'button'} variant={'secondary'}>
            <input
              accept={'image/*'}
              className={s.PageFormButtonInput}
              onChange={e => setCover(e.target.files?.[0] ?? null)}
              type={'file'}
            />
            <Image />
            {cover ? 'Change Image' : 'Upload Image'}
          </Button>
          {preview && (
            <div className={s.PageFormImg}>
              <img alt={'img'} src={preview} />
              <button
                className={s.PageFormImgDelete}
                onClick={() => {
                  setPreview('')
                  setCover(null)
                }}
                type={'button'}
              >
                <Delete height={40} width={40} />
              </button>
            </div>
          )}
          <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        </ModalMain>
        <ModalFooter buttonTitle={'Add New Pack'} onClick={cleanFilter} onClose={onClose} />
      </form>
    </Modal>
  )
}
