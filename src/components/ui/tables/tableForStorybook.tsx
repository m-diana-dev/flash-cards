import Delete from '@/assets/images/icons/Delete'
import Edit from '@/assets/images/icons/Edit'
import Play from '@/assets/images/icons/Play'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/tables/tables'

type ItemsProps = {
  by: string
  counterCard: number
  id: number
  name: string
  updated: string
}

type Props = {
  items: ItemsProps[]
}
export const TableForStorybook = ({ items }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Card</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Created By</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(items => {
          return (
            <TableRow key={items.id}>
              <TableDataCell>{items.name}</TableDataCell>
              <TableDataCell>{items.counterCard}</TableDataCell>
              <TableDataCell>{items.updated}</TableDataCell>
              <TableDataCell>{items.by}</TableDataCell>
              <TableDataCell>
                <Button variant={'icon'}>
                  <Play />
                </Button>
                <Button variant={'icon'}>
                  <Edit />
                </Button>
                <Button variant={'icon'}>
                  <Delete />
                </Button>
              </TableDataCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
