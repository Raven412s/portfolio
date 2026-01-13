"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import type { LocaleDTO, LocaleDirection, LocaleStatus } from '@/types/locale'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Skeleton } from '../ui/skeleton'
import { localeColumns } from './columns/Locale.columns'
import { toast } from 'sonner'

export interface LocaleTableProps {
  data: LocaleDTO[]
  loading: boolean
  onDelete: (locale: {
    id: string
    language: string
    code: string
    direction: LocaleDirection
  }) => void
  onEdit: (locale: {
    id: string
    language: string
    code: string
    direction: LocaleDirection
  }) => void
  onRefresh: () => Promise<void>
}

const LocaleTable = ({
  data,
  loading,
  onDelete,
  onEdit,
  onRefresh,
}: LocaleTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

const handleDisable = useCallback(
  async (id: string, currentStatus?: LocaleStatus): Promise<void> => {
    try {
      const newStatus: LocaleStatus =
        currentStatus === "active" ? "inactive" : "active"

      const res = await fetch(`/api/admin/locales/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const result = await res.json()
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed")
      }

      toast.success(
        newStatus === "inactive"
          ? "Locale disabled"
          : "Locale enabled"
      )

      await onRefresh()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error toggling locale"
      )
    }
  },
  [onRefresh]
)

const columns = useMemo(
  () => localeColumns(onEdit, onDelete, handleDisable),
  [onEdit, onDelete, handleDisable]
)

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {table.getAllColumns().map(col => (
                  <TableCell key={`${i}-${col.id}`}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
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
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No locales found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default LocaleTable
