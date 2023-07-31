import React from 'react';
import { Table } from '@idx/sleek-table';
import type { ColumnDef } from '@idx/sleek-table'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const columns = [
  {
    id: 'column1',
    header: '列1',
    footer: props => '列1-footer',
    columns: [
      {
				accessorKey: 'column11',
        header: '列1-1',
        cell: info => info.getValue(),
        // footer: props => props.column.id,
      },
      {
				accessorFn: row => row.lastName,
        cell: info => info.getValue(),
        header: '列1-2',
        // footer: props => props.column.id,
      },
    ],
  },
  {
    header: '列2',
    // footer: props => props.column.id,
    columns: [
      {
				accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
						accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          },
          {
						accessorKey: 'status',
            header: 'Status',
            footer: props => props.column.id,
          },
          {
						accessorKey: 'progress',
            header: 'Profile Progress',
            footer: props => props.column.id,
          },
        ],
      },
    ],
  },
]

export default () => {
  return <Table columns={columns} data={[]}/>
}