import { ComponentPropsWithoutRef } from 'react'

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
import { Card } from '@/services/cards/cards.types'

import s from './cards-table.module.scss'

type Props = {
  cards: Card[] | undefined
  myPack: boolean
} & ComponentPropsWithoutRef<'table'>
export const CardsTable = ({ cards, className, myPack }: Props) => {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHeadCell className={s.TableCell}>Question</TableHeadCell>
          <TableHeadCell className={s.TableCell}>Answer</TableHeadCell>
          <TableHeadCell className={s.TableCell}>Last Updated</TableHeadCell>
          <TableHeadCell className={s.TableCell}>Grade</TableHeadCell>
          {myPack && <TableHeadCell className={s.TableCell}></TableHeadCell>}
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
                    <Delete onClick={() => {}} />
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
