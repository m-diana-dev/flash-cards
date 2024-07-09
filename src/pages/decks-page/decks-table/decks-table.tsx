import ArrowTop from '@/assets/images/icons/ArrowTop'
import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Play from '@/assets/images/icons/Play'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Deck } from '@/services/decks/decks.types'

import s from './decks-table.module.scss'

type Props = {
  decks: Deck[] | undefined
}
export const DecksTable = ({ decks }: Props) => {
  return (
    <Table className={s.PageTable}>
      <TableHeader>
        <TableRow>
          <TableHeadCell className={s.PageTableCell}>Name</TableHeadCell>
          <TableHeadCell className={s.PageTableCell}>Cards</TableHeadCell>
          <TableHeadCell className={s.PageTableCell}>
            Last Updated
            <ArrowTop height={10} width={8} />
          </TableHeadCell>
          <TableHeadCell className={s.PageTableCell}>Created By</TableHeadCell>
          <TableHeadCell className={s.PageTableCell}></TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decks?.map(deck => {
          const updatedAt = new Date(deck.updated).toLocaleDateString('ru-RU')

          return (
            <TableRow key={deck.id}>
              <TableCell className={s.PageTableCell}>
                <a className={s.PageTableCellLink} href={''}>
                  {deck.cover && (
                    <img alt={'cover'} className={s.PageTableCover} src={deck.cover} />
                  )}
                  <span>{deck.name}</span>
                </a>
              </TableCell>
              <TableCell className={s.PageTableCell}>{deck.cardsCount}</TableCell>
              <TableCell className={s.PageTableCell}>{updatedAt}</TableCell>
              <TableCell className={s.PageTableCell}>{deck.author.name}</TableCell>
              <TableCell className={s.PageTableCell}>
                <button>
                  <Play />
                </button>
                <button>
                  <Edit />
                </button>
                <button>
                  <Delete />
                </button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
