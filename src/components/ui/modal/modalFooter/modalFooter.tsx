import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modalFooter.module.scss'

type ModalFooterProps = {
  buttonTitle: string
  onClick?: () => void
  onClose?: () => void
} & ComponentPropsWithoutRef<'div'>

export const ModalFooter = forwardRef<ElementRef<typeof Dialog.Title>, ModalFooterProps>(
  ({ buttonTitle, onClick, onClose }, ref) => (
    <div className={s.DialogFooter} ref={ref}>
      <Button as={'button'} onClick={onClose} type={'button'} variant={'secondary'}>
        Cancel
      </Button>
      <Button onClick={onClick}>{buttonTitle}</Button>
    </div>
  )
)
