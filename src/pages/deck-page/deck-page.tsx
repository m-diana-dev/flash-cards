import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBack from '@/assets/images/icons/ArrowBack'
import { Button } from '@/components/ui/button'
import { Pagination } from '@/components/ui/pagination'
import { Preloader } from '@/components/ui/preloader'
import { PreloaderLine } from '@/components/ui/preloader-line'
import { Typography } from '@/components/ui/typography'
import { AddCardModal } from '@/pages/deck-page/add-card-modal/add-card-modal'
import { CardsTable } from '@/pages/deck-page/cards-table'
import { DeckPageTop } from '@/pages/deck-page/deck-page-top/deck-page-top'
import { DeleteCardModal } from '@/pages/deck-page/delete-card-modal/delete-card-modal'
import { UpdateCardModal } from '@/pages/deck-page/update-card-modal/update-card-modal'
import { useCards } from '@/pages/deck-page/use-cards'
import { DeleteDecksModal } from '@/pages/decks-page/delete-deck-modal/delete-decks-modal'
import { UpdateDeckModal } from '@/pages/decks-page/update-deck-modal/update-deck-modal'
import { useMeQuery } from '@/services/auth/auth.services'
import { useGetCardsQuery } from '@/services/cards/cards.service'
import { Card } from '@/services/cards/cards.types'
import { useGetDeckQuery } from '@/services/decks/decks.service'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [openUpdateDeckModal, setOpenUpdateDeckModal] = useState<boolean>(false)
  const [openDeleteDeckModal, setOpenDeleteDeckModal] = useState<boolean>(false)
  const [openAddCardModal, setOpenAddCardModal] = useState<boolean>(false)
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState<boolean>(false)
  const [openUpdateCardModal, setOpenUpdateCardModal] = useState<boolean>(false)
  const [currentCard, setCurrentCard] = useState<Card | null>(null)

  const {
    currentPage,
    itemsPerPage,
    removeSearchParam,
    search,
    setCurrentPage,
    setItemsPerPage,
    setSearchParam,
    setSorting,
    sorting,
  } = useCards()

  const { data: deck } = useGetDeckQuery({ id: id || '' })
  const { data: me } = useMeQuery()
  const {
    data: cards,
    isFetching,
    isLoading,
  } = useGetCardsQuery({
    currentPage: +currentPage,
    id: id || '',
    itemsPerPage: +itemsPerPage,
    orderBy: sorting,
    question: search,
  })

  const myPack = deck?.userId === me?.id
  const emptyPack = deck?.cardsCount === 0

  const handleItemPerPage = (count: string) => {
    setItemsPerPage(count)
    setCurrentPage(null)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      {isFetching && <PreloaderLine />}
      <UpdateDeckModal
        deck={deck ?? null}
        onOpenChange={setOpenUpdateDeckModal}
        open={openUpdateDeckModal}
      />
      <DeleteDecksModal
        deck={deck ?? null}
        onOpenChange={setOpenDeleteDeckModal}
        open={openDeleteDeckModal}
      />
      <AddCardModal
        deckId={deck?.id ?? ''}
        onOpenChange={setOpenAddCardModal}
        open={openAddCardModal}
      />
      <DeleteCardModal
        card={currentCard}
        onOpenChange={setOpenDeleteCardModal}
        open={openDeleteCardModal}
      />
      <UpdateCardModal
        card={currentCard}
        deckId={deck?.id ?? ''}
        onOpenChange={setOpenUpdateCardModal}
        open={openUpdateCardModal}
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
          removeSearchParam={removeSearchParam}
          search={search}
          setCurrentPage={setCurrentPage}
          setOpenAddCardModal={setOpenAddCardModal}
          setOpenDeleteModal={setOpenDeleteDeckModal}
          setOpenUpdateModal={setOpenUpdateDeckModal}
          setSearchParam={setSearchParam}
        />
        {emptyPack ? (
          <div className={s.DeckPageEmpty}>
            <Typography className={s.DeckPageEmptyTitle}>
              This pack is empty.{myPack && 'Click add new card to fill this pack'}
            </Typography>
            {myPack && <Button onClick={() => setOpenAddCardModal(true)}>Add New Card</Button>}
          </div>
        ) : (
          <>
            <CardsTable
              cards={cards?.items}
              className={s.CardTable}
              myPack={myPack}
              setCurrentCard={setCurrentCard}
              setOpenDeleteCardModal={setOpenDeleteCardModal}
              setOpenUpdateCardModal={setOpenUpdateCardModal}
              setSorting={setSorting}
              sorting={sorting}
            />
            <Pagination
              changeItemsPerPage={handleItemPerPage}
              currentPage={+currentPage}
              handlePageChange={setCurrentPage}
              itemsPerPage={+itemsPerPage}
              totalItems={cards?.pagination.totalItems}
              totalPages={cards?.pagination.totalPages}
            />
          </>
        )}
      </div>
    </>
  )
}
