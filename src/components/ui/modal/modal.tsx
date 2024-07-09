import { ComponentPropsWithoutRef } from 'react'

import Close from '@/assets/images/icons/Close'
import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = {
  buttonTriggerTitle: string
} & ComponentPropsWithoutRef<typeof Dialog.Root>
export const Modal = ({ buttonTriggerTitle, children }: ModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button>{buttonTriggerTitle}</Button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <Dialog.Close asChild>
          <button aria-label={'Close'} className={s.IconButton}>
            <Close height={'20'} width={'20'} />
          </button>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
