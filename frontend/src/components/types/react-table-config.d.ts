// react-table-config.d.ts
import 'react-table';

declare module 'react-table' {
  export interface HeaderGroup<D extends object = {}> {
    getSortByToggleProps: (props?: Partial<TableSortByToggleProps>) => TableSortByToggleProps;
    isSorted: boolean;
    isSortedDesc: boolean;
  }
}