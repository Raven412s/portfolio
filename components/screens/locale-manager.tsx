'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useLocales } from '@/hooks/use-locales'
import type { LocaleDirection } from '@/types/locale'
import { useState } from 'react'
import LocaleTable from '../data-tables/locale-table'
import LocaleForm from '../forms/locale-form'

type EditLocaleData = {
  id: string
  language: string
  code: string
  direction: LocaleDirection
} | null

const LocaleManager = () => {
  const { locales, loading, refresh } = useLocales(true)

  const [open, setOpen] = useState(false)
  const [editLocale, setEditLocale] = useState<EditLocaleData>(null)
  const [deleteLocale, setDeleteLocale] = useState<EditLocaleData>(null)

  function handleAdd() {
    setEditLocale(null)
    setOpen(true)
  }

  function handleEdit(locale: EditLocaleData) {
    setEditLocale(locale)
    setOpen(true)
  }

  function handleDlete(locale: EditLocaleData) {
    setDeleteLocale(locale)
    setOpen(true)
  }

  async function handleSuccess() {
    setOpen(false)
    await refresh() // 🔥 single source refresh
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-foreground/75 font-semibold">
          Locale Manager
        </h1>

        <Button onClick={handleAdd}>
          Add Locale
        </Button>
      </div>

      {/* Table */}
      <LocaleTable
        data={locales}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDlete}
        onRefresh={refresh}
      />

      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          data-lenis-prevent
          className="max-h-screen overflow-y-auto"
        >
          {
            deleteLocale ? (
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete {deleteLocale.language} Locale (<span className="px-0.5">{deleteLocale.code}</span>).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          if (!deleteLocale) return

                          try {
                            const res = await fetch(
                              `/api/admin/locales/${deleteLocale.id}`,
                              { method: "DELETE" }
                            )

                            if (!res.ok) {
                              throw new Error("Failed to delete locale")
                            }

                            setDeleteLocale(null)

                            // 🔥 wait for refresh AFTER delete
                            await refresh()

                            // close sheet
                            setOpen(false)
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <>
                <SheetHeader>
                  <SheetTitle>
                    {editLocale ? "Edit Locale" : "Add New Locale"}
                  </SheetTitle>
                  <SheetDescription>
                    {editLocale
                      ? "Update the selected locale"
                      : "Add new languages to your project"}
                  </SheetDescription>
                </SheetHeader>

                <div className="p-3.5">
                  <LocaleForm
                    mode={editLocale ? "edit" : "add"}
                    initialData={editLocale ?? undefined}
                    onSuccess={handleSuccess}
                  />
                </div>
              </>
            )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default LocaleManager
