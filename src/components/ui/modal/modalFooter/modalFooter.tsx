import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modalFooter.module.scss'

type ModalFooterProps = {
  buttonTitle: string
  onClick?: () => void
} & ComponentPropsWithoutRef<'div'>

export const ModalFooter = forwardRef<ElementRef<typeof Dialog.Title>, ModalFooterProps>(
  ({ buttonTitle, onClick }, ref) => (
    <div className={s.DialogFooter} ref={ref}>
      <Dialog.Close>
        <Button variant={'secondary'}>Cancel</Button>
      </Dialog.Close>
      <Button onClick={onClick}>{buttonTitle}</Button>
    </div>
  )
)
