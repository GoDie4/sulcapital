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

import { Button } from "@/components/ui/button"; // Ajusta la ruta

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../interfaces/Pagination";
import { ModalSizes } from "../../../_components/modal/ModalWrapper";

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
  pagination: Pagination;
  renderRowActions?: (row: Row<TData>) => React.ReactNode;

  modalSize?: ModalSizes;
  disableActionsColumn?: boolean;

  filters?: FilterBuscador[];

  noRenderAddButton?: boolean;
}
type FilterOption = {
  value: string;
  label: string;
};
export type FilterBuscador = {
  name: string;
  label: string;
  options: FilterOption[];
};

export function DataTable<TData, TValue>({
  columns: initialColumns,
  data,
  actionColumnId = "actions",
  actionColumnHeaderText = "Acciones",
  rowActions,
  rowActionsMenuLabel,
  rowActionsTriggerIcon,
  renderRowActions,
  renderAddForm,
  pagination,
  modalSize,
  disableActionsColumn = false,
  filters = [],
  noRenderAddButton = false,
}: ReusableShadcnDataTableProps<TData, TValue>) {
  const { setModalContent, openModal, setModalSize } = useAuth();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    const newFilters: Record<string, string> = {};
    filters.forEach((filter) => {
      const value = searchParams.get(filter.name) ?? "";
      newFilters[filter.name] = value;
    });
    setFilterValues(newFilters);
  }, [searchParams, filters]);
  const [paginationState, setPaginationState] = React.useState({
    pageIndex: pagination.page - 1, // porque TanStack usa 0-based index
    pageSize: pagination.limit,
  });
  const columns = React.useMemo(() => {
    const memoizedColumns = [...initialColumns];
    let effectiveActionsCellRenderer:
      | ((props: { row: Row<TData> }) => React.ReactNode)
      | undefined = undefined;

    if (!disableActionsColumn) {
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
          enableHiding: true,
        } as ColumnDef<TData, any>);
      }
    }

    return memoizedColumns;
  }, [
    initialColumns,
    disableActionsColumn,
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
    enableRowSelection: true, // Asegúrate que esto esté habilitado si la columna 'select' lo necesita
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    onPaginationChange: setPaginationState,
    manualPagination: true,
    pageCount: pagination.totalPages,
  });
  const getPageUrl = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", newPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const router = useRouter();

  const nextPage = () => {
    router.push(getPageUrl(pagination.page + 1));
  };

  const prevPage = () => {
    router.push(getPageUrl(pagination.page - 1));
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm.length >= 3) {
      params.set("search", searchTerm);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [searchTerm, pathname, searchParams, router]);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (searchTerm.length >= 3) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = `${pathname}?${searchParams.toString()}`;

    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [filterValues, pathname, router, searchParams, searchTerm]);

  const handleClearFilters = () => {
    setSearchTerm("");
    const resetFilters: Record<string, string> = {};
    filters.forEach((filter) => {
      resetFilters[filter.name] = "";
    });
    setFilterValues(resetFilters);

    const params = new URLSearchParams();
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = Object.values(filterValues).some(
    (value) => value !== ""
  );
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <form className="w-fit flex items-center gap-2">
          <input
            placeholder={"Buscar..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm border w-full placeholder:text-sm focus:border-secondary-main outline-none  rounded-main py-2 px-3"
          />
          {/* <button
            type="button"
            className="flex px-6 py-2 bg-secondary-main rounded-md text-center justify-center text-white-main"
          >
            Buscar
          </button> */}
        </form>
        <div className="w-fit gap-4 flex ml-auto items-center">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-3 py-2 text-sm text-red-600 underline"
            >
              Limpiar filtros
            </button>
          )}
          {filters.map((filter) => (
            <div className="flex flex-col gap-1" key={filter.name}>
              <label
                htmlFor=""
                className="text-sm font-semibold text-secondary-main"
              >
                {filter.label}
              </label>
              <select
                value={filterValues[filter.name] ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (filterValues[filter.name] !== value) {
                    setFilterValues((prev) => ({
                      ...prev,
                      [filter.name]: value,
                    }));
                  }
                }}
                className="p-2 text-sm border rounded-md outline-none focus:border-secondary-main"
              >
                <option value="">Seleccionar</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          {!noRenderAddButton && (
            <button
              type="button"
              onClick={() => {
                setModalSize(modalSize ?? "small");
                setModalContent(renderAddForm);
                openModal();
              }}
              className="flex w-fit rounded-main h-fit bg-primary-main px-6 py-2 text-center text-white-main transition-all duration-300 hover:bg-primary-700"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden border">
        <Table className=" overflow-hidden">
          <TableHeader className="bg-secondary-main rounded-main text-white-main">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-secondary-main px-3"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white-main "
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
      <div className="flex items-center justify-between relative gap-2 py-4">
        <div className="w-fit flex items-center gap-2">
          <select
            id="limit"
            className="py-2 px-3 outline-none text-sm border text-black-main bg-white-main rounded-main"
            value={searchParams.get("limit") || pagination.limit}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("limit", e.target.value);
              params.set("page", "1");
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            {[10, 20, 50, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-sm text-black-800">registros por página</p>
        </div>
        <div className=" text-sm text-muted-foreground">
          {data.length} de {pagination.total} registros
        </div>
        <div className="max-w-lg w-full absolute justify-center left-0 right-0 mx-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => prevPage()}
            disabled={pagination.page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={pagination.page === pagination.totalPages}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
