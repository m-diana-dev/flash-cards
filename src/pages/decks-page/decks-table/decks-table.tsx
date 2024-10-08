import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ArrowDown from '@/assets/images/icons/ArrowDown'
import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Heart from '@/assets/images/icons/Heart'
import HeartFull from '@/assets/images/icons/HeartFull'
import Play from '@/assets/images/icons/Play'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { isStringIncludeValue } from '@/helpers/isStringIncludeValue'
import { DeleteDecksModal } from '@/pages/decks-page/delete-deck-modal/delete-decks-modal'
import { UpdateDeckModal } from '@/pages/decks-page/update-deck-modal/update-deck-modal'
import {
  useCreateFavoriteDeckMutation,
  useDeleteFavoriteDeckMutation,
} from '@/services/decks/decks.service'
import { Deck } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './decks-table.module.scss'

import { DeckItem } from '../../../components/ui/deck-item'

type Props = {
  cleanFilter: () => void
  decks: Deck[] | undefined
  setSorting: (value: string) => void
  sorting: null | string
  userId: string | undefined
}

export const DecksTable = ({ cleanFilter, decks, setSorting, sorting, userId }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null)

  const [createFavoriteDeck] = useCreateFavoriteDeckMutation()
  const [deleteFavoriteDeck] = useDeleteFavoriteDeckMutation()

  const handleSort = (sort: string) => {
    if (!isStringIncludeValue(sorting, 'asc') || sorting === null) {
      setSorting(sort + '-' + 'asc')
    } else {
      setSorting(sort + '-' + 'desc')
    }
  }

  const cellStyle = !isStringIncludeValue(sorting, 'asc') || sorting === null ? s.asc : ''

  const deleteDeckHandler = (deck: Deck) => {
    setOpenDeleteModal(true)
    setActiveDeck(deck)
  }

  const updateDeckHandler = (deck: Deck) => {
    setOpenUpdateModal(true)
    setActiveDeck(deck)
  }

  return (
    <>
      <DeleteDecksModal
        deck={activeDeck}
        onOpenChange={setOpenDeleteModal}
        open={openDeleteModal}
      />

      <UpdateDeckModal
        cleanFilter={cleanFilter}
        deck={activeDeck}
        onOpenChange={setOpenUpdateModal}
        open={openUpdateModal}
      />
      {windowWidth >= 768 ? (
        <Table className={s.PageTable}>
          <TableHeader className={s.PageTableHeader}>
            <TableRow>
              <TableHeadCell
                className={clsx(
                  s.PageTableCell,
                  cellStyle,
                  isStringIncludeValue(sorting, 'name') &&
                    !isStringIncludeValue(sorting, 'author') &&
                    sorting !== null
                    ? s.active
                    : ''
                )}
                onClick={() => handleSort('name')}
              >
                Name
                <ArrowDown height={10} width={8} />
              </TableHeadCell>
              <TableHeadCell
                className={clsx(
                  s.PageTableCell,
                  cellStyle,
                  isStringIncludeValue(sorting, 'cardsCount') && sorting !== null ? s.active : ''
                )}
                onClick={() => handleSort('cardsCount')}
              >
                Cards
                <ArrowDown height={10} width={8} />
              </TableHeadCell>
              <TableHeadCell
                className={clsx(
                  s.PageTableCell,
                  cellStyle,
                  isStringIncludeValue(sorting, 'updated') ? s.active : ''
                )}
                onClick={() => handleSort('updated')}
              >
                Last Updated
                <ArrowDown height={10} width={8} />
              </TableHeadCell>
              <TableHeadCell
                className={clsx(
                  s.PageTableCell,
                  cellStyle,
                  isStringIncludeValue(sorting, 'author.name') && sorting !== null ? s.active : ''
                )}
                onClick={() => handleSort('author.name')}
              >
                Created By
                <ArrowDown height={10} width={8} />
              </TableHeadCell>
              <TableHeadCell className={s.PageTableCell}></TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {decks?.map(deck => {
              const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

              return (
                <TableRow key={deck.id}>
                  <TableCell className={s.PageTableCell}>
                    <Link className={s.PageTableCellLink} to={`/decks/${deck.id}`}>
                      {deck.cover && (
                        <img alt={'cover'} className={s.PageTableCover} src={deck.cover} />
                      )}
                      <span>{deck.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className={s.PageTableCell}>{deck.cardsCount}</TableCell>
                  <TableCell className={s.PageTableCell}>{updatedAt}</TableCell>
                  <TableCell className={s.PageTableCell}>{deck.author.name}</TableCell>
                  <TableCell className={s.PageTableCell}>
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
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      ) : (
        <div className={s.CardItems}>
          {decks?.map(deck => {
            return (
              <DeckItem
                className={s.CardItem}
                createFavoriteDeck={createFavoriteDeck}
                deck={deck}
                deleteDeckHandler={deleteDeckHandler}
                deleteFavoriteDeck={deleteFavoriteDeck}
                key={deck.id}
                updateDeckHandler={updateDeckHandler}
                userId={userId}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
