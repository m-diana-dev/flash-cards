import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableDataCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/components/ui/tables/tables'
import { DeleteIcons } from '@/images/icons/Table/DeleteIcons'
import { EditIcons } from '@/images/icons/Table/EditIcons'
import { PlayCircleIcons } from '@/images/icons/Table/PlayCircleIcons'

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
                  <PlayCircleIcons />
                </Button>
                <Button variant={'icon'}>
                  <EditIcons />
                </Button>
                <Button variant={'icon'}>
                  <DeleteIcons />
                </Button>
              </TableDataCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
