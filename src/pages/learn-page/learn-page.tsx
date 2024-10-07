import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import ArrowBack from '@/assets/images/icons/ArrowBack'
import { gradeCardSchema } from '@/components/auth/forms-schems'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormRadio } from '@/components/ui/form/form-radio'
import { Preloader } from '@/components/ui/preloader'
import { PreloaderLine } from '@/components/ui/preloader-line'
import { Typography } from '@/components/ui/typography'
import {
  useAnswerCardMutation,
  useGetCardLearnQuery,
  useGetDeckQuery,
} from '@/services/decks/decks.service'
import { z } from 'zod'

import s from './learn-page.module.scss'

export type FormValues = z.infer<typeof createLearnCardSchema>

const createLearnCardSchema = z.object({
  grade: gradeCardSchema,
})

export const LearnPage = () => {
  const [isFirstQuestion, setIsFirstQuestion] = useState(true)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { data: cardRandom, isLoading } = useGetCardLearnQuery({
    id: location.pathname.replace('/decks/', '').replace('/learn', ''),
  })

  const { data: deck } = useGetDeckQuery({ id: cardRandom?.deckId ?? '' })

  const [answerCard, { data: newCard, isLoading: isLoadingNewCard }] = useAnswerCardMutation()

  const card = isFirstQuestion ? cardRandom : newCard

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' })

  const onSubmitForm = handleSubmit(data => {
    answerCard({ cardId: card?.id ?? '', grade: +data.grade as 1 | 2 | 3 | 4 | 5 })
    setShowAnswer(false)
    reset()
    if (isFirstQuestion) {
      setIsFirstQuestion(false)
    }
  })

  if (isLoading) {
    return <Preloader />
  }

  return (
    <div className={s.LearnPage}>
      {isLoadingNewCard && <PreloaderLine />}
      <Button className={s.LearnPageButton} onClick={() => navigate('/')} variant={'link'}>
        <ArrowBack />
        Back to Decks List
      </Button>
      <Card>
        <Typography as={'h1'} className={s.LearnPageTitle} variant={'h1'}>
          Learn {deck?.name}
        </Typography>
        {card?.question && (
          <div className={s.LearnPageQuestion}>
            <Typography as={'span'} variant={'subtitle1'}>
              Question:
            </Typography>
            <Typography as={'span'}>{card?.question}</Typography>
          </div>
        )}
        {card?.questionImg && (
          <img alt={'Question'} className={s.LearnPageQuestionImg} src={card?.questionImg} />
        )}
        <Typography as={'div'} className={s.LearnPageShots} variant={'body2'}>
          Number of answers per question: <b>{card?.shots}</b>
        </Typography>
        {!showAnswer && (
          <Button fullWidth onClick={() => setShowAnswer(true)}>
            Show Answer
          </Button>
        )}
        {showAnswer && (
          <>
            <div className={s.LearnPageAnswer}>
              <Typography as={'span'} variant={'subtitle1'}>
                Answer:
              </Typography>
              <Typography as={'span'}>{card?.answer}</Typography>
            </div>
            {card?.answerImg && (
              <img alt={'Question'} className={s.LearnPageAnswerImg} src={card?.answerImg} />
            )}
            <form onSubmit={onSubmitForm}>
              <Typography as={'div'} className={s.LearnPageFormTitle} variant={'subtitle1'}>
                Rate yourself:
              </Typography>
              <FormRadio
                className={s.LearnPageFormRadioGroup}
                control={control}
                items={[
                  { title: 'Did not know', value: 1 },
                  { title: 'Forgot', value: 2 },
                  { title: 'A lot of thought', value: 3 },
                  { title: 'Сonfused', value: 4 },
                  { title: 'Knew the answer', value: 5 },
                ]}
                name={'grade'}
              />
              <Button disabled={!isDirty} fullWidth>
                Next Question
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  )
}
