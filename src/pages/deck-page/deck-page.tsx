import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBack from '@/assets/images/icons/ArrowBack'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { CardsTable } from '@/pages/deck-page/cards-table'
import { DeckPageTop } from '@/pages/deck-page/deck-page-top/deck-page-top'
import { DeleteDecksModal } from '@/pages/decks-page/delete-deck-modal/delete-decks-modal'
import { UpdateDeckModal } from '@/pages/decks-page/update-deck-modal/update-deck-modal'
import { useMeQuery } from '@/services/auth/auth.services'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { useGetDeckQuery } from '@/services/decks/decks.service'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const { data: deck } = useGetDeckQuery({ id: id || '' })
  const { data: me } = useMeQuery()
  const { data: cards } = useGetCardsQuery({
    id: id || '',
  })

  const myPack = deck?.userId === me?.id
  const emptyPack = deck?.cardsCount === 0

  return (
    <>
      <UpdateDeckModal
        deck={deck ?? null}
        onOpenChange={setOpenUpdateModal}
        open={openUpdateModal}
      />
      <DeleteDecksModal
        deck={deck ?? null}
        onOpenChange={setOpenDeleteModal}
        open={openDeleteModal}
      />
      <div className={s.DeckPage}>
        <Button className={s.DeckPageButton} onClick={() => navigate('/')} variant={'link'}>
          <ArrowBack />
          Back to Decks List
        </Button>
        <DeckPageTop
          deck={deck}
          emptyPack={emptyPack}
          myPack={myPack}
          setOpenDeleteModal={setOpenDeleteModal}
          setOpenUpdateModal={setOpenUpdateModal}
        />
        {emptyPack ? (
          <div className={s.DeckPageEmpty}>
            <Typography className={s.DeckPageEmptyTitle}>
              This pack is empty.{myPack && 'Click add new card to fill this pack'}
            </Typography>
            {myPack && <Button>Add New Card</Button>}
          </div>
        ) : (
          <>
            <CardsTable cards={cards?.items} myPack={myPack} />
          </>
        )}
      </div>
    </>
  )
}
