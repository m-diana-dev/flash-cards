import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Button } from '@/components/ui/button'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modalFooter.module.scss'

type ModalFooterProps = {
  buttonTitle: string
  onClick?: () => void
} & ComponentPropsWithoutRef<'div'>

export const ModalFooter = forwardRef<ElementRef<typeof Dialog.Title>, ModalFooterProps>(
  ({ buttonTitle, onClick, setIsOpen }, ref) => (
    <div className={s.DialogFooter} ref={ref}>
      <Button as={'span'} onClick={() => setIsOpen?.(false)} variant={'secondary'}>
        Cancel
      </Button>
      <Button onClick={onClick}>{buttonTitle}</Button>
    </div>
  )
)
