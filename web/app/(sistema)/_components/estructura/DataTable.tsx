/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TanstackTable, // Renombrar para evitar conflicto con el componente Table UI
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react"; // MoreHorizontal no se usa directamente aquí

import { Button } from "@/components/ui/button"; // Ajusta la ruta
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ajusta la ruta
import { Input } from "@/components/ui/input"; // Ajusta la ruta
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Ajusta la ruta
import { ActionDefinition, DataTableRowActions } from "./DataTableRowActions";
import { useAuth } from "@/assets/context/AuthContext";

// Importa DataTableRowActions y su tipo ActionDefinition

interface ReusableShadcnDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumnId?: string;
  searchPlaceholder?: string;

  // Opciones para la columna de acciones
  actionColumnId?: string;
  actionColumnHeaderText?: string;

  // Opción 1: Configuración directa de acciones (más simple)
  rowActions?: ActionDefinition<TData>[];
  rowActionsMenuLabel?: string;
  rowActionsTriggerIcon?: React.ReactNode;

  renderAddForm?: React.ReactNode;

  // Opción 2: Render prop para máxima flexibilidad (anula la Opción 1 si se provee)
  renderRowActions?: (row: Row<TData>) => React.ReactNode;

  // Opcional: para controlar el estado de la paginación desde fuera si es necesario
  // pageCount?: number;
  // pagination?: { pageIndex: number; pageSize: number };
  // onPaginationChange?: (updater: Updater<PaginationState>) => void;
}

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
  searchColumnId,
  searchPlaceholder = "Filtrar...",
  actionColumnId = "actions",
  actionColumnHeaderText = "Acciones",
  rowActions,
  rowActionsMenuLabel,
  rowActionsTriggerIcon,
  renderRowActions,
  renderAddForm,
}: ReusableShadcnDataTableProps<TData, TValue>) {
  const { setModalContent, openModal } = useAuth();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // Si controlas la paginación externamente, usarías las props, sino el estado interno de la tabla
  // const [paginationState, setPaginationState] = React.useState({ pageIndex: 0, pageSize: 10 });

  const columns = React.useMemo(() => {
    const memoizedColumns = [...initialColumns];
    let effectiveActionsCellRenderer:
      | ((props: { row: Row<TData> }) => React.ReactNode)
      | undefined = undefined;

    if (renderRowActions) {
      effectiveActionsCellRenderer = ({ row }) => renderRowActions(row);
    } else if (rowActions && rowActions.length > 0) {
      effectiveActionsCellRenderer = ({ row }) => (
        <DataTableRowActions
          row={row}
          actions={rowActions}
          menuLabel={rowActionsMenuLabel}
          triggerIcon={rowActionsTriggerIcon}
        />
      );
    }

    if (effectiveActionsCellRenderer) {
      memoizedColumns.push({
        id: actionColumnId,
        header: actionColumnHeaderText,
        cell: effectiveActionsCellRenderer,
        enableSorting: false,
        enableHiding: true, // Permitir ocultar la columna de acciones
      } as ColumnDef<TData, any>);
    }
    return memoizedColumns;
  }, [
    initialColumns,
    renderRowActions,
    rowActions,
    actionColumnId,
    actionColumnHeaderText,
    rowActionsMenuLabel,
    rowActionsTriggerIcon,
  ]);

  const table: TanstackTable<TData> = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // enableRowSelection: true, // Asegúrate que esto esté habilitado si la columna 'select' lo necesita
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      // pagination: paginationState, // Si controlas la paginación
    },
    // onPaginationChange: setPaginationState, // Si controlas la paginación
    // pageCount: pageCount ?? -1, // Si controlas la paginación y conoces el total de páginas
    // manualPagination: !!pageCount, // Si la paginación es manual (backend)
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {searchColumnId && table.getColumn(searchColumnId) && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumnId)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(searchColumnId)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        <div className="w-fit gap-4 flex ml-auto">
          <button
            type="button"
            onClick={() => {
              setModalContent(renderAddForm);
              openModal();
            }}
            className="flex w-fit rounded-main bg-primary-main px-6 py-2 text-center text-white-main transition-all duration-300 hover:bg-primary-700"
          >
            Agregar
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  let columnText = column.id;
                  const headerDef = column.columnDef.header;

                  if (
                    column.id === actionColumnId &&
                    typeof actionColumnHeaderText === "string"
                  ) {
                    columnText = actionColumnHeaderText;
                  } else if (column.id === "select") {
                    columnText = "Seleccionar"; // O podrías tomarlo del header si es un string
                  } else if (typeof headerDef === "string") {
                    columnText = headerDef;
                  }
                  // Si headerDef es una función, column.id es un fallback razonable.
                  // Podrías querer una prop 'displayName' en columnDef.meta para más control.

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnText}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
