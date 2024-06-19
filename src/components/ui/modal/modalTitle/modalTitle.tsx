import { ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modalTitle.module.scss'

type ModalTitleProps = {
  title: string
}
export const ModalTitle = forwardRef<ElementRef<typeof Dialog.Title>, ModalTitleProps>(
  ({ title }, ref) => (
    <Dialog.Title className={s.DialogTitle} ref={ref}>
      <Typography as={'span'} variant={'h3'}>
        {title}
      </Typography>
    </Dialog.Title>
  )
)
