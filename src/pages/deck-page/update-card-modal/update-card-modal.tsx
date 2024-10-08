import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Delete from '@/assets/images/icons/Delete'
import Image from '@/assets/images/icons/Image'
import { answerCardSchema, questionCardSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/form/form-input'
import { Modal } from '@/components/ui/modal'
import { ModalFooter } from '@/components/ui/modal/modalFooter/modalFooter'
import { ModalMain } from '@/components/ui/modal/modalMain/modalMain'
import { ModalTitle } from '@/components/ui/modal/modalTitle/modalTitle'
import { Typography } from '@/components/ui/typography'
import { errorHandler } from '@/helpers/errorHandler'
import { useUpdateCardMutation } from '@/services/cards/cards.service'
import { Card } from '@/services/cards/cards.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './update-card-modal.module.scss'

export type updateCardEditValues = { cover?: File | null } & z.infer<typeof updateCardSchema>

const updateCardSchema = z.object({
  answer: answerCardSchema,
  question: questionCardSchema,
})

type Props = {
  card: Card | null
  deckId: string
} & ComponentPropsWithoutRef<typeof Modal>

export const UpdateCardModal = ({ card, deckId, onOpenChange, ...rest }: Props) => {
  const [coverQuestion, setCoverQuestion] = useState<File | null>(null)
  const [previewQuestion, setPreviewQuestion] = useState<string>('')
  const [coverAnswer, setCoverAnswer] = useState<File | null>(null)
  const [previewAnswer, setPreviewAnswer] = useState<string>('')

  useEffect(() => {
    if (card?.answerImg) {
      setPreviewAnswer(card?.answerImg)
    } else {
      setPreviewAnswer('')
    }
    if (card?.questionImg) {
      setPreviewQuestion(card?.questionImg)
    } else {
      setPreviewQuestion('')
    }
    if (card) {
      reset({
        answer: card.answer,
        question: card.question,
      })
    }
  }, [card])

  useEffect(() => {
    if (coverQuestion) {
      const newPreviewQuestion = URL.createObjectURL(coverQuestion)

      if (previewQuestion) {
        URL.revokeObjectURL(previewQuestion)
      }
      setPreviewQuestion(newPreviewQuestion)

      return () => URL.revokeObjectURL(newPreviewQuestion)
    }
  }, [coverQuestion])

  useEffect(() => {
    if (coverAnswer) {
      const newPreviewAnswer = URL.createObjectURL(coverAnswer)

      if (previewAnswer) {
        URL.revokeObjectURL(previewAnswer)
      }
      setPreviewAnswer(newPreviewAnswer)

      return () => URL.revokeObjectURL(newPreviewAnswer)
    }
  }, [coverAnswer])

  const [updateCard, { error }] = useUpdateCardMutation()

  const { control, handleSubmit, reset } = useForm<updateCardEditValues>({
    defaultValues: {
      answer: card?.answer,
      question: card?.question,
    },
    resolver: zodResolver(updateCardSchema),
  })

  useEffect(() => {
    if (error) {
      errorHandler(error)
    }
  }, [error])

  const onClose = () => {
    onOpenChange?.(false)
    reset()
    setCoverQuestion(null)
    setPreviewQuestion('')
    setCoverAnswer(null)
    setPreviewAnswer('')
  }

  const onSubmitForm = handleSubmit(data => {
    updateCard({ ...data, answerImg: coverAnswer, id: card?.id ?? '', questionImg: coverQuestion })
    onOpenChange?.(false)
    reset()
    setCoverQuestion(null)
    setPreviewQuestion('')
    setCoverAnswer(null)
    setPreviewAnswer('')
  })

  return (
    <Modal {...rest} onClose={onClose} onOpenChange={onOpenChange}>
      <form onSubmit={onSubmitForm}>
        <ModalTitle title={'Add New Card'} />
        <ModalMain>
          <Typography as={'div'} variant={'subtitle2'}>
            Question:
          </Typography>
          <FormInput
            className={s.PageFormInput}
            control={control}
            label={'Question'}
            name={'question'}
          />
          <Button className={s.PageFormButton} fullWidth type={'button'} variant={'secondary'}>
            <input
              accept={'image/*'}
              className={s.PageFormButtonInput}
              onChange={e => setCoverQuestion(e.target.files?.[0] ?? null)}
              type={'file'}
            />
            <Image />
            {coverQuestion ? 'Change Image' : 'Upload Image'}
          </Button>
          {previewQuestion && (
            <div className={s.PageFormImg}>
              <img alt={'img'} src={previewQuestion} />
              <button
                className={s.PageFormImgDelete}
                onClick={() => {
                  setPreviewQuestion('')
                  setCoverQuestion(null)
                }}
                type={'button'}
              >
                <Delete height={40} width={40} />
              </button>
            </div>
          )}
          <Typography as={'div'} variant={'subtitle2'}>
            Answer:
          </Typography>
          <FormInput
            className={s.PageFormInput}
            control={control}
            label={'Answer'}
            name={'answer'}
          />
          <Button className={s.PageFormButton} fullWidth type={'button'} variant={'secondary'}>
            <input
              accept={'image/*'}
              className={s.PageFormButtonInput}
              onChange={e => setCoverAnswer(e.target.files?.[0] ?? null)}
              type={'file'}
            />
            <Image />
            {coverAnswer ? 'Change Image' : 'Upload Image'}
          </Button>
          {previewAnswer && (
            <div className={s.PageFormImg}>
              <img alt={'img'} src={previewAnswer} />
              <button
                className={s.PageFormImgDelete}
                onClick={() => {
                  setPreviewAnswer('')
                  setCoverAnswer(null)
                }}
                type={'button'}
              >
                <Delete height={40} width={40} />
              </button>
            </div>
          )}
        </ModalMain>
        <ModalFooter buttonTitle={'Update Card'} onClose={onClose} />
      </form>
    </Modal>
  )
}
