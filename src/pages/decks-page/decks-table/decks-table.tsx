import ArrowDown from '@/assets/images/icons/ArrowDown'
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
import { isStringIncludeValue } from '@/helpers/isStringIncludeValue'
import { Deck } from '@/services/decks/decks.types'
import clsx from 'clsx'

import s from './decks-table.module.scss'

type Props = {
  decks: Deck[] | undefined
  setSorting: (value: string) => void
  sorting: null | string
}

export const DecksTable = ({ decks, setSorting, sorting }: Props) => {
  const handleSort = (sort: string) => {
    if (!isStringIncludeValue(sorting, 'asc') || sorting === null) {
      setSorting(sort + '-' + 'asc')
    } else {
      setSorting(sort + '-' + 'desc')
    }
  }

  const cellStyle = !isStringIncludeValue(sorting, 'asc') || sorting === null ? s.asc : ''

  return (
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
