import { ComponentPropsWithoutRef } from 'react'

import Close from '@/assets/images/icons/Close'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = {
  setIsOpen?: (isOpen: boolean) => void
} & ComponentPropsWithoutRef<typeof Dialog.Root>
export const Modal = ({ children, setIsOpen, ...rest }: ModalProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <button aria-label={'Close'} className={s.IconButton} onClick={() => setIsOpen?.(false)}>
          <Close height={'20'} width={'20'} />
        </button>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
