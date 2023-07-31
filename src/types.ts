import type { ColumnDef } from '@tanstack/react-table';

export type { ColumnDef };

export type SleekTableProps<T> = {
  columns: ColumnDef[],
  data: T[];
}