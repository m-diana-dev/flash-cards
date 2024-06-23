import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

type TableProps = ComponentPropsWithoutRef<'table'>

export const Table = forwardRef<ElementRef<'table'>, TableProps>(({ className, ...rest }, ref) => {
  return <table className={clsx(s.table, className)} {...rest} ref={ref} />
})

type TableHeaderProps = ComponentPropsWithoutRef<'thead'>

export const TableHeader = forwardRef<ElementRef<'thead'>, TableHeaderProps>(
  ({ className, ...rest }, ref) => {
    return <thead className={clsx(s.thead, className)} {...rest} ref={ref} />
  }
)

type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow = forwardRef<ElementRef<'tr'>, TableRowProps>(
  ({ className, ...rest }, ref) => {
    return <tr className={clsx(s.tr, className)} {...rest} ref={ref} />
  }
)
type TableHeadCellProps = ComponentPropsWithoutRef<'th'>
export const TableHeadCell = forwardRef<ElementRef<'th'>, TableHeadCellProps>(
  ({ className, ...rest }, ref) => {
    return <th className={clsx(s.th, className)} {...rest} ref={ref} />
  }
)

type TableCellProps = ComponentPropsWithoutRef<'td'>
export const TableCell = forwardRef<ElementRef<'td'>, TableCellProps>(
  ({ className, ...rest }, ref) => {
    return <td className={clsx(s.td, className)} {...rest} ref={ref} />
  }
)

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>
export const TableBody = forwardRef<ElementRef<'tbody'>, TableBodyProps>(
  ({ className, ...rest }, ref) => {
    return <tbody className={clsx(s.tbody, className)} {...rest} ref={ref} />
  }
)
