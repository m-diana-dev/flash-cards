import { ComponentPropsWithoutRef } from 'react'

import ArrowDown from '@/assets/images/icons/ArrowDown'
import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import { Rating } from '@/components/ui/rating'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { isStringIncludeValue } from '@/helpers/isStringIncludeValue'
import { Card } from '@/services/cards/cards.types'
import clsx from 'clsx'

import s from './cards-table.module.scss'

type Props = {
  cards: Card[] | undefined
  myPack: boolean
  setCurrentCard: (card: Card) => void
  setOpenDeleteCardModal: (open: boolean) => void
  setSorting: (sorting: string) => void
  sorting: null | string
} & ComponentPropsWithoutRef<'table'>
export const CardsTable = ({
  cards,
  className,
  myPack,
  setCurrentCard,
  setOpenDeleteCardModal,
  setSorting,
  sorting,
}: Props) => {
  const handleSort = (sort: string) => {
    if (!isStringIncludeValue(sorting, 'asc') || sorting === null) {
      setSorting(sort + '-' + 'asc')
    } else {
      setSorting(sort + '-' + 'desc')
    }
  }

  const cellStyle = !isStringIncludeValue(sorting, 'asc') || sorting === null ? s.asc : ''

  const deleteCardHandler = (card: Card) => {
    setOpenDeleteCardModal(true)
    setCurrentCard(card)
  }

  return (
    <Table className={className}>
      <TableHeader className={s.TableHeader}>
        <TableRow>
          <TableHeadCell
            className={clsx(
              s.TableCell,
              cellStyle,
              isStringIncludeValue(sorting, 'question') && sorting !== null ? s.active : ''
            )}
            onClick={() => handleSort('question')}
          >
            Question
            <ArrowDown height={10} width={8} />
          </TableHeadCell>
          <TableHeadCell
            className={clsx(
              s.TableCell,
              cellStyle,
              isStringIncludeValue(sorting, 'answer') && sorting !== null ? s.active : ''
            )}
            onClick={() => handleSort('answer')}
          >
            Answer
            <ArrowDown height={10} width={8} />
          </TableHeadCell>
          <TableHeadCell
            className={clsx(
              s.TableCell,
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
              s.TableCell,
              cellStyle,
              isStringIncludeValue(sorting, 'grade') && sorting !== null ? s.active : ''
            )}
            onClick={() => handleSort('grade')}
          >
            Grade
            <ArrowDown height={10} width={8} />
          </TableHeadCell>
          {myPack && <TableHeadCell className={clsx(s.TableCell, cellStyle)}></TableHeadCell>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards?.map(card => {
          const updatedAt = new Date(card.updated).toLocaleDateString('ru-RU')

          return (
            <TableRow key={card.id}>
              <TableCell className={s.TableCell}>
                <Typography as={'span'} variant={'body2'}>
                  {card.question}
                </Typography>
                {card.questionImg && (
                  <img alt={'img'} className={s.TableCellImg} src={card.questionImg} />
                )}
              </TableCell>
              <TableCell className={s.TableCell}>
                <Typography as={'span'} variant={'body2'}>
                  {card.answer}
                </Typography>
                {card.answerImg && (
                  <img alt={'img'} className={s.TableCellImg} src={card.answerImg} />
                )}
              </TableCell>
              <TableCell className={s.TableCell}>{updatedAt}</TableCell>
              <TableCell className={s.TableCell}>
                <Rating value={card.grade} />
              </TableCell>
              {myPack && (
                <TableCell className={s.TableCell}>
                  <button>
                    <Edit onClick={() => {}} />
                  </button>
                  <button>
                    <Delete onClick={() => deleteCardHandler(card)} />
                  </button>
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
