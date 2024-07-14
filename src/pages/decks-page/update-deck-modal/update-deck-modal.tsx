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
import { useUpdateDeckMutation } from '@/services/decks/decks.service'
import { Deck } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './update-deck-modal.module.scss'

export type updateDeckEditValues = { cover?: File | null } & z.infer<typeof updateDeckSchema>

const updateDeckSchema = z.object({
  isPrivate: privatePackSchema,
  name: nameDeckSchema,
})

type Props = {
  cleanFilter: () => void
  deck: Deck | null
} & ComponentPropsWithoutRef<typeof Modal>

export const UpdateDeckModal = ({ cleanFilter, deck, onOpenChange, ...rest }: Props) => {
  const [cover, setCover] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')

  console.log({ cover, preview })
  useEffect(() => {
    if (deck?.cover) {
      setPreview(deck?.cover)
    }
  }, [deck?.cover])
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

  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset } = useForm<updateDeckEditValues>({
    defaultValues: {
      isPrivate: deck?.isPrivate,
      name: deck?.name,
    },
    resolver: zodResolver(updateDeckSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    updateDeck({ id: deck?.id, ...data, cover })
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
        <ModalTitle title={'Update Deck'} />
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
            {cover || preview ? 'Change Image' : 'Upload Image'}
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
        <ModalFooter buttonTitle={'Update'} onClick={cleanFilter} onClose={onClose} />
      </form>
    </Modal>
  )
}
