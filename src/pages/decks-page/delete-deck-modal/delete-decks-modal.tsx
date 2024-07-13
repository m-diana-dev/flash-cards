import { ComponentPropsWithoutRef } from 'react'

import { Modal } from '@/components/ui/modal'
import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Deck } from '@/services/decks/decks.types'

type Props = {
  deck: Deck | null
} & ComponentPropsWithoutRef<typeof Modal>

export const DeleteDecksModal = ({ deck, onOpenChange, ...rest }: Props) => {
  const [deleteDeck] = useDeleteDeckMutation()
  const onClose = () => {
    onOpenChange?.(false)
  }

  const DeleteDeckHandler = () => {
    onClose()
    deleteDeck({ id: deck?.id })
  }

  return (
    <Modal {...rest} onClose={onClose} onOpenChange={onOpenChange}>
      <ModalTitle title={'Delete Deck'} />
      <ModalMain>
        <Typography>
          Do you really want to remove <b>{deck?.name}</b>
        </Typography>
        <Typography>All cards will be deleted.</Typography>
      </ModalMain>
      <ModalFooter buttonTitle={'Delete Deck'} onClick={DeleteDeckHandler} onClose={onClose} />
    </Modal>
  )
}
