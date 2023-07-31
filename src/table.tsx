import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import { SleekTableProps } from './types';
import { calculateSleekColumns } from './utils';
import "./style.less";

const Table = <T extends unknown>(props: SleekTableProps<T>) => {
  const { data, columns } = props;
  const table = useReactTable({
    data,
    columns,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });
  const { headerGroups, footerGroups } = calculateSleekColumns(table);
  console.log('headerGroups', headerGroups);
  console.log('footerGroups', footerGroups);
  return <table className='sleek-table'>
  <thead>
    {headerGroups.map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          return !header.isSleekHeaderPlaceholder && (
            <th key={header.id} colSpan={header.colSpan} rowSpan={header.sleekHeaderRowSpan}>
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </th>
          )
        })}
      </tr>
    ))}
  </thead>
  <tbody>
    {table.getRowModel().rows.map(row => {
      return (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => {
            return (
              <td
                {...{
                  key: cell.id,
                  style: {
                    background: cell.getIsGrouped()
                      ? '#0aff0082'
                      : cell.getIsAggregated()
                      ? '#ffa50078'
                      : cell.getIsPlaceholder()
                      ? '#ff000042'
                      : 'white',
                  },
                }}
              >
                {cell.getIsGrouped() ? (
                  // If it's a grouped cell, add an expander and row count
                  <>
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: {
                          cursor: row.getCanExpand()
                            ? 'pointer'
                            : 'normal',
                        },
                      }}
                    >
                      {row.getIsExpanded() ? '👇' : '👉'}{' '}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}{' '}
                      ({row.subRows.length})
                    </button>
                  </>
                ) : cell.getIsAggregated() ? (
                  // If the cell is aggregated, use the Aggregated
                  // renderer for cell
                  flexRender(
                    cell.column.columnDef.aggregatedCell ??
                      cell.column.columnDef.cell,
                    cell.getContext()
                  )
                ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                  // Otherwise, just render the regular cell
                  flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                )}
              </td>
            )
          })}
        </tr>
      )
    })}
  </tbody>
  <tfoot>
  {footerGroups.map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          return !header.isSleekFooterPlaceholder && (
            <th key={header.id} colSpan={header.colSpan} rowSpan={header.sleekFooterRowSpan}>
              {flexRender(
                header.column.columnDef.footer,
                header.getContext()
              )}
            </th>
          )
        })}
      </tr>
    ))}
  </tfoot>
</table>
}

export default Table;