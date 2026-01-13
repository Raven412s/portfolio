// components/data-tables/columns/Locale.columns.tsx
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { LocaleDTO, LocaleStatus } from "@/types/locale"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react"


export type OnEditLocale = (locale: {
  id: string
  language: string
  code: string
  direction: "ltr" | "rtl"
}) => void

export const localeColumns = (
  onEdit: OnEditLocale,
  onDelete: OnEditLocale,
  onDisable?: (id: string, currentStatus?: LocaleStatus) => void
): ColumnDef<LocaleDTO>[] => [
    {
      accessorKey: "language",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Language
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col px-2.5" > 
          <p className="font-medium">{row.original.language}</p>
          <p className="text-sm text-muted-foreground">
            {row.original.code} | {row.original.direction}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.status === "active"
              ? "text-green-600"
              : "text-muted-foreground"
          }
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const locale = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  onEdit({
                    id: locale._id,
                    language: locale.language,
                    code: locale.code,
                    direction: locale.direction,
                  })
                }
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  locale.status === ("inactive" as LocaleStatus)
                    ? "text-success"
                    : "text-amber-800 dark:text-amber-400"
                )}
                onClick={() => onDisable?.(locale._id, locale.status)}
              >
                {locale.status === ("inactive" as LocaleStatus) ? "Enable" : "Disable"}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  onDelete({
                    id: locale._id,
                    language: locale.language,
                    code: locale.code,
                    direction: locale.direction,
                  })
                }
              >
                <span className="text-destructive hover:text-destructive/95 hover:brightness-125 inline-flex items-center gap-2 w-full">
                  <Trash2Icon className="size-4 text-destructive hover:text-destructive/95 hover:brightness-125" /> Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ]
