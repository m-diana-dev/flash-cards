import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import s from './modalMain.module.scss'

type ModalMainProps = ComponentPropsWithoutRef<'div'>

export const ModalMain = forwardRef<ElementRef<typeof Dialog.Title>, ModalMainProps>(
  ({ children }, ref) => (
    <div className={s.DialogMain} ref={ref}>
      {children}
    </div>
  )
)
