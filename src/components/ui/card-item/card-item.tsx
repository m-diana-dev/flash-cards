import { ComponentPropsWithoutRef } from 'react'

import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import { Rating } from '@/components/ui/rating'
import { Typography } from '@/components/ui/typography'
import { Card } from '@/services/cards/cards.types'
import clsx from 'clsx'

import s from './card-item.module.scss'

type Props = {
  card: Card
  deleteCardHandler: (card: Card) => void
  myPack: boolean
  updateCardHandler: (card: Card) => void
} & ComponentPropsWithoutRef<'article'>

export const CardItem = ({
  card,
  className,
  deleteCardHandler,
  myPack,
  updateCardHandler,
  ...rest
}: Props) => {
  const updatedAt = new Date(card.updated).toLocaleDateString('ru-RU')

  return (
    <article className={clsx(s.CardItem, className)} {...rest}>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Question
        </Typography>
        <span>
          <Typography as={'span'} variant={'body2'}>
            {card.question}
          </Typography>
          {card.questionImg && <img alt={'img'} className={s.CardItemImg} src={card.questionImg} />}
        </span>
      </div>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Answer
        </Typography>
        <span>
          <Typography as={'span'} variant={'body2'}>
            {card.answer}
          </Typography>
          {card.answerImg && <img alt={'img'} className={s.CardItemImg} src={card.answerImg} />}
        </span>
      </div>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Last Updated
        </Typography>
        <Typography as={'span'} variant={'body2'}>
          {updatedAt}
        </Typography>
      </div>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Grade
        </Typography>
        <Typography as={'span'} variant={'body2'}>
          <Rating value={card.grade} />
        </Typography>
      </div>
      {myPack && (
        <div className={s.CardItemRow}>
          <button>
            <Edit onClick={() => updateCardHandler(card)} />
          </button>
          <button>
            <Delete onClick={() => deleteCardHandler(card)} />
          </button>
        </div>
      )}
    </article>
  )
}
