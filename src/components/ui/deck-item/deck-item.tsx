import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Heart from '@/assets/images/icons/Heart'
import HeartFull from '@/assets/images/icons/HeartFull'
import Play from '@/assets/images/icons/Play'
import { Typography } from '@/components/ui/typography'
import { CreateFavoriteArgs, Deck, DeleteFavoriteArgs } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './deck-item.module.scss'

type Props = {
  createFavoriteDeck: (args: CreateFavoriteArgs) => void
  deck: Deck
  deleteDeckHandler: (deck: Deck) => void
  deleteFavoriteDeck: (args: DeleteFavoriteArgs) => void
  updateDeckHandler: (deck: Deck) => void
  userId: string | undefined
} & ComponentPropsWithoutRef<'article'>

export const DeckItem = ({
  className,
  createFavoriteDeck,
  deck,
  deleteDeckHandler,
  deleteFavoriteDeck,
  updateDeckHandler,
  userId,
  ...rest
}: Props) => {
  const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

  return (
    <article className={clsx(s.CardItem, className)} {...rest}>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Name
        </Typography>
        <Typography as={'span'} variant={'body2'}>
          <Link className={s.PageTableCellLink} to={`/decks/${deck.id}`}>
            <span>{deck.name}</span>
          </Link>
        </Typography>
      </div>
      <div className={s.CardItemRow}>
        <Typography as={'span'} variant={'subtitle2'}>
          Cards
        </Typography>
        <Typography as={'span'} variant={'body2'}>
          {deck.cardsCount}
        </Typography>
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
          Created by
        </Typography>
        <Typography as={'span'} variant={'body2'}>
          {deck.author.name}
        </Typography>
      </div>
      <div className={s.CardItemRow}>
        {deck.cardsCount !== 0 && (
          <Link to={`/decks/${deck.id}/learn`}>
            <Play />
          </Link>
        )}

        {userId === deck.author.id && (
          <>
            <button>
              <Edit onClick={() => updateDeckHandler(deck)} />
            </button>
            <button>
              <Delete onClick={() => deleteDeckHandler(deck)} />
            </button>
          </>
        )}
        <>
          {deck.isFavorite ? (
            <button>
              <HeartFull onClick={() => deleteFavoriteDeck({ id: deck.id })} />
            </button>
          ) : (
            <button>
              <Heart onClick={() => createFavoriteDeck({ id: deck.id })} />
            </button>
          )}
        </>
      </div>
    </article>
  )
}
