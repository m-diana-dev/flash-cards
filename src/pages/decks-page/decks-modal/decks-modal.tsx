import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { nameDeckSchema, privatePackSchema } from '@/components/auth/forms-schems'
import { FormCheckbox } from '@/components/ui/form/form-checkbox'
import { FormInput } from '@/components/ui/form/form-input'
import { Modal } from '@/components/ui/modal'
import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/pages/decks-page/decks-page.module.scss'

export type addDeckEditValues = z.infer<typeof addDeckSchema>

const addDeckSchema = z.object({
  isPrivate: privatePackSchema,
  name: nameDeckSchema,
})

type Props = {
  cleanFilter: () => void
} & ComponentPropsWithoutRef<typeof Modal>

export const DecksModal = ({ cleanFilter, onOpenChange, ...rest }: Props) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset } = useForm<addDeckEditValues>({
    resolver: zodResolver(addDeckSchema),
  })

  const onSubmitForm = handleSubmit(data => {
    createDeck(data)
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
          <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        </ModalMain>
        <ModalFooter buttonTitle={'Add New Pack'} onClick={cleanFilter} onClose={onClose} />
      </form>
    </Modal>
  )
}
