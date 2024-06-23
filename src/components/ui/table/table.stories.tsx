import type { Meta, StoryObj } from '@storybook/react'

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
} from '@/components/ui/table/table'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const TableDefault: Story = {
  args: {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>
              Last Updated
              <ArrowTop height={10} width={8} />
            </TableHeadCell>
            <TableHeadCell>Created by</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Pack Name</TableCell>
            <TableCell>4</TableCell>
            <TableCell>18.03.2021</TableCell>
            <TableCell>Ivan Ivanov</TableCell>
            <TableCell>
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
          <TableRow>
            <TableCell>Pack Name</TableCell>
            <TableCell>4</TableCell>
            <TableCell>18.03.2021</TableCell>
            <TableCell>Ivan Ivanov</TableCell>
            <TableCell>
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
        </TableBody>
      </>
    ),
  },
}
