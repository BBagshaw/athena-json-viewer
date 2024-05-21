declare module 'react-table' {
    import { ComponentType, ReactNode, useMemo } from 'react';
  
    export interface Column<T extends object = {}> {
      Header: string | ComponentType<HeaderProps<T>>;
      accessor: keyof T | ((row: T) => any);
    }
  
    export interface TableOptions<T extends object> {
      columns: Column<T>[];
      data: T[];
    }
  
    export interface UseTableInstanceProps<D extends object> {
      getTableProps: (propGetter?: TablePropGetter<D>) => TableProps;
      getTableBodyProps: (propGetter?: TableBodyPropGetter<D>) => TableBodyProps;
      headerGroups: HeaderGroup<D>[];
      rows: Row<D>[];
      prepareRow: (row: Row<D>) => void;
    }
  
    export interface HeaderGroup<D extends object = {}> {
      getHeaderGroupProps: (propGetter?: HeaderGroupPropGetter<D>) => TableHeaderGroupProps;
      headers: HeaderGroup<D>[];
    }
  
    export interface Row<D extends object = {}> {
      getRowProps: (propGetter?: RowPropGetter<D>) => TableRowProps;
      cells: Cell<D>[];
    }
  
    export interface Cell<D extends object = {}> {
      getCellProps: (propGetter?: CellPropGetter<D>) => TableCellProps;
      render: (type: string) => ReactNode;
    }
  
    export function useTable<D extends object = {}>(
      options: TableOptions<D>,
      ...plugins: PluginHook<D>[]
    ): UseTableInstanceProps<D>;
  }
  