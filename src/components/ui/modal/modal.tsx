import { ComponentPropsWithoutRef } from 'react'

import Close from '@/assets/images/icons/Close'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type ModalProps = ComponentPropsWithoutRef<typeof Dialog.Root>
export const Modal = ({ children, ...rest }: ModalProps) => (
  <Dialog.Root {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.DialogOverlay} />
      <Dialog.Content className={s.DialogContent}>
        <Dialog.Close>
          <span aria-label={'Close'} className={s.IconButton}>
            <Close height={'20'} width={'20'} />
          </span>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
