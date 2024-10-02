import { ComponentPropsWithoutRef } from 'react'

import { Modal } from '@/components/ui/modal'
import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services/cards/cards.service'
import { Card } from '@/services/cards/cards.types'

type Props = {
  card: Card | null
} & ComponentPropsWithoutRef<typeof Modal>

export const DeleteCardModal = ({ card, onOpenChange, ...rest }: Props) => {
  const [deleteCard] = useDeleteCardMutation()

  const deleteCardHandler = () => {
    deleteCard({ id: card?.id ?? '' })
    onOpenChange?.(false)
  }

  return (
    <Modal {...rest} onClose={() => onOpenChange?.(false)} onOpenChange={onOpenChange}>
      <ModalTitle title={'Delete Card'} />
      <ModalMain>
        <Typography>
          Do you really want to remove <b>&quot;{card?.question}&quot;</b> ?
        </Typography>
      </ModalMain>
      <ModalFooter
        buttonTitle={'Delete Card'}
        onClick={deleteCardHandler}
        onClose={() => onOpenChange?.(false)}
      />
    </Modal>
  )
}
